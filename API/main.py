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

    # Construct response
    response = {
        "message": "Upload successful",
        "file_size": len(file_bytes),  # Bytes length of the file
        "saved_path": file_path,
        "latitude": 0,
        "longitude": 0
    }

    if latitude is not None and longitude is not None:
        response["latitude"] = latitude
        response["longitude"] = longitude

    return response

@app.get("/test")
async def test_connection():
    return {"test": "data"}
