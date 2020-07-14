const express = require('express');
const app = express();

//Route address for weather endpoint
const weatherRoutes = require('./api/routes/weather');
app.use('/weather', weatherRoutes); 

module.exports = app;

