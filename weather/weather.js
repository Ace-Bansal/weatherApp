var request = require("request");

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/ff459c74b49f690820e7eded63e2dc85/${latitude},${longitude}?units=si`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback("Error");
    }
    else if(!error && response.statusCode == 200){
      callback(undefined, {
        temp: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      })
    }
  })
}

module.exports = {
  getWeather
}
