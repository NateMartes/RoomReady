from google import genai
import google.generativeai as genai

# Configure API key
genai.configure(api_key="API-key")  # Replace with your actual API key

# Upload the file
file_path = "ADD_PATH-toFile"
uploaded_file = genai.upload_file(path=file_path)

# Initialize the model
model = genai.GenerativeModel("gemini-2.0-flash-001")

# Generate a response based on the file content
response = model.generate_content(["Could you summarize this file?", uploaded_file])

# Print the response
print(response.text)
