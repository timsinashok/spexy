# Project Contributors
- Aabaran Paudel
- Yaghyesh Ghimire
- Ashok Timsina
- Bipana Bastola
  

# Database

**Specomender** uses a MongoDB-based database schema designed to manage, retrieve, and store data related to stores and glasses. It consists of the following collections:

## Why MongoDB?

Each pair of glasses has attributes like colors, links, and images. MongoDB's flexible structure allows us to store all these details in a single document, making retrieval easy without needing complex joins like in SQL. In SQL, handling this kind of unstructured or semi-structured data requires complex queries, while MongoDB allows us to store all product details in one place.

MongoDB also scales horizontally, so as the number of glasses and stores grows, the database can handle larger volumes of data without performance loss. Moreover, it simplifies relationships by referencing store data using `store_ID`, without the complexity of foreign keys or joins that SQL databases typically require.

## Schema
![schema](https://github.com/user-attachments/assets/cf30dcdd-21cc-4562-a72b-ebf9480c391e)

## Collections

### 1. Glasses Collection

This collection stores the details of individual glasses available in various stores. It includes the following fields:

- **`glass_ID`**: A unique identifier for each pair of glasses.
- **`name`**: The name/model of the glasses.
- **`price`**: The price of the glasses.
- **`link`**: A URL link to the product page.
- **`currency`**: The currency used for the price.
- **`colors`**: A list of colors available for the glasses.

### 2. Stores Collection

This collection stores the details of stores where the glasses are available. It includes the following fields:

- **`store_ID`**: A unique identifier for each store.
- **`storeName`**: The name of the store.
- **`storeAddress`**: The address of the store.

## How to Run

1. Clone this repository to your machine and navigate to the project directory:  

   ```
   https://github.com/bipana06/Final_Project_PPDS.git
   ```

3. Create a `.env` file in the project, including the MongoDB connection string:

    ```
    MONGODB_URI="mongodb+srv://<db_username>:<db_password>@<cluster_url>/<database_name>?retryWrites=true&w=majority&appName=<cluster_name>"
    ```
4.  Install the required packages

  ```
  pip install -r requirements.txt
  ```
    
5. Run the script:

    ```
    python mongo.py
    ```
