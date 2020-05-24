const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const uri = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=a2b77e1644d32de9ed656fed6fbb286a"

    request({uri, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to access weather services!', undefined)
        }else if(body.cod[0] === '4'){
            callback('Unable to parse geocode coordinates!', undefined)
        }else{
            const data = body
            callback(undefined, data.weather[0].main + ". It is " + data.main.temp + " degrees out!")
        }
    })
}

module.exports = forecast