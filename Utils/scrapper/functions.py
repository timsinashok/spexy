import json
import cv2
import os
from inference_sdk import InferenceHTTPClient
from scrapper import get_items_by_face_type
import pandas as pd
import ast
import random

# read the API key from the secrets.json file
def read_api_key(file_path):
    # read the API key from the secrets.json file
    try:
        with open(file_path, 'r') as f:
            secrets = json.load(f)
        return secrets.get('api', {}).get('api_key')
    except Exception as e:
        print(f"There isUnexpected error: {e}")
        return None

model_api_key = read_api_key('secrets.json') # reading the api key from the secrets.json file

def search_results(num_pages):
    # open the camera to take a picture
    try:
        cam = cv2.VideoCapture(0)
        if not cam.isOpened():
            return "Could not open camera"
    except Exception as e:
        return f"Error opening camera: {e}"

    # set the resolution for a portrait image (e.g., 480x640 for a 3:4 aspect ratio)
    try:
        cam.set(cv2.CAP_PROP_FRAME_WIDTH, 480)
        cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)
    except Exception as e:
        cam.release()
        return f"Error setting camera resolution: {e}"

    print("Press 'Space' to capture the image or 'q' to quit.")

    while True:
        ret, frame = cam.read()
        if not ret:
            cam.release()
            return "Failed to capture image"

        # display the captured frame
        cv2.imshow("Capture Image", frame)

        # wait for a key press
        key = cv2.waitKey(1)

        # if the spacebar is pressed, capture the image
        if key == 32:  # Spacebar key code
            # save the captured image to a file
            captured_image_path = "captured_image.jpg"
            try:
                cv2.imwrite(captured_image_path, frame)
            except Exception as e:
                cam.release()
                return f"Error saving captured image: {e}"
            break

        # if 'q' is pressed, quit the loop
        elif key == ord('q'):
            cam.release()
            cv2.destroyAllWindows()
            return "Image capture cancelled by the user"

    # release the camera after capturing the image
    cam.release()
    cv2.destroyAllWindows()

    # initialize the InferenceHTTPClient with the API URL and key
    try:
        CLIENT = InferenceHTTPClient(
            api_url="https://detect.roboflow.com",
            api_key=model_api_key  # replace with your actual API key
        )
    except Exception as e:
        return f"Error initializing InferenceHTTPClient: {e}"

    # perform inference on the captured image
    try:
        result = CLIENT.infer(captured_image_path, model_id="face-shape-detection/1")
        print(result)
    except Exception as e:
        return f"Error during inference: {e}"

    # delete the captured image after inference
    try:
        os.remove(captured_image_path)
    except Exception as e:
        return f"Error deleting captured image: {e}"

    # extract the predicted face shape from the result
    try:
        class_name = result['predictions'][0]['class']
    except (KeyError, IndexError) as e:
        return f"Error extracting face shape from the result: {e}"

    # if no class is predicted, pick a random number between 0 and 5
    classes = ['heart', 'oval', 'round', 'square', 'triangle']
    if not class_name:
        i = random.randint(0, 5)  # pick a random number between 0 and 5
        class_name = classes[i]

    # prepare the message based on the prediction
    message = f"Detected face shape: {class_name} \n Here are the best suited glasses for you ....."

    # get the items based on the predicted face shape
    try:
        items = get_items_by_face_type(class_name, num_pages)
    except Exception as e:
        return f"Error retrieving items: {e}"

    return class_name

def clean_data(file_name):
    ''' function to clean the data and save it to a new csv file '''

    # read the data from the CSV file
    try:
        df = pd.read_csv(file_name)
    except FileNotFoundError:
        return f"Error: File {file_name} not found."
    except pd.errors.EmptyDataError:
        return "Error: The file is empty."
    except Exception as e:
        return f"Unexpected error reading CSV file: {e}"

    # cleaning the price column, converting it to number and putting currency in different column
    try:
        df['Price'] = df['Price'].str.replace('$', '').str.replace(',', '').astype(float)
        df['Currency'] = '$'
    except KeyError as e:
        return f"Error: 'Price' column not found. {e}"
    except ValueError as e:
        return f"Error converting 'Price' column to float: {e}"

    # convert the colors column to list of colors
    try:
        df['Colors'] = df['Colors'].apply(ast.literal_eval)
    except (KeyError, ValueError) as e:
        return f"Error parsing 'Colors' column: {e}"

    # use dummies to get the colors as dummies
    try:
        colors_dummies = pd.get_dummies(df['Colors'].apply(pd.Series).stack()).groupby(level=0).max()
    except Exception as e:
        return f"Error creating dummies for 'Colors': {e}"

    # concatenate the dummy columns back to the original dataframe
    try:
        df = pd.concat([df, colors_dummies], axis=1)
    except Exception as e:
        return f"Error concatenating dummy columns: {e}"

    # drop the colors column
    try:
        df.drop('Colors', axis=1, inplace=True)
    except KeyError as e:
        return f"Error: 'Colors' column not found. {e}"

    # check for nan values in the dataframe
    print("Number of null values in the dataset:", df.isnull().sum())

    # drop the rows with nan values
    try:
        df.dropna(inplace=True)
    except Exception as e:
        return f"Error dropping rows with NaN values: {e}"

    # saving the cleaned data to a new csv file
    cleaned_file_name = 'cleaned_' + file_name
    try:
        df.to_csv(cleaned_file_name, index=False)
    except Exception as e:
        return f"Error saving cleaned data to CSV: {e}"

    return df
