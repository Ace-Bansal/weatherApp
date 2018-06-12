var request = require("request");

geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
     if(error){
       callback("Can't connect to the server");
     } else if(body.status == "ZERO_RESULTS"){
     callback("Can't find address");
   } else if(!error && response.statusCode == 200 && body.status == "OK"){
     callback(undefined, {
       Address: body.results[0].formatted_address,
       Latitude: body.results[0].geometry.location.lat,
       Longitude: body.results[0].geometry.location.lng
     })
    }
  })
}

module.exports.geocodeAddress = geocodeAddress;
