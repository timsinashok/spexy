import os
from bs4 import BeautifulSoup
import time
import requests
from dotenv import load_dotenv
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
import pymongo
from gridfs import GridFS
from bson import ObjectId


# setting up the rate limit
RATE_LIMIT = 2
NUM_PAGES = 1

# Classes to scrape data for
classes = ['oval', 'round', 'square']

# function to connect to the MongoDB database
def connect_to_mongo_database(database_name):
    load_dotenv()
    mongodb_uri = os.getenv('MONGODB_URI')
    try:
        client = pymongo.MongoClient(mongodb_uri)
        db = client[database_name]
        print("Successfully connected to the database.")
        return db
    except Exception as e:
        print(f"An error occurred while connecting to the database: {e}")

# helper function to get the image size
def get_image_size(url):
    response = requests.head(url)
    if response.status_code == 200:
        return int(response.headers.get('Content-Length', -1))
    else:
        return -1

# function to scrape the data for each face type
def get_items_by_face_type_and_mongo(class_name, num_pages, store_collection, glasses_collection, fs, base_url_, store_id):
    base_url = base_url_ 
    url_shape = base_url + class_name

    for i in range(num_pages):
        page_url = f'{url_shape}#pagesize=30/page={i+1}'

        try:
            driver = webdriver.Chrome()
            driver.get(page_url)
            time.sleep(RATE_LIMIT)
            driver.set_page_load_timeout(10)
        except TimeoutException as e:
            print(f"Error occurred while accessing {page_url}: {e}")
            continue

        try:
            close_button = driver.find_element(By.CSS_SELECTOR, 'button.ebd-modal-close')
            close_button.click()
        except Exception as e:
            print(f"Error while clicking the close button: {e}")

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        glass_card = soup.find_all('div', class_='product-card_product-card__0ByeI product-grid_item__xK_d4')

        print(len(glass_card))

        for glass_index, glass in enumerate(glass_card[:]):
            glass_detail = glass.find('div', class_='product-card_item-name__7AUuf')
            glass_name = glass_detail.text.strip()
            glass_link = glass_detail.find('a')['href']
            glass_price = glass.find('div', class_='product-card_price-wrapper__YWDT_').span.text.strip()

            try:
                product_cards_selenium = driver.find_elements(By.CSS_SELECTOR, '.product-card_product-card__0ByeI.product-grid_item__xK_d4')
                current_product_card = product_cards_selenium[glass_index]
                color_container_selenium = current_product_card.find_elements(By.CSS_SELECTOR, '.color-selector_color__nTqzF')
                actions = ActionChains(driver)
                colors = []

                for color_element in color_container_selenium:
                    actions.move_to_element(color_element).perform()
                    color_name_element = current_product_card.find_element(By.CSS_SELECTOR, '.product-card_color-name__ubjMl')
                    color_name = color_name_element.text.strip()
                    if color_name and color_name not in colors:
                        colors.append(color_name)

                image_url = current_product_card.find_elements(By.CSS_SELECTOR, '.product-card_item-image__caIPS a span img')[1].get_attribute('src')
                image_size = get_image_size(image_url)
                if image_size < 50000:
                    glass_dict = {
                        'Glass Name': glass_name,
                        'Price': glass_price,
                        'Colors': colors,
                        'Link': glass_link,
                        'Image_id': None,
                        'Shape': class_name,
                        'Store_id': store_id
                    }
                    print(f"Glass Name: {glass_name}, Price: {glass_price}, Colors: {colors}, Image URL: {image_url}")
                    push_to_mongo(glass_dict, image_url, store_collection, glasses_collection, fs, class_name, store_id)
                else:
                    print(f"Image size is greater than 50KB: {image_size}")
            except Exception as e:
                print(f"Error while fetching colors for {glass_name}: {e}")

# function to push the data to MongoDB
def push_to_mongo(glass_dict, image_url, store_collection, glasses_collection, fs, class_name, store_id):
    try:
        image = requests.get(image_url)
        image_id = fs.put(image.content, filename=glass_dict['Glass Name'] + '.jpg')
        glass_dict['Image_id'] = image_id

        # Insert the glass into the glasses collection
        result = glasses_collection.insert_one(glass_dict)
        glass_id = result.inserted_id

        # Update the store document with the new glass ObjectID
        store_collection.update_one(
            {'_id': store_id},
            {'$push': {f'glasses.{class_name}': glass_id}}
        )

        print(f"Successfully inserted the glass data to MongoDB and updated the store.")
    except Exception as e:
        print(f"An error occurred while pushing the data to MongoDB: {e}")

# Main function to drive the data scraping process
def scrapper_driver():
    print("Starting the data scraping process...")
    store = input("Please provide the store name: ")
    store_address = input("Please provide the store address: ")
    store_contact = input("Please provide the store contact number: ")
    store_base_url = input("Please provide the store base URL: ")

    db = connect_to_mongo_database('spexy_DB')
    fs = GridFS(db)

    # Create separate collections for stores and glasses
    store_collection = db['stores']
    glasses_collection = db['glasses']

    # Check if the store exists in the database
    store_doc = store_collection.find_one({'store_name': store})
    if not store_doc:
        # If the store doesn't exist, create a new document with the store details
        store_doc = {
            'store_name': store,
            'store_address': store_address,
            'store_contact': store_contact,
            'store_base_url': store_base_url,
            'glasses': {class_name: [] for class_name in classes}
        }
        result = store_collection.insert_one(store_doc)
        store_id = result.inserted_id
    else:
        store_id = store_doc['_id']

    # loop through each face type and scrape the data
    for class_name in classes:
        print("Scraping data for class: ", class_name)
        get_items_by_face_type_and_mongo(class_name, NUM_PAGES, store_collection, glasses_collection, fs, store_base_url, store_id)
        print("Data scraping completed for class: ", class_name)

if __name__ == '__main__':
    scrapper_driver()


    