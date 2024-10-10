import time
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import pandas as pd

# setting up the rate limit
RATE_LIMIT = 2


def get_items_by_face_type(class_name, num_pages):
    ''' function to scrape the glasses data from eyebuydirect.com based on the face type '''

    # creating a DataFrame to store the glass information
    glass_df = pd.DataFrame(columns=['Glass Name', 'Price', 'Colors', 'Link'])

    # base URL for the website
    base_url = 'https://www.eyebuydirect.com/eyeglasses/' 
    url_shape = base_url + class_name # URL for the specific face type

    for i in range(num_pages):  # Just looping through 2 pages for now
        page_url = f'{url_shape}#pagesize=60/page={i+1}'

        # Error handling for TimeoutException
        try:
            driver = webdriver.Chrome()
            driver.get(page_url)
            time.sleep(RATE_LIMIT)
            driver.set_page_load_timeout(10)
        except TimeoutException as e:
            print(f"Error occurred while accessing {page_url}: {e}")
            continue
        
        # closing the popup appearing in the website
        try:
            # locate the button using the class
            close_button = driver.find_element(By.CSS_SELECTOR, 'button.ebd-modal-close')

            # click the button
            close_button.click()
        except Exception as e:
            print(f"Error while clicking the close button: {e}")

        # extract the product cards from the page source
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        glass_card = soup.find_all('div', class_='product-card_product-card__0ByeI product-grid_item__xK_d4')
        
        # loop through each glass card and extract the glass name and price
        for glass_index, glass in enumerate(glass_card):
            glass_detail = glass.find('div', class_='product-card_item-name__7AUuf')
            glass_name = glass_detail.text.strip()
            glass_link = glass_detail.find('a')['href']
            glass_price = glass.find('div', class_='product-card_price-wrapper__YWDT_').span.text.strip()

            # find the corresponding product card using Selenium by matching the index
            try:
                # locate the product card elements in Selenium
                product_cards_selenium = driver.find_elements(By.CSS_SELECTOR, '.product-card_product-card__0ByeI.product-grid_item__xK_d4')

                # ensure that we are operating on the correct product card by using its index
                current_product_card = product_cards_selenium[glass_index]

                # find the color picker container within the current product card
                color_container_selenium = current_product_card.find_elements(By.CSS_SELECTOR, '.color-selector_color__nTqzF')

                # initialize ActionChains for hover simulation
                actions = ActionChains(driver)


                colors = []

                # loop through each color option in Selenium and simulate hover to get dynamic colors
                for color_element in color_container_selenium:
                    actions.move_to_element(color_element).perform()
                    #time.sleep(1)  # Give it time to load the color

                    # extract the color name dynamically after hover simulation
                    color_name_element = current_product_card.find_element(By.CSS_SELECTOR, '.product-card_color-name__ubjMl')
                    color_name = color_name_element.text.strip()

                    if color_name and color_name not in colors:
                        colors.append(color_name)

            # throw exception if there is any issue reading colors
            except Exception as e:
                print(f"Error while fetching colors for {glass_name}: {e}")
                colors = []

            # concatinate the extracted data to the dataframe
            new_glass_df = pd.DataFrame({'Glass Name': [glass_name], 'Price': [glass_price], 'Colors': [colors], 'Link': [glass_link]})
            glass_df = pd.concat([glass_df, new_glass_df], ignore_index=True)

        # close the driver for the current page
        driver.quit()

    # save the data to a CSV file
    glass_df.to_csv(f'{class_name}_glasses.csv', index=False)
    return None
