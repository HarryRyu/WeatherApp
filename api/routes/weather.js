const express = require('express');
const dateFormat =require('dateformat')
const request_weather_data = require('../request/request_weather.js')

const router = express.Router();

//The weather endpoint has two different types of queries: ?city and ?cities.
/* 
city=Toronto: 
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
cities=Toronto, Vancouver:
{
    "cities": ["Toronto", "Vancouver"],
    "date": "July 12, 2020",
    "unit": "Celsius",
    "average_high": 30,
    "average_low": 15
}
*/

router.get('/', (req, res) => {
    //Error message if city names have not been inputted
    if (!req.query.city && !req.query.cities) {
        res.status(400).send({
            error: 'You must provide a city name!'
        })
    }
    //Runs if the query is "?city="
    else if (req.query.city){
        const city_list = [req.query.city];
        //Requests data
        request_weather_data(city_list).then((response) => {
            res.status(200).send({
                city_name: response[0].name,
                unit: 'Celsius',
                forcast: {
                    day: dateFormat(new Date(response[0].dt * 1000), "dddd"),
                    date: dateFormat(new Date(response[0].dt * 1000), "mmmm dS, yyyy"),
                    high: response[0].main.temp_max,
                    low: response[0].main.temp_min
                }
            })
        }).catch((e) => {
            res.status(404).send({
                error: error
            })
        }) 
    }
    //Runs if the query is "?cities="
    else if (req.query.cities){
        const city_list = req.query.cities.split(","); //Splits the cities and store the values in an array
        request_weather_data(city_list).then((city_response) => {
            res.status(200).send({
                cities: city_list,
                date: dateFormat(new Date(city_response[0].dt * 1000), "mmmm dS, yyyy"),
                unit: "Celsius",
                average_high: average_high(city_response),
                average_low: average_low(city_response)
            })
        }).catch((error) => {
            res.status(404).send({
                error: error
            })
        }); 
    }
});

//Calculates average maximum temp of cities
function average_high(city_response){
    var average = 0;
    for (var i = 0; i < city_response.length; i++){
        average += city_response[i].main.temp_max;
    }
    average = average / city_response.length;
    return average;
}
//Calculates average minimum temp of cities
function average_low(city_response){
    var average = 0;
    for (var i = 0; i < city_response.length; i++){
        average += city_response[i].main.temp_min;
    }
    average = average / city_response.length;
    return average;
}

module.exports = router;