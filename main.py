import pymongo
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Load environment variables
load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')
# Initialize FastAPI app
app = FastAPI()

# MongoDB client setup
try:
    client = pymongo.MongoClient(mongodb_uri)
    db = client["specommender_db"]
    stores_collection = db["stores"]
    print("Successfully connected to the database.")
except Exception as e:
    print(f"An error occurred while connecting to the database: {e}")

# Define Pydantic models for request validation
class Store(BaseModel):
    store_id: str
    store_name: str
    location: str
    phone: str

class Glass(BaseModel):
    store_id: str
    frame_shape: str
    glass_name: str
    price: float
    link: str
    currency: str
    available_colors: List[str]

# Endpoint to add a new store
@app.post("/add_store")
async def add_store(store: Store):
    store_doc = {
        "Store ID": store.store_id,
        "Store Name": store.store_name,
        "Location": store.location,
        "Phone": store.phone,
        "Glasses": {}  # Initialize an empty dictionary for glasses by shape
    }
    stores_collection.insert_one(store_doc)
    return {"message": "Store added successfully!"}

# Endpoint to add a new glass to a specific store
@app.post("/add_glass")
async def add_glass(glass: Glass):
    glass_doc = {
        "Glass Name": glass.glass_name,
        "Price": glass.price,
        "Link": glass.link,
        "Currency": glass.currency,
        "Available Colors": glass.available_colors
    }
    
    # Add the glass under the specified frame shape
    result = stores_collection.update_one(
        {"Store ID": glass.store_id},
        {"$push": {f"Glasses.{glass.frame_shape}": glass_doc}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Store not found")
    
    return {"message": "Glass added to store successfully!"}

# Endpoint to get all stores
@app.get("/stores")
async def get_stores():
    stores = list(stores_collection.find({}, {"_id": 0}))  # Exclude the MongoDB internal ID
    return stores

# Endpoint to get all glasses for a specific store
@app.get("/stores/{store_id}/glasses")
async def get_glasses_for_store(store_id: str):
    store = stores_collection.find_one({"Store ID": store_id}, {"_id": 0, "Glasses": 1})
    if store:
        return store.get("Glasses", {})
    else:
        raise HTTPException(status_code=404, detail="Store not found")

# Endpoint to get glasses by frame shape for a specific store
@app.get("/stores/{store_id}/glasses/{frame_shape}")
async def get_glasses_by_shape(store_id: str, frame_shape: str):
    store = stores_collection.find_one({"Store ID": store_id}, {"_id": 0, f"Glasses.{frame_shape}": 1})
    if store and store.get("Glasses", {}).get(frame_shape):
        return store["Glasses"][frame_shape]
    else:
        raise HTTPException(status_code=404, detail="No glasses found for this shape in the specified store")
