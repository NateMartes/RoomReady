from fastapi import FastAPI
from fastapi import UploadFile

app = FastAPI()

# method of recieving images
@app.post("/getstarted")
async def intial_prompt_data(file: UploadFile):
    with open("imagedata.jpg", "wb") as f:
        f.write(await file.read(size=-1))
