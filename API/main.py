from fastapi import FastAPI, File, UploadFile,  HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tempfile
from typing import Optional
from promptparser import PromptParser
import gemini_reviewer
from WeatherApi import NOAAWeather
import json

app = FastAPI()
with open("GEM.env", "r") as f:
    GEM_API_KEY = f.readline()

with open("NOAA.env", "r") as f:
    NOAA_API_KEY = f.readline()

model = gemini_reviewer.create_model(GEM_API_KEY)
weather = NOAAWeather(NOAA_API_KEY)

origins = [
    "http://localhost:8080",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# method of recieving images
@app.post("/test")
async def testfile(
    file: UploadFile = File(...),  # Required File Upload (raw bytes)
    latitude: Optional[float] = Query(None),  # Optional Latitude
    longitude: Optional[float] = Query(None)  # Optional Longitude
):
    # Read the raw file data as bytes
    file_bytes = await file.read()

    # Save file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(file_bytes)
        file_path = temp_file.name  # Save the file path

    # Construct response
    response = {
        "Summary": "The room, being inside a building, is vulnerable to disasters that impact the structure itself such as earthquakes, high winds, and flooding. Additionally, it is vulnerable to other disasters such as fire. Ensuring structural integrity and having adequate evacuation plans are crucial for safety.",
        "risks": [
            ["Fire Hazard", " A fire could start from electrical faults, cooking equipment, or other sources, leading to rapid spread of flames and smoke", "Install smoke detectors and sprinkler systems, and have fire extinguishers readily available."],
            ["Earthquake Risk", "The structure may not withstand strong ground shaking, leading to collapse or falling debris.", "Anchor furniture to walls, and follow evacuation procedures in the event of an earthquake."],
            ["High Wind Damage", "Strong winds could break windows or compromise the building's structure, creating hazards from flying debris.", "Ensure windows are impact-resistant and that the building is properly reinforced to withstand high winds."],
            ["Flooding Damage", "Water could enter the room and damage the structure and its contents.", "Elevate valuables and furniture off the floor, and ensure that there are water damage emergency plans."]
        ]
    }

    return response

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...),  # Required File Upload (raw bytes)
    latitude: Optional[float] = Query(None),  # Optional Latitude
    longitude: Optional[float] = Query(None)  # Optional Longitude
):
    # Read the raw file data as bytes
    file_bytes = await file.read()

    # Save file to a temporary location
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(file_bytes)
        file_path = temp_file.name  # Save the file path
        print(file_path)

    if latitude is not None and longitude is not None:
        forecast = weather.get_7_day_forecast(latitude, longitude)
        gemini_reply = gemini_reviewer.review_img_with_weather(model, file_path, json.dumps(forecast))

    risk_informatics = PromptParser(gemini_reply)

    # Construct response
    response = {
        "summary": risk_informatics.get_summary(),
        #"total_risks": "",  # Bytes length of the file
        "risks" : []
    }

    for risk in risk_informatics.get_risks():
        response["risks"].append([risk[0], risk[1], risk[2]])

    return response
