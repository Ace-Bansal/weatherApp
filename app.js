var yargs = require("yargs");
var geocode = require("./geocode/geocode.js")
var weather = require("./weather/weather.js")
var input = yargs
  .options({
    address: {
      alias: "a",
      demand: true,
      string: true,
      describe: "Address to fetch weather for"
    }
  })
  .help()
  .alias("help", "h")
  .argv

var address = input.address;

geocode.geocodeAddress(address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  } else{
    weather.getWeather(results.Latitude, results.Longitude, (errorMessage, weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      } else{
          console.log(results.Address);
          if(weatherResults.temp != weatherResults.apparentTemp){
            console.log(`The actual temperature is ${weatherResults.temp} but it feels like ${weatherResults.apparentTemp}!`);
          } else{
            console.log(`The temperature is ${weatherResults.temp}`);
          }
      }
    })
  }
});
