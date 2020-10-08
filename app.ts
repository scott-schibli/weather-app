// 10.7.20
// app.ts - builds an app.js on build. 

// js files
import {ipLookUp} from './public/js/ip-geocode';
import {getWeatherData} from './public/js/weatherapi';
import {getLatLong} from './public/js/search-geocode';

// requirements
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');
let PORT = 8888;

// express set up
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded());
app.use(express.json());

app.set('view engine', 'handlebars');
app.engine('handlebars', hbs({extname: 'handlebars', defaultLayout: 'main'}));


app.get('/', (req, res) => {
  // app.get method that initiates the application
  // Calls ipLookUp to get users current latitude and longitude.
  // renders weather template with data

  ipLookUp()
  .then((resolve)=> {
    return getWeatherData(resolve)
  }).then((resolve) => {    
    render_template(res, "weather", resolve)
  }).catch((err)=>{
    let alternative_message = "Ip look up failed, please enter a zipcode, town, city, state.";
    render_template(res, "error", alternative_message);
  })
});


app.post('/get_weather_data', (req, res) => {
  // Called when user submits city name. 
  // getLatLong returns cities latitude and longitude to use as inputs to 
  // Call getWeatherData, calling OpenWeatherMapAPI for data.
  // re-render the page with template and data. 

  getLatLong(req.body.location)
  .then((resolve) => {
    return getWeatherData(resolve)
  }).then((resolve) => {
    render_template(res, 'weather', resolve)
  }).catch((err) => {
    render_template(res,'error', err);
  })
})

const render_template = (res, filename: string, data: any) => {
  // method for rendering handlebars templates
  res.render(filename, {
    data: data
  })
}
 
app.listen(process.env.PORT || 8888);
