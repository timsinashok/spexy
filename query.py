from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://ap7897:C5CbV5CYC2II9g0Z@cluster0.tzf3m.mongodb.net/")
db = client["eyeglasses_db"]
stores_collection = db["stores"]

def get_store_and_glasses():
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

# Call the function to display store details and glasses
get_store_and_glasses()

# Close the connection
client.close()
