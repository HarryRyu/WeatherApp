# WeatherApp.Sample

RESTful API for SwiftPanda

Can call current weather data by city name. 

API call:

localhost:3000/weather?city={city name}

localhost:3000/weather?cities={city1 name, city2 name, city3 name, ...}

API response:

{

    "city_name": "Toronto",
    
    "unit": "Celsius",
    
    "forecast":
         {
             "day":  "Monday",
             "date": "July 11, 2020",
             "high": 32.5,
             "low":  20.1
         }
}

{
    "cities": ["Toronto", "Vancouver"],
    "date": "July 12, 2020",
    "unit": "Celsius",
    "average_high": 30,
    "average_low": 15
}
