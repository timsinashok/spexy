import pymongo
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
from fastapi.responses import StreamingResponse
from gridfs import GridFS
import base64

# setting up certificate for ssl error
import certifi
ca = certifi.where()

# Load environment variables
load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')

# Initialize FastAPI app
app = FastAPI()

# MongoDB client setup
try:
    client = pymongo.MongoClient(mongodb_uri, tls=True)
    db = client["specommenderDB"]
    stores_collection = db["stores"]
    glasses_collection = db["glasses"]
    fs = GridFS(db)
    print("Successfully connected to the database.")
except Exception as e:
    print(f"An error occurred while connecting to the database: {e}")

# Define Pydantic models for request validation
class Store(BaseModel):
    store_name: str
    store_address: str
    store_contact: str
    store_base_url: str

class Glass(BaseModel):
    Glass_Name: str
    Price: str
    Colors: List[str]
    Link: str
    Shape: str
    store_id: str

# Helper function to convert ObjectId to string
def convert_objectid(obj):
    if isinstance(obj, dict):
        return {k: convert_objectid(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [convert_objectid(item) for item in obj]
    elif isinstance(obj, ObjectId):
        return str(obj)
    return obj

# Endpoint to add a new store
@app.post("/add_store")
async def add_store(store: Store):
    store_doc = {
        "store_name": store.store_name,
        "store_address": store.store_address,
        "store_contact": store.store_contact,
        "store_base_url": store.store_base_url,
        "glasses": {"oval": [], "round": [], "square": []}
    }
    result = stores_collection.insert_one(store_doc)
    return {"message": "Store added successfully!", "store_id": str(result.inserted_id)}

# Endpoint to add a new glass
@app.post("/add_glass")
async def add_glass(glass: Glass):
    glass_doc = {
        "Glass Name": glass.Glass_Name,
        "Price": glass.Price,
        "Colors": glass.Colors,
        "Link": glass.Link,
        "Shape": glass.Shape
    }
    
    # Insert the glass into the glasses collection
    result = glasses_collection.insert_one(glass_doc)
    glass_id = result.inserted_id

    # Update the store document with the new glass ObjectID
    stores_collection.update_one(
        {'_id': ObjectId(glass.store_id)},
        {'$push': {f'glasses.{glass.Shape}': glass_id}}
    )

    return {"message": "Glass added successfully!", "glass_id": str(glass_id)}

# Endpoint to get all stores
@app.get("/stores")
async def get_stores():
    print("Fetching stores...")
    stores = list(stores_collection.find({}))
    print("Stores fetched successfully!")
    return convert_objectid(stores)

# Endpoint to get all glasses for a specific store
@app.get("/stores/{store_name}/glasses")
async def get_glasses_for_store(store_name: str):
    store = stores_collection.find_one({"store_name": store_name})
    if store:
        glasses = {shape: [] for shape in ["oval", "round", "square"]}
        for shape in glasses:
            glass_ids = store["glasses"][shape]
            shape_glasses = list(glasses_collection.find({"_id": {"$in": glass_ids}}))
            glasses[shape] = convert_objectid(shape_glasses)
        return glasses
    else:
        raise HTTPException(status_code=404, detail="Store not found")

# Endpoint to get glasses by frame shape for a specific store
@app.get("/stores/{store_name}/glasses/{frame_shape}")
async def get_glasses_by_shape(store_name: str, frame_shape: str):
    store = stores_collection.find_one({"_id": store_name})
    if store and frame_shape in store["glasses"]:
        glass_ids = store["glasses"][frame_shape]
        shape_glasses = list(glasses_collection.find({"_id": {"$in": glass_ids}}))
        return convert_objectid(shape_glasses)
    else:
        raise HTTPException(status_code=404, detail="No glasses found for this shape in the specified store")

# Endpoint to get an image for a specific glass
@app.get("/image/{glass_id}")
async def get_image(glass_id: str):
    # Retrieve the glass document from the database
    glass = glasses_collection.find_one({"_id": ObjectId(glass_id)})

    # If the glass doesn't exist, return a 404 error
    if not glass:
        raise HTTPException(status_code=404, detail="Glass not found")

    # Get the ObjectId of the image for the glass
    image_id = glass.get("Image_id")

    if not image_id:
        raise HTTPException(status_code=404, detail="Image not found for this glass")

    # Retrieve the image from GridFS
    image = fs.get(image_id)

    # Encode the image data as base64
    image_data = base64.b64encode(image.read()).decode('utf-8')

    # Return the glass information as a JSON response, including the image data
    return {
        "Glass Name": glass["Glass Name"],
        "Price": glass["Price"],
        "Colors": glass["Colors"],
        "Link": glass["Link"],
        "image_data": image_data
    }

# New endpoint to search for glasses across all stores
@app.get("/search_glasses")
async def search_glasses(
    name: Optional[str] = None, 
    min_price: Optional[float] = None, 
    max_price: Optional[float] = None, 
    shape: Optional[str] = None
):
    query = {}
    if name:
        query["Glass Name"] = {"$regex": name, "$options": "i"}
    if min_price is not None or max_price is not None:
        query["Price"] = {}
        if min_price is not None:
            query["Price"]["$gte"] = min_price
        if max_price is not None:
            query["Price"]["$lte"] = max_price
    if shape:
        query["Shape"] = shape

    glasses = list(glasses_collection.find(query))
    return convert_objectid(glasses)


