from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pickle
from pydantic import BaseModel

# Initialize the FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Add your frontend URL here
    "http://localhost:3001",  # Add any other origins you need
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained Random Forest model
model_path = "models/RandomForest.pkl"
with open(model_path, 'rb') as file:
    model = pickle.load(file)

# Define the input data structure
class CropPredictionRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

# Define the prediction endpoint
@app.post("/predict")
async def predict_crop(data: CropPredictionRequest):
    # Convert input data into a numpy array
    input_data = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
    
    # Make prediction using the loaded model
    prediction = model.predict(input_data)
    
    return {"prediction": prediction[0]}

# Optional: Add a root endpoint for testing
@app.get("/")
async def root():
    return {"message": "Crop Prediction API is running"}