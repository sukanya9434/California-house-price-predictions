import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model=joblib.load('house_model.joblib')
features=joblib.load("house_features.joblib")

#input schema
class Housefeatures(BaseModel):
    MedInc: float = Field(gt=0, description="Median Income of Neighbourhood")
    HouseAge: float=Field(gt=0, description="Average age of house in the block")
    AveRooms: float=Field(gt=0, description="Average number of rooms")
    AveBedrms: float=Field(gt=0, description="Average number of bedrooms")
    Population: float=Field(gt=0, description="Population of the block")
    AveOccup: float=Field(gt=0, description="Average number of household members")  
    Latitude: float=Field(ge=-90, le=90, description="Latitude of the block")
    Longitude: float=Field(ge=-180, le=180, description="Longitude of the block")                 

@app.get("/")
def home():
    return{
        "message": "California house prediction api",
        "status":"running",
        "endpoint":"send POST request to /predict"
    }

@app.get('/health')
def health():
   return{ "status":"running",
    "model": "RandomForestregressor",
    "features":features,
    "avg_error":"$39,000"
   }

#predict
@app.post('/predict')
def predict(house:Housefeatures):
  try:
    input_data=pd.DataFrame([{
    "MedInc": house.MedInc,
    "HouseAge" : house.HouseAge,
    "AveRooms" : house.AveRooms,
    "AveBedrms" : house.AveBedrms,
    "Population" : house.Population,
    "AveOccup" : house.AveOccup,
    "Latitude" : house.Latitude,
    "Longitude" : house.Longitude
    }])
    #prediction
    predicted = model.predict(input_data)[0]
    price_usd= predicted* 100000

    return{
       "predicted_price":f"${price_usd:,.0f}",
       "predicted_price_short": f"${predicted:.2f} hundred thousands",
       "confidence_range" : f"${price_usd-39000:,.0f} to ${price_usd+39000:,.0f}"
    }
  except Exception as e:
    raise HTTPException(
       status_code = 500,
       detail=f"prediction failed: {str(e)}"
    )