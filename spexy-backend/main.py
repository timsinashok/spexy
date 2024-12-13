import pymongo
from dotenv import load_dotenv
import os
from fastapi import FastAPI, HTTPException, UploadFile
from pydantic import BaseModel
from typing import List, Optional
from bson import ObjectId
from fastapi.responses import StreamingResponse
from gridfs import GridFS
import base64
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
from fastapi.responses import JSONResponse
from fastapi import File  # Add this if not already imported
#from inference_sdk import InferenceHTTPClient
#from inference import get_model
from roboflow import Roboflow


# Load environment variables
load_dotenv()
mongodb_uri = os.getenv('MONGODB_URI')
ROBOFLOW_API_KEY = os.getenv('ROBOFLOW_API_KEY')
ROBOFLOW_MODEL = 'face-shape-detection'

#model = get_model(model_id= ROBOFLOW_MODEL)

# CLIENT = InferenceHTTPClient(
#     api_url="https://detect.roboflow.com",
#     api_key=ROBOFLOW_API_KEY  # Using your existing environment variable
# )

# Initialize FastAPI app
app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB client setup
try:
    client = pymongo.MongoClient(mongodb_uri, tls=True)
    db = client["spexy_DB_2"]
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

# Define Pydantic models for request validation
class Glass(BaseModel):
    Glass_Name: str
    Price: float
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

# Predefined list of face shapes
# FACE_SHAPES = ["round", "square", "diamond", "oval", "heart"]

# @app.post("/infer")
# async def infer_image(file: UploadFile = File(...)):
#     try:
#         # Pick a random face shape
#         random_face_shape = choice(FACE_SHAPES)
        
#         # Return the result as JSON
#         result = {
#             "predictions":[
#                 {"class": random_face_shape}
#             ]
#         }
#         return JSONResponse(content=result)
    
#     except Exception as e:
#         print(f"Error processing request: {str(e)}")
#         raise HTTPException(status_code=500, detail="An unexpected error occurred.")

# @app.post("/infer")
# async def infer_image(file: UploadFile = File(...)):
#     if not ROBOFLOW_API_KEY:
#         raise HTTPException(status_code=500, detail="Roboflow API key is not configured")

#     try:
#         # Read the uploaded file
#         contents = await file.read()
        
#         # Save contents to a temporary file
#         temp_path = "temp_image.jpg"
#         with open(temp_path, "wb") as f:
#             f.write(contents)
        
#         # Use the Roboflow SDK to make prediction
#         try:
#             # result = CLIENT.infer(
#             #     temp_path,  # Use the temp file path instead of BytesIO
#             #     model_id="face-shape-detection/1"
#             # )
#             result = model.infer(image= temp_path)
            
#             print(f"Roboflow API response: {result}")
#             return JSONResponse(content=result)
            
#         finally:
#             # Clean up the temporary file
#             import os
#             if os.path.exists(temp_path):
#                 os.remove(temp_path)

#     except Exception as e:
#         print(f"Error processing request: {str(e)}")
#         raise HTTPException(status_code=500, detail=str(e))

#     finally:
#         await file.seek(0)
    
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
        "Shape": glass.Shape,
        "store_id": glass.store_id
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
@app.get("/stores/{store_id}/glasses/{frame_shape}")
async def get_glasses_by_shape(store_id: str, frame_shape: str):
    store = stores_collection.find_one({"_id": ObjectId(store_id)})
    if store and frame_shape in store["glasses"]:
        glass_ids = store["glasses"][frame_shape]
        shape_glasses = list(glasses_collection.find({"_id": {"$in": glass_ids}}).limit(6))
        return convert_objectid(shape_glasses)
    else:
        raise HTTPException(status_code=404, detail="No glasses found for this shape in the specified store")

# Endpoint to get an image for a specific glass
@app.get("/glasses/{glass_id}")
async def get_image(glass_id: str):
    # Retrieve the glass document from the database
    glass = glasses_collection.find_one({"_id": ObjectId(glass_id)})

    # If the glass doesn't exist, return a 404 error
    if not glass:
        raise HTTPException(status_code=404, detail="Glass not found")

    # currently we are not handling images because we have not added functionality in api to add iamge

    # Get the ObjectId of the image for the glass
    #image_id = glass.get("Image_id")

    # if not image_id:
    #     raise HTTPException(status_code=404, detail="Image not found for this glass")

    # Retrieve the image from GridFS
    # image = fs.get(image_id)

    # Encode the image data as base64
    # image_data = base64.b64encode(image.read()).decode('utf-8')

    # Return the glass information as a JSON response, including the image data
    return {
        "Glass Name": glass["Glass Name"],
        "Price": glass["Price"],
        "Colors": glass["Colors"],
        "Link": glass["Link"],
        # "image_data": image_data
    }
