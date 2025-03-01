import requests
import json
from datetime import datetime

class NOAAWeather:
    def __init__(self, token):
        self.token = token
        self.base_url = "https://api.weather.gov"

    def get_forecast_grid_data(self, latitude, longitude):
        """
        Retrieve the forecast grid data for a given latitude and longitude.
        """
        headers = {
            "User-Agent": "MyWeatherApp/1.0",
            "Accept": "application/geo+json"
        }

        points_url = f"{self.base_url}/points/{latitude},{longitude}"
        response = requests.get(points_url, headers=headers)
        response.raise_for_status()
        
        grid_data = response.json()
        forecast_url = grid_data['properties']['forecastGridData']

        forecast_response = requests.get(forecast_url, headers=headers)
        forecast_response.raise_for_status()

        return forecast_response.json()

    def get_7_day_forecast(self, latitude, longitude):
        """
        Retrieve the upcoming 7-day weather forecast for a given latitude and longitude.
        """
        forecast_data = self.get_forecast_grid_data(latitude, longitude)
        properties = forecast_data.get('properties', {})

        forecast = {
            "temperature": self._extract_values(properties.get('temperature', {}).get('values', []), "°F"),
            "dewpoint": self._extract_values(properties.get('dewpoint', {}).get('values', []), "°F"),
            "max_temperature": self._extract_values(properties.get('maxTemperature', {}).get('values', []), "°F"),
            "min_temperature": self._extract_values(properties.get('minTemperature', {}).get('values', []), "°F"),
            "relative_humidity": self._extract_values(properties.get('relativeHumidity', {}).get('values', []), "%"),
            "wind_speed": self._extract_values(properties.get('windSpeed', {}).get('values', []), "mph"),
            "probability_of_precipitation": self._extract_values(properties.get('probabilityOfPrecipitation', {}).get('values', []), "%"),
        }

        num_days = min(len(forecast[key]) for key in forecast if forecast[key])

        formatted_forecast = []
        for i in range(num_days):
            max_temp_value = forecast['max_temperature'][i]['value']
            min_temp_value = forecast['min_temperature'][i]['value']
            avg_temp = None

            if max_temp_value and min_temp_value:
                max_temp = float(max_temp_value.split()[0])
                min_temp = float(min_temp_value.split()[0])
                avg_temp = f"{(max_temp + min_temp) / 2:.1f} °F"

            formatted_forecast.append({
                "label": "Current Day" if i == 0 else f"Day {i+1}",
                "temperature": forecast['temperature'][i]['value'],
                "dewpoint": forecast['dewpoint'][i]['value'],
                "max_temperature": max_temp_value,
                "min_temperature": min_temp_value,
                "average_temperature": avg_temp,
                "relative_humidity": forecast['relative_humidity'][i]['value'],
                "wind_speed": forecast['wind_speed'][i]['value'],
                "probability_of_precipitation": forecast['probability_of_precipitation'][i]['value'],
            })

        with open("forecast_output.json", "w") as json_file:
            json.dump(formatted_forecast, json_file, indent=4)

        return formatted_forecast

    def _extract_values(self, values, unit):
        """
        Helper function to extract values and add units, ensuring the input is valid.
        """
        extracted = []
        for value in values:
            if isinstance(value, dict) and 'validTime' in value and 'value' in value:
                extracted.append({
                    "validTime": value['validTime'].split("T")[0],
                    "value": f"{value['value']} {unit}" if value['value'] is not None else None
                })
        return extracted

if __name__ == "__main__":
    with open("API/NOAA.env", "r") as f:
        token = f.readline().strip()
    
    latitude = 39.7456
    longitude = -97.0892
    weather = NOAAWeather(token)

    forecast = weather.get_7_day_forecast(latitude, longitude)
    print(json.dumps(forecast, indent=4))
