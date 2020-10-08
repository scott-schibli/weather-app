const axios = require('axios');
import {LocationData} from '../interfaces';


export const getLatLong = (city_name: string) => {
    // Takes in a city name, 
    // calls googles geocoding api
    // returns promise with LocationData interface

    return new Promise<LocationData> ((resolve, reject)=>{
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,{
            params: {
                address: city_name,
            key: 'AIzaSyDAjfBhY42yp2qlnou2Sdfq81s7PW8fjV8'
            }
        })
        .then((res) => {                    
            if (res.data.status === 'ZERO_RESULTS'){
                reject("Location entered incorrectly")
            } else if (res.data.status !== "OK") {
                reject("Error w/ request, invalid address, daily limits, or unknown error")
            } 
            let coordinates = {
                address: res.data.results[0].formatted_address,
                lat: res.data.results[0].geometry.location.lat,
                lng: res.data.results[0].geometry.location.lng
            }
            resolve(coordinates );
        }).catch((err) => {
            reject(err);
        })
    })
    
}