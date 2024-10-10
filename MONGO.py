import pymongo
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')
print(mongodb_uri)

client = pymongo.MongoClient(mongodb_uri)

# Select or create the database
db = client["eyeglasses_db"]

# Define collections for stores and glasses
stores_collection = db["stores"]

# Function to insert stores from the Stores CSV
def insert_stores_to_mongo(stores_csv):
    stores_data = pd.read_csv(stores_csv)

    # Convert DataFrame rows into dictionaries and insert them into MongoDB
    store_docs = []
    for _, row in stores_data.iterrows():
        store_doc = {
            "Store ID": row["Store ID"],
            "Store Name": row["Store Name"],
            "Location": row["Location"],
            "Glasses": []  # Initialize an empty list of glasses to be added later
        }
        store_docs.append(store_doc)

    # Insert all stores into MongoDB
    stores_collection.insert_many(store_docs)
    print(f"Inserted {len(store_docs)} stores into MongoDB.")

# Function to insert glass frames from the Glasses CSV and link them to stores
def insert_glasses_to_mongo(glasses_csv):
    glasses_data = pd.read_csv(glasses_csv)
    
    # Dynamically get the list of color columns 
    columns = glasses_data.columns
    color_columns = columns[columns.get_loc("Currency") + 1:]  # All columns after "Currency"

    # Iterate over the glasses and convert boolean color columns into an array of available colors
    for _, row in glasses_data.iterrows():
        # Build a list of available colors
        available_colors = [color for color in color_columns if row[color] == True]

        # Build the glass frame document
        glass_doc = {
            "Glass Name": row["Glass Name"],
            "Price": row["Price"],
            "Link": row["Link"],
            "Currency": row["Currency"],
            "Available Colors": available_colors
            ## "Image" : row["Image"] # yet to add image to the database
        }

        # Find the corresponding store by Store ID and add the glass to its "Glasses" array
        stores_collection.update_one(
            {"Store ID": row["Store ID"]},  # Ensure Store ID is present in CSV
            {"$push": {"Glasses": glass_doc}}
        )

    print("Inserted glasses and linked them to stores in MongoDB.")

# Call the functions to insert data from both CSV files
stores_csv = "Sample_Data/Stores.csv"  # path to stores CSV file
glasses_csv = "Sample_Data/cleaned_round_glasses_with_store_id.csv"  #path to glass frames CSV file

# Insert stores
insert_stores_to_mongo(stores_csv)
# Insert glasses and link them to stores
insert_glasses_to_mongo(glasses_csv)


