from WeatherApi import NOAAWeather
import json
import google.generativeai as genai

GEMINI_MODEL_TYPE = 'gemini-2.0-flash-001'

REVIEW_PROMPT = """
Pretend you are a meteorologist.
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
Pretend you are a meteorologist.
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
    genai.delete_file(uploaded_file.name)
    return response.text

def review_img_with_weather(model, img_path, svn_day_frcst):
    uploaded_file = genai.upload_file(img_path)
    response = model.generate_content([
        REVIEW_WITH_WEATHER_PROMPT.replace('{}', svn_day_frcst), uploaded_file
    ])
    genai.delete_file(uploaded_file.name)
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

    model = create_model("AIzaSyDSagerzV8SibHHwkSKxYC1zRdxbhDOXJs")
    print(review_img(model, 'imagedata.jpg'), '\n')
    print(review_img_with_weather(model, 'skyrimroom.jpg', detroit_fcst), '\n')
    print(review_img_with_weather(model, 'walk-in-cooler.jpeg', detroit_fcst), '\n')
    print(review_img_with_weather(model, 'logcabin.jpg', newark_fcst))
