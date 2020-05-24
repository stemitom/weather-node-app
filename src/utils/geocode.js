const request = require('request')

const geocode = (address, callback) => {

    const uri = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3RlbWl0b20iLCJhIjoiY2thM29hc3phMDB2bjNocGI5Nm53ZnV4eiJ9.iOu2AjL9Sd1YOIrObE781g&limit=1"
    
    request({uri, json:true}, (error,  {body} = {} ) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode

