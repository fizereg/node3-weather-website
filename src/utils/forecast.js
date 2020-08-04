const request = require('request')

const forecast = (lon, lat, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=f5c1186e21417f98eccc9dd801361bfa&query='+ encodeURIComponent(lat) + ','+ encodeURIComponent(lon) + '&units=f'
    request({url, json: true}, (error, {body})=>{

        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
    
        }else{
            callback(undefined, {
                forecast1:`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out and it feels like ${body.current.temperature} degrees out`,
                humidity: body.current.humidity+'%'
            })
        }
    })
}



module.exports = forecast