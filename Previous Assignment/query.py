from pymongo import MongoClient

# helper function to display all the data in the database
def get_store_and_glasses(stores_collection):
    # Fetch all stores and their glass frames
    stores = stores_collection.find({}, {"name": 1, "location": 1, "glassFrames": 1})

    # Iterate through the stores and print their details
    for store in stores:
        print(f"Store Name: {store['name']}")
        print(f"Location: {store['location']}")
        print("Glass Frames Available:")
        
        # Iterate through the glass frames available at the store
        for frame in store['glassFrames']:
            print(f"  Frame Name: {frame['name']}")
            print(f"    Price: ${frame['price']}")
            print(f"    Link: {frame['link']}")
            print(f"    Currency: {frame['currency']}")
            print("     Available Colours:          ")
            for colour in frame['Available Colours']:
                print(f"       {colour}")
        print("-" * 40)


