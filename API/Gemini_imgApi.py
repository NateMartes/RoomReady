import requests
import base64

def encode_image(image_path):
    """Encodes an image to Base64 format."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def send_image_to_gemini(image_path, api_key):
    """Sends an image to the Gemini API and returns the response."""
    url = "https://api.gemini.com/v1/image/analyze"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    image_data = encode_image(image_path)
    payload = {
        "image": image_data,
        "features": ["LABEL_DETECTION"]  # Adjust features based on the API capabilities
    }
    
    response = requests.post(url, json=payload, headers=headers)
    response.raise_for_status()
    
    return response.json()

# Example usage
if __name__ == "__main__":
    with open("API/Gemini.env", "r") as plzWork:
        API_KEY = plzWork.readline().strip()  # Ensure API key is read properly
    
    IMAGE_PATH = "C:\\Users\\auxk0\\OneDrive\\Desktop\\hi.png"  # Replace with the image file path
    
    try:
        result = send_image_to_gemini(IMAGE_PATH, API_KEY)
        print(result)
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
