"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatLong = void 0;
var axios = require('axios');
exports.getLatLong = function (city_name) {
    // Takes in a city name, 
    // calls googles geocoding api
    // returns promise with LocationData interface
    return new Promise(function (resolve, reject) {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: city_name,
                key: 'AIzaSyDAjfBhY42yp2qlnou2Sdfq81s7PW8fjV8'
            }
        })
            .then(function (res) {
            if (res.data.status === 'ZERO_RESULTS') {
                reject("Location entered incorrectly");
            }
            else if (res.data.status !== "OK") {
                reject("Error w/ request, invalid address, daily limits, or unknown error");
            }
            var coordinates = {
                address: res.data.results[0].formatted_address,
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng
            };
            resolve(coordinates);
        }).catch(function (err) {
            reject(err);
        });
    });
};
