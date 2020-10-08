"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipLookUp = void 0;
var axios = require('axios');
exports.ipLookUp = function () {
    // returns current ip address data if a successful request,
    // returns address (city name) , lat and long
    // otherwise returns error. 
    return new Promise(function (resolve, reject) {
        axios.get('http://ip-api.com/json/')
            .then(function (res) {
            if (res.data.status !== 'success') {
                reject("Error doing reverse ip loop up");
            }
            else {
                var data = {
                    address: res.data.city,
                    lat: res.data.lat,
                    lng: res.data.lon
                };
                resolve(data);
            }
        }).catch(function (err) {
            reject(err);
        });
    });
};
