import pymongo
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')
print(mongodb_uri)

try:
    client = pymongo.MongoClient(mongodb_uri)

    # Select or create the database
    db = client["eyeglasses_db"]

    # Define collections for stores and glasses
    stores_collection = db["stores"]

    print("Successfully connected to the database.")
except Exception as e:
    print(f"An error occurred while connecting to the database: {e}")

# Function to insert stores from the Stores CSV
def insert_stores_to_mongo(stores_csv):
    try:
        stores_data = pd.read_csv(stores_csv)

        # Convert DataFrame rows into dictionaries and insert them into MongoDB
        store_docs = []
        for _, row in stores_data.iterrows():
            # Check if a store with the same "Store ID" already exists in the collection
            existing_store = stores_collection.find_one({"Store ID": row["Store ID"]})
            if existing_store is None:
                store_doc = {
                    "Store ID": row["Store ID"],
                    "Store Name": row["Store Name"],
                    "Location": row["Location"],
                    "Glasses": []  # Initialize an empty list of glasses to be added later
                }
                store_docs.append(store_doc)

        # Insert all new stores into MongoDB
        if store_docs:
            stores_collection.insert_many(store_docs)
            print(f"Inserted {len(store_docs)} new stores into MongoDB.")
        else:
            print("No new stores to insert.")
    except Exception as e:
        print(f"An error occurred while inserting stores: {e}")

# Function to insert glass frames from the Glasses CSV and link them to stores
def insert_glasses_to_mongo(glasses_csv):
    try:
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
            }

            # Check if a glass with the same "Glass Name" already exists in the collection
            existing_glass = stores_collection.find_one({"Glasses.Glass Name": row["Glass Name"]})
            if existing_glass is None:
                # Find the corresponding store by Store ID and add the glass to its "Glasses" array
                stores_collection.update_one(
                    {"Store ID": row["Store ID"]},  # Ensure Store ID is present in CSV
                    {"$push": {"Glasses": glass_doc}}
                )

        print("Inserted new glasses and linked them to stores in MongoDB.")
    except Exception as e:
        print(f"An error occurred while inserting glasses: {e}")

# function to display all hte stores in the database
def display_all_stores():
    stores = stores_collection.find()
    for store in stores:
        print(f"Store ID: {store['Store ID']}")
        print(f"Store Name: {store['Store Name']}")
        print(f"Location: {store['Location']}")
        print("\n")


# function to beautify the output of hte store query
def beautify_output(store):
    print(f"Store ID: {store['Store ID']}")
    for glass in store['Glasses']:
        print(f"  - Glass Name: {glass['Glass Name']}")
        print(f"    - Price: {glass['Currency']}{glass['Price']}")
        print(f"    - Link: {glass['Link']}")
        print(f"    - Available Colors: {', '.join(glass['Available Colors'])}")

# Function to read a store from the MongoDB
def read_particular_store_from_mongo(store_id):
    try:
        store = stores_collection.find_one({"Store ID": store_id})
        if store:
            beautify_output(store)
        else:
            print(f"No store found with ID: {store_id}")
    except Exception as e:
        print(f"An error occurred while reading the store: {e}")

# Function to update a store in the MongoDB
def update_store_in_mongo(store_id, new_data):
    try:
        result = stores_collection.update_one({"Store ID": store_id}, {"$set": new_data})
        if result.modified_count:
            print(f"Successfully updated store with ID: {store_id}")
        else:
            print(f"No store found with ID: {store_id}")
    except Exception as e:
        print(f"An error occurred while updating the store: {e}")


# Function to delete a store from the MongoDB
def delete_store_from_mongo(store_id):
    try:
        result = stores_collection.delete_one({"Store ID": store_id})
        if result.deleted_count:
            print(f"Successfully deleted store with ID: {store_id}")
        else:
            print(f"No store found with ID: {store_id}")
    except Exception as e:
        print(f"An error occurred while deleting the store: {e}")

# main driver function
def main():
    while True:
        print("\nSpecommender Database")
        print("1. Add stores and glasses to the database from CSV files at Sample_Data")
        print("2. View Glasses for a store")
        print("3. Update a store in the database")
        print("4. Delete a store")
        print("5. Exit")

        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            # Insert data from CSV files
            stores_csv = "Sample_Data/Stores.csv"  # path to stores CSV file
            glasses_csv = "Sample_Data/cleaned_round_glasses_with_store_id.csv"  #path to glass frames CSV file

            # Insert stores
            insert_stores_to_mongo(stores_csv)
            # Insert glasses and link them to stores
            insert_glasses_to_mongo(glasses_csv)

        elif choice == '2':
            # Read a store
            try:
                display_all_stores()
                print("Enter the id of the store you want to explore")
                id_ = int(input('Store id: '))
                read_particular_store_from_mongo(id_)
            except ValueError:
                print("Invalid input. Please enter a number.")

        elif choice == '3':
            # Update a store
            try:
                display_all_stores()
                print("Enter the id of the store you want to update")
                id_ = int(input('Store id: '))
                # currently we only allow updating hte name of the store
                # Enter the new name of the store
                new_name = input("Enter the new name of the store: ")
                update_store_in_mongo(id_, {"Store Name": new_name})
            except ValueError:
                print("Invalid input. Please enter a number.")

        elif choice == '4':
            # Delete a store
            try:
                print("Enter the id of the store you want to delete")
                id_ = int(input('Store id: '))
                delete_store_from_mongo(id_)
            except ValueError:
                print("Invalid input. Please enter a number.")

        elif choice == '5':
            break

        else:
            print("Invalid choice. Please try again.")

    client.close()
    print("Goodbye!")

if __name__ == "__main__":
    main()