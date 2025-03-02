from WeatherApi import NOAAWeather
import json
import google.generativeai as genai

GEMINI_MODEL_TYPE = 'gemini-2.0-flash-001'

REVIEW_PROMPT = """
You have been given an image of some setting. If the setting does not look like a room or have 
any significant risks against natural disasters, please only responsd with @. Otherwise, please give at most a 3 sentence
summary of the room's risks against natural disasters. Please denote it with a * at the beginning
and end of it. Also, please list natural disaster risks associated with that room, 
and a suggestion for each risk. Please list a risk and its suggestion on its own line, 
denoted by a - at the beginning of the line. For each risk, please give a name for it,
and a description for it. Divide the name and description of each risk with $$ between them.
Please divide the risk and suggestion on each line with a | between them.
"""

REVIEW_WITH_WEATHER_PROMPT = """
You have been given an image of some setting. Here is a 7-day forecast of the weather for
that setting: {}. If the setting does not look like a room or does not have any significant risks
against any upcoming or general natural disasters, please only respond with @. Otherwise, please give at most a 3 sentence
summary of the room's risks against the upcoming weather, and general risks against
natural disasters. Please denote it with a * at the beginning and end of it. Also, 
please list risks from the room for the upcoming weather and general natural disasters,
and a suggestion for each risk. Please list a risk and its suggestion on its own line,
denoted by a - at the beginning of the line. For each risk, please give a name for it,
and a description for it. Please divide the name and description of each risk with $$
between them. Please divide the risk and suggestion on each line with a | between it.
"""

def create_model(api_key):
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(GEMINI_MODEL_TYPE)


def review_img(model, img_path):
    uploaded_file = genai.upload_file(img_path)
    response = model.generate_content([REVIEW_PROMPT, uploaded_file])
    return response.text


def review_img_with_weather(model, img_path, svn_day_frcst):
    uploaded_file = genai.upload_file(img_path)
    response = model.generate_content([
        REVIEW_WITH_WEATHER_PROMPT.replace('{}', svn_day_frcst), uploaded_file
    ])
    return response.text


if __name__ == '__main__':
    GEMINI_API_KEY = ''
    NOAA_API_KEY = ''

    weather_api = NOAAWeather(NOAA_API_KEY)

    DETROIT_LAT = 42.3527307
    DETROIT_LONG = -83.2639216
    detroit_fcst = json.dumps(weather_api.get_7_day_forecast(DETROIT_LAT, DETROIT_LONG))

    NEWARK_LAT = 39.6814513
    NEWARK_LONG = -75.7972885
    newark_fcst = json.dumps(weather_api.get_7_day_forecast(NEWARK_LAT, NEWARK_LONG))

    model = create_model(GEMINI_API_KEY)
    print(review_img(model, 'imagedata.jpg'), '\n')
    print(review_img_with_weather(model, 'skyrimroom.jpg', detroit_fcst), '\n')
    print(review_img_with_weather(model, 'walk-in-cooler.jpeg', detroit_fcst), '\n')
    print(review_img_with_weather(model, 'logcabin.jpg', newark_fcst))

"""
>>>>>>> 3ab3f5da5f32e70c1122f74bca5a3dd1e0b5087f
def send_forecast_to_gemini(forecast_json, api_key):
    \"""
    Sends the NOAA weather forecast to Gemini API with a specific prompt format.
    \"""
    # Configure Gemini API correctly
    genai.configure(api_key=api_key)

    # Format the prompt for supreme overlord gemini
    prompt = f\"""You have been given an image of some setting. 
    Here is a 7-day forecast of the weather for that setting: {forecast_json}. 
    Please give some suggestions on how to make the given setting safer for the upcoming weather, 
    as well as some general suggestions to make the setting generally safer. 
    Please list each suggestion on its own line with a - at the beginning of each line.\"""

    # Create the model and generate content
    model = genai.GenerativeModel("gemini-2.0-flash-001")
    response = model.generate_content(prompt)

    return response.text

# this shit runs the shit i guess :)
if __name__ == "__main__":
    api_key = "ADD-API-KEY"  # Replace with your actual API key

    with open("forecast_output.json", "r") as f:
        forecast_data = json.load(f)

    result = send_forecast_to_gemini(json.dumps(forecast_data, indent=4), api_key)
    print(result)
"""
