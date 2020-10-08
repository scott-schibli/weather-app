
const axios = require('axios');
import {LocationData, DaysWeather} from '../interfaces';


const dayOfTheWeekMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Teusday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
}

const kelvinConverter = (k: number) => {
    return Math.round(((k-273.15)*1.8)+32);
}

export const getWeatherData = (location_data:LocationData) => {
    // Takes in location data from geocoding: address, lat, long
    // calls OpenWeatherMapsAPI with information and API key. 
    // return promise with data. 

    let today = new Date().getDay()

    return new Promise<Array<DaysWeather>> ((resolve, reject)=>{
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${location_data.lat}&lon=${location_data.lng}&exclude=hourly,current,minutely,alerts&appid=91c8fe29e5cedaa6b2f3bdd40ca10ce5`)
        .then((res) => {          
            if (res.status >= 200 && res.status < 300){
                let new_weather_data: Array<DaysWeather> = []                
                res.data.daily.forEach(day => {
                    let data = {
                        address: location_data.address,
                        day: dayOfTheWeekMap[today],
                        temp: kelvinConverter(day.temp.day),
                        description: day.weather[0].description,
                        icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                    }
                    new_weather_data.push(data)
                    if (today < 6){today++}
                    else{today=0}
                });
                resolve(new_weather_data!)
            } else {
                reject("Error with the formating data")
            }
        }).catch((err) => {
            console.log(err);
            reject("Error pulling data from OpenWeatherMapAPI")
        })
    })
}