try:
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace().project(ROBOFLOW_MODEL)
    model = project.version(1).model
except Exception as e:
    print(f"Error initializing Roboflow model: {e}")
    model = None


@app.post("/infer")
async def infer_image(file: UploadFile = File(...)):
    if not model:
        raise HTTPException(status_code=500, detail="Roboflow model is not configured properly.")
    
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Save contents to a temporary file
        temp_path = "temp_image.jpg"
        with open(temp_path, "wb") as f:
            f.write(contents)
        
        try:
            # Make prediction using Roboflow model
            prediction = model.predict(temp_path).json()
            
            # Return the prediction as JSON
            return JSONResponse(content=prediction)
        
        finally:
            # Clean up the temporary file
            import os
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except Exception as e:
        print(f"Error during prediction: {e}")
        
        # Fallback: Return a random face shape
        random_face_shape = choice(FACE_SHAPES)
        fallback_result = {
            "predictions": [
                {"class": random_face_shape}
            ]
        }
        return JSONResponse(content=fallback_result)

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
            query["Price"]["$gte"] = f"${min_price}"
        if max_price is not None:
            query["Price"]["$lte"] =f"${min_price}"
    if shape:
        query["Shape"] = shape

    glasses = list(glasses_collection.find(query))
    return convert_objectid(glasses)

# New endpoint to update store attributes
@app.put("/update_store/{store_id}")
async def update_store(store_id: str, store: Store):
    update_result = stores_collection.update_one(
        {"_id": ObjectId(store_id)},
        {"$set": store.dict()}
    )
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Store not found")
    return {"message": "Store updated successfully"}

# New endpoint to update glass attributes
@app.put("/update_glass/{glass_id}")
async def update_glass(glass_id: str, glass: Glass):
    glass = glass.dict()
    glass['Glass Name'] = glass['Glass_Name']
    del glass['Glass_Name']  
    update_result = glasses_collection.update_one(
        {"_id": ObjectId(glass_id)},
        {"$set": glass}
    )
    if update_result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Glass not found")
    return {"message": "Glass updated successfully"}

# New endpoint to delete a store
@app.delete("/delete_store/{store_id}")
async def delete_store(store_id: str):
    store = stores_collection.find_one({"_id": ObjectId(store_id)})
    if store:
        # Remove glasses associated with the store
        for shape in store["glasses"]:
            glass_ids = store["glasses"][shape]
            glasses_collection.delete_many({"_id": {"$in": glass_ids}})
       
        # Delete the store
        stores_collection.delete_one({"_id": ObjectId(store_id)})
        return {"message": "Store and associated glasses deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Store not found")

# New endpoint to delete a glass
@app.delete("/delete_glass/{glass_id}")
async def delete_glass(glass_id: str):
    glass = glasses_collection.find_one({"_id": ObjectId(glass_id)})
    if glass:
        # Remove glass from store's glasses list
        stores_collection.update_one(
            {"_id": ObjectId(glass["store_id"])},
            {"$pull": {f"glasses.{glass['Shape']}": ObjectId(glass_id)}}
        )
       
        # Delete the glass document
        glasses_collection.delete_one({"_id": ObjectId(glass_id)})
        return {"message": "Glass deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Glass not found")

@app.get("/get_image/")
async def get_image(glass_link: str):
    try:
        response = requests.get(glass_link, headers={"User-Agent": "Mozilla/5.0"})
        if response.status_code != 200:
            raise HTTPException(status_code=400, detail="Failed to fetch the webpage.")

        soup = BeautifulSoup(response.content, "html.parser")
        print('parsed')

        # Locate the div with the specified class
        slider_item = soup.find("div", class_="image-slider_slider-item__wy9r2")
        if not slider_item:
            raise HTTPException(status_code=404, detail="Image container not found.")

        # Find the nested span containing the image
        image_span = slider_item.find("span")
        if not image_span:
            raise HTTPException(status_code=404, detail="Span containing the image not found.")

        # Extract the image tag
        img_tag = image_span.find("img")
        if not img_tag or not img_tag.get("src"):
            raise HTTPException(status_code=404, detail="Image tag or src not found.")

        image_url = img_tag["src"]
        return JSONResponse(content={"image_url": image_url})

        # print("Image URL:", image_url)

        # # return image_url
        # # Fetch the image
        # img_response = requests.get(image_url)
        # if img_response.status_code != 200:
        #     raise HTTPException(status_code=400, detail="Failed to download the image.")

        # # Stream the image as a response
        # return StreamingResponse(BytesIO(img_response.content), media_type="image/jpeg")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
