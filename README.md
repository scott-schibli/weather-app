# weather-app
Simple Weather Application that displays a 7 day forecast of the users current city or that of one searched!

# Project set-up
- take a look at package.json for dependencies
- run npm install
- dev must have gulp and gulp-sass

To start the application and run 'node app.js' run: 
- npm start 
- go to localhost:8888

-there is also a live hosted version at https://shrouded-island-15806.herokuapp.com/

# Stack:
- Express
- Typsescipt (note: must run 'tsc' after making changes to typescript files. 
- Sass/Scss
- Gulp to pipe to CSS
- Handlebars for templating

- Google geocode API
- 'ip-api.com' - ip look up api
- OpenWeatherMapAPI - weather API

# Dev: 
- run 'gulp sass' after making changes to scss files.
- run 'tsc' after making changes to .ts files.

# Notes: 

*I wrote all javascript related files in typescript (.ts) and then ran 'tsc' in terminal to compile into normal .js. Please looks at tyepscript files when reviewing code for readability etc and comments... *

*When the app is launced locally there is a reverse IP look up that retrieves the visitors current location. 
On the Heroku hosted server, the IP look up retrieves the location of the server... Ashburn, Virginia. This is happenning becuase the api call to ip-api.com is occuring on the server end.*

