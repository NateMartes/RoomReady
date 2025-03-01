from fastapi import FastAPI

app = FastAPI()

@app.get("/images")
def recieve_image():
    return {"message"}
