const axios = require('axios');
const NodeCache = require( "node-cache" );
const weatherCache = new NodeCache();

class Forecast {
    constructor(valid_date, description){
        // date of weather
        this.valid_date = valid_date;
        // get weather description
        this.description = description;
    }
}

 exports.weather = async function (req, res) {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let a = {
        lat,
        lon
    };
 
    if(weatherCache.get(lon) != undefined){
        res.send(weatherCache.get(lon));
        console.log('data already enterd');
    }else{
        let weatherAPI= await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
        console.log(weatherAPI);
        let daysOfWeather =  weatherAPI.data.data.map((day) => {
            return new Forecast(day.valid_date, day.weather.description)
        });
        weatherCache.set(lon,daysOfWeather, 3600);
        if(!daysOfWeather){
            let err = Error("500 Server Error");
            err.status = 500;
            next(err);
        }
        res.send(daysOfWeather);
    }
};
