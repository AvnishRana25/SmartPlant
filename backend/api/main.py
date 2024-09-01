from fastapi import FastAPI
import numpy as np
import pickle
from pydantic import BaseModel

# Initialize the FastAPI app
app = FastAPI()

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
def predict_crop(data: CropPredictionRequest):
    # Convert input data into a numpy array
    input_data = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
    
    # Make prediction using the loaded model
    prediction = model.predict(input_data)
    
    return {"prediction": prediction[0]}
