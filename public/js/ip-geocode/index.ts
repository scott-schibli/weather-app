import {LocationData} from '../interfaces';
const axios = require('axios');

export const ipLookUp = () => {
    // returns current ip address data if a successful request,
    // returns address (city name) , lat and long
    // otherwise returns error. 
    return new Promise<LocationData> ( (resolve, reject) => {
        axios.get('http://ip-api.com/json/')
        .then((res) => {
            if (res.data.status !== 'success') {
                reject("Error doing reverse ip loop up")
            } else {
                let data = {
                    address: res.data.city,
                    lat: res.data.lat,
                    lng: res.data.lon
                }
                resolve(data)
            }
        }).catch((err)=> {
            reject(err)
        })
    })
}
