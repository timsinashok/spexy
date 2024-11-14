# Spexy

Spexy is an intelligent platform that recommends eyeglasses based on the shape of the user's face. This repository contains the codebase for both the backend and frontend of Spexy, allowing seamless functionality from user input to eyeglass recommendations.

The frontend of the app is built using `React` framework and backend is built using `FastAPI`. 

---

## Table of Contents
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
  - [Prerequisites](#prerequisites)
  - [Running the Backend](#running-the-backend)
- [Frontend Setup](#frontend-setup)
  - [Prerequisites](#prerequisites-1)
  - [Running the Frontend](#running-the-frontend)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contact](#contact)

---

## Getting Started

To get started with Spexy, clone the repository and follow the setup instructions for both the backend and frontend to run the application locally.

---

## Backend Setup

### Prerequisites

- Python 3.x installed on your system
- Virtual environment package (`venv`)
- MongoDB for data storage

### Running the Backend

1. Create and activate a virtual environment:

   ```bash
   python -m venv env
   source env/bin/activate
   ```

2. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file inside the `FINAL_PROJECT_PPDS` folder and add your MongoDB URI:

   ```
   MONGODB_URI=your_mongodb_uri
   ```

4. Navigate to the `spexy-backend` directory and run the server using `uvicorn`:

   ```bash
   cd spexy-backend
   uvicorn main:app --reload
   ```

By default, the backend will start on port `8000`.

---

## Frontend Setup

### Prerequisites

- Node.js and npm installed on your system

### Running the Frontend

1. Navigate to the `spexy-frontend` directory:

   ```bash
   cd spexy-frontend
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Update the `.env` file with your Roboflow API key:

   ```
   REACT_APP_RoboflowAPI=your_roboflow_api
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

By default, the frontend will start on port `3000`.

---

## Environment Variables

### Backend

Create a `.env` file inside the `FINAL_PROJECT_PPDS` folder with the following content:

```
MONGODB_URI=your_mongodb_uri
```

### Frontend

Add the following to your `.env` file in the `spexy-frontend` folder:

```
REACT_APP_RoboflowAPI=your_roboflow_api
```

---

## Project Structure

- **spexy-backend/**: Contains the backend code.
  - `main.py`: Entry point for the backend server.
  - `/scrapper`: Code to run the data scrapper and populate database
- **spexy-frontend/**: Contains the frontend 
    - `/src/components` contains all the components of the program.
    - `App.js` contains the entrypoint for the frontend React App.

---

## Contact

For any inquiries or feedback, please reach out to our contributors. 

---
