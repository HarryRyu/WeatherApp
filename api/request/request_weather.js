const request = require('request');

const api_key = 'cde75e1930647555965fd2f3e10b0f34' //API key for OpenWeatherMap. Update the key as needed
const url = 'http://api.openweathermap.org/data/2.5/weather'; //URL for the website

//request_weather: function for requesting current weather data of single city
//@search: a string with the name of the city
const request_weather = (search) => {
    return new Promise((resolve, reject) => {
        const url_final = url + '?q=' + search + '&appid=' + api_key + "&units=metric"; //Final url to send
        request({ url: url_final }, (error, response) => {
            if (error || JSON.parse(response.body).message) {
                return reject('Error has occured on request to openWeatherMap'); //Rejects if error occurs
            }
            resolve(JSON.parse(response.body)); //resolve promise
        })
    })
}

//request_average_weather: function that takes in array of cities and stores each GET response into another array
//@city_list: array of cities to search
const request_weather_data = async (city_list) => {

    var city_response = [];

    for (var i = 0; i < city_list.length; i++){
        var tmp_response = await request_weather(city_list[i]); 
        city_response.push(tmp_response);
        
    }

    return city_response;
}

module.exports = request_weather_data;