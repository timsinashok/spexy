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
    client = pymongo.MongoClient(mongodb_uri)
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
    for store in stores:
        store["_id"] = str(store["_id"])
    return stores

# Endpoint to get all glasses for a specific store
@app.get("/stores/{store_id}/glasses")
async def get_glasses_for_store(store_id: str):
    store = stores_collection.find_one({"_id": ObjectId(store_id)})
    if store:
        glasses = {shape: [] for shape in ["oval", "round", "square"]}
        for shape in glasses:
            glass_ids = store["glasses"][shape]
            shape_glasses = list(glasses_collection.find({"_id": {"$in": glass_ids}}))
            for glass in shape_glasses:
                glass["_id"] = str(glass["_id"])
                glasses[shape].append(glass)
        return glasses
    else:
        raise HTTPException(status_code=404, detail="Store not found")

# Endpoint to get glasses by frame shape for a specific store
@app.get("/stores/{store_id}/glasses/{frame_shape}")
async def get_glasses_by_shape(store_id: str, frame_shape: str):
    store = stores_collection.find_one({"_id": ObjectId(store_id)})
    if store and frame_shape in store["glasses"]:
        glass_ids = store["glasses"][frame_shape]
        shape_glasses = list(glasses_collection.find({"_id": {"$in": glass_ids}}))
        for glass in shape_glasses:
            glass["_id"] = str(glass["_id"])
        return shape_glasses
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
    for glass in glasses:
        glass["_id"] = str(glass["_id"])

    return glasses









# import pymongo
# from dotenv import load_dotenv
# import os
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from typing import List
# from bson import ObjectId
# from fastapi.responses import StreamingResponse
# from gridfs import GridFS
# import base64

# # Load environment variables
# load_dotenv()
# mongodb_uri = os.getenv('MONGODB_URI')

# # Initialize FastAPI app
# app = FastAPI()

# # MongoDB client setup
# try:
#     client = pymongo.MongoClient(mongodb_uri)
#     db = client["specommender_db"]
#     fs = GridFS(db)
#     print("Successfully connected to the database.")
# except Exception as e:
#     print(f"An error occurred while connecting to the database: {e}")

# # Define Pydantic models for request validation
# class Store(BaseModel):
#     store_name: str
#     store_address: str
#     store_contact: str
#     store_base_url: str

# class Glass(BaseModel):
#     frame_shape: str
#     glass_name: str
#     price: float
#     link: str
#     currency: str
#     available_colors: List[str]
#     image_id: str

# # Endpoint to add a new store
# @app.post("/add_store")
# async def add_store(store: Store):
#     store_doc = {
#         "store_name": store.store_name,
#         "store_address": store.store_address,
#         "store_contact": store.store_contact,
#         "store_base_url": store.store_base_url,
#         "oval": [],
#         "round": [],
#         "square": []
#     }
#     db.insert_one(store_doc)
#     return {"message": "Store added successfully!"}

# # Endpoint to add a new glass to a specific store
# @app.post("store/add_glass")
# async def add_glass(glass: Glass):
#     glass_doc = {
#         "glass_name": glass.glass_name,
#         "price": glass.price,
#         "link": glass.link,
#         "currency": glass.currency,
#         "available_colors": glass.available_colors,
#         "image_id": ObjectId(glass.image_id)
#     }

#     # Add the glass under the specified frame shape
#     result = db.update_one(
#         {"store_name": glass.store_name},
#         {"$push": {f"{glass.frame_shape}": glass_doc}}
#     )

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Store not found")

#     return {"message": "Glass added to store successfully!"}

# # Endpoint to get all stores
# @app.get("/stores")
# async def get_stores():
#     stores = list(db.find({}, {"_id": 0}))  # Exclude the MongoDB internal ID
#     return stores

# # Endpoint to get all glasses for a specific store
# @app.get("/stores/{store_name}/glasses")
# async def get_glasses_for_store(store_name: str):
#     store = stores_collection.find_one({"store_name": store_name}, {"_id": 0, "oval": 1, "round": 1, "square": 1})
#     if store:
#         return {
#             "oval": store.get("oval", []),
#             "round": store.get("round", []),
#             "square": store.get("square", [])
#         }
#     else:
#         raise HTTPException(status_code=404, detail="Store not found")

# # Endpoint to get glasses by frame shape for a specific store
# @app.get("/stores/{store_name}/glasses/{frame_shape}")
# async def get_glasses_by_shape(store_name: str, frame_shape: str):
#     store = stores_collection.find_one({"store_name": store_name}, {"_id": 0, f"{frame_shape}": 1})
#     if store and store.get(frame_shape):
#         return store[frame_shape]
#     else:
#         raise HTTPException(status_code=404, detail="No glasses found for this shape in the specified store")

# # Endpoint to get an image for a specific glass
# @app.get("/image/{glass_id}")
# async def get_image(glass_id: str):
#     # Retrieve the glass document from the database
#     glass = stores_collection.find_one({"$or": [
#         {"oval.image_id": ObjectId(glass_id)},
#         {"round.image_id": ObjectId(glass_id)},
#         {"square.image_id": ObjectId(glass_id)}
#     ]})

#     # If the glass doesn't exist, return a 404 error
#     if not glass:
#         raise HTTPException(status_code=404, detail="Glass not found")

#     # Get the ObjectId of the image for the glass
#     image_id = None
#     for shape in ["oval", "round", "square"]:
#         for g in glass.get(shape, []):
#             if str(g["image_id"]) == glass_id:
#                 image_id = g["image_id"]
#                 break
#         if image_id:
#             break

#     # Retrieve the image from GridFS
#     image = fs.get(image_id)

#     # Encode the image data as base64
#     image_data = base64.b64encode(image.read()).decode('utf-8')

#     # Return the glass information as a JSON response, including the image data
#     return {
#         "glass_name": g["glass_name"],
#         "price": g["price"],
#         "available_colors": g["available_colors"],
#         "link": g["link"],
#         "image_data": image_data
#     }
