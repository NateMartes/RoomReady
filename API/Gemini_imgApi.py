import os
from google import genai
import google.generativeai as genai

# Load API key from environment variable
with open("API/GEM.env", "r") as f:
    api_key = f.readline()  # Ensure this variable is set in your environment

genai.configure(api_key=api_key)

# Upload the file
file_path = "API\hi.png"
uploaded_file = genai.upload_file(path=file_path)

# Initialize the model
model = genai.GenerativeModel("gemini-2.0-flash-001")

# Generate a response based on the file content
response = model.generate_content(["Could you summarize this file?", uploaded_file])

# Print the response
print(response.text)
