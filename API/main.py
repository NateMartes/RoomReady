from fastapi import FastAPI, File, UploadFile,  HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tempfile
from typing import Optional

app = FastAPI()

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

    # At this point, if you've said enough prayers, you should have an image uploaded
    # to the dockerfile. You can then prompt gemini with this image and as well as weather
    # information

    # Construct response
    response = {
        "summary": "",
        #"total_risks": "",  # Bytes length of the file
        "risks" : [
            ["", "", ""]
            #    .
            #    .
            #    .
        ]
    }

    response["summary"] = "ldsjfklj"
    #response["total_risks"] = "lkjsfdlksdfjk"
    #for risk in risks
    response["risks"].append(["riskname", "riskdesc.", "improvements"])

    if latitude is not None and longitude is not None:
        response["latitude"] = latitude
        response["longitude"] = longitude

    return response
