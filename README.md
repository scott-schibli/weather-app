# weather-app
Simple Weather Application that displays a 7 day forecast of the users current city or that of one searched!

# Project set-up
- take a look at package.json for dependencies
- must have npm, node, typescript (and several more), axios, express, body-parser
- dev must have gulp and gulp-sass

To start the application and run 'node app.js' run: 
- npm start 
- go to localhost:8888

-there is also a live hosted version at https://shrouded-island-15806.herokuapp.com/

# Notes: 
When the app is launced locally there is a reverse IP look up that retrieves the visitors current location. 
On the Heroku hosted server, the IP look up retrieves the location of the server... Ashburn, Virginia. This is happenning becuase the api call to ip-api.com is occuring on the server end. 


