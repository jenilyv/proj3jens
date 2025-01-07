from flask import Flask, render_template, request
from flask import jsonify
import time
import pandas as pd
from geopy.geocoders import Nominatim

#Read CSV file to create list of cities
csv_file = "Resources/Sales_tech_2023_newcopy.csv"
df = pd.read_csv(csv_file)

cities = df["City"].dropna()

#Convert cities to latitude and longitude array
geolocator = Nominatim(user_agent="city_heatmap", timeout=10)

city_coords = []

for city in cities:
    location = geolocator.geocode(city)
    if location:
        city_coords.append((location.latitude, location.longitude, 1))
    time.sleep(1)
print(city_coords)

app = Flask(__name__)

@app.route("/")
def index():
    return print("It worked")

@app.route("/latlong")
def latlong():
    response = jsonify(city_coords)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)



