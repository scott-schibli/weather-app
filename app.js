"use strict";
// 10.7.20
// app.ts - builds an app.js on build. 
Object.defineProperty(exports, "__esModule", { value: true });
// js files
var ip_geocode_1 = require("./public/js/ip-geocode");
var weatherapi_1 = require("./public/js/weatherapi");
var search_geocode_1 = require("./public/js/search-geocode");
// requirements
var express = require('express');
var path = require('path');
var app = express();
var hbs = require('express-handlebars');
var PORT = 8888;
// express set up
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({ extname: 'handlebars', defaultLayout: 'main' }));
app.get('/', function (req, res) {
    // app.get method that initiates the application
    // Calls ipLookUp to get users current latitude and longitude.
    // renders weather template with data
    ip_geocode_1.ipLookUp()
        .then(function (resolve) {
        return weatherapi_1.getWeatherData(resolve);
    }).then(function (resolve) {
        render_template(res, "weather", resolve);
    }).catch(function (err) {
        var alternative_message = "Ip look up failed, please enter a zipcode, town, city, state.";
        render_template(res, "error", alternative_message);
    });
});
app.post('/get_weather_data', function (req, res) {
    // Called when user submits city name. 
    // getLatLong returns cities latitude and longitude to use as inputs to 
    // Call getWeatherData, calling OpenWeatherMapAPI for data.
    // re-render the page with template and data. 
    search_geocode_1.getLatLong(req.body.location)
        .then(function (resolve) {
        return weatherapi_1.getWeatherData(resolve);
    }).then(function (resolve) {
        render_template(res, 'weather', resolve);
    }).catch(function (err) {
        render_template(res, 'error', err);
    });
});
var render_template = function (res, filename, data) {
    // method for rendering handlebars templates
    res.render(filename, {
        data: data
    });
};
app.listen(process.env.PORT || 8888);
