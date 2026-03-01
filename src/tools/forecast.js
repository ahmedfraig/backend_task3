const request = require('request')
const weatherKey = process.env.Weather_Key

const forecast = (latitude,longitude,callback) => {

const url = `http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${latitude},${longitude}&aqi=no`;

request({ url, json: true }, (error, response) => {
  if (error) {
    callback('Unable to connect to weather service!',undefined)
  }else if(response.body.error){
    callback(response.body.error.message,undefined)
  }
   else {
    callback(undefined,{location:response.body.location.name,weatherStateIcon:response.body.current.condition.icon,temperature:response.body.current.temp_c,longitude: response.body.location.lon,latitude:response.body.location.lat})
  }
});}
module.exports= forecast