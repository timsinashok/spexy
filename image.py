import requests
from bs4 import BeautifulSoup

# URL of the product page
url = "https://www.eyebuydirect.com/eyeglasses/frames/ember-matte-black-l-18789"

# Send a GET request to the webpage
response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
if response.status_code == 200:
    soup = BeautifulSoup(response.content, "html.parser")

    # Locate the div with the specified class
    slider_item = soup.find("div", class_="image-slider_slider-item__wy9r2")
    if slider_item:
        # Find the nested span containing the image
        image_span = slider_item.find("span")
        if image_span:
            # Extract the image tag
            img_tag = image_span.find("img")
            if img_tag and img_tag.get("src"):
                image_url = img_tag["src"]
                print("Image URL:", image_url)
                
                # Download the image
                img_response = requests.get(image_url)
                if img_response.status_code == 200:
                    with open("ember_glasses.jpg", "wb") as file:
                        file.write(img_response.content)
                    print("Image saved as ember_glasses.jpg")
                else:
                    print("Failed to download the image.")
            else:
                print("Image tag or src not found.")
        else:
            print("Span containing the image not found.")
    else:
        print("Slider item div not found.")
else:
    print("Failed to fetch the webpage.")
