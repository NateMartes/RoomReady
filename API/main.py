from fastapi import FastAPI
from fastapi import UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tempfile

app = FastAPI()

origins = [
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# method of recieving images
@app.post("/getstarted")
async def intial_prompt_data(file: UploadFile, latitude: float | None = None, longitude:float | None = None):
    with tempfile.NamedTemporaryFile() as fp:
        with open(fp.name, mode='wb') as f:
            f.write(await file.read(size=-1))

    if latitude == None or longitude == None:
        return {"No location data given!":"Null"}
    else:
        return {latitude:longitude}
