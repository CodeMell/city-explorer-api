const axios = require('axios');

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
 
    let weatherAPI= await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
console.log(weatherAPI);
    let daysOfWeather =  weatherAPI.data.data.map((day) => {
        return new Forecast(day.valid_date, day.weather.description)
    });
    if(!daysOfWeather){
        let err = Error("500 Server Error");
        err.status = 500;
        next(err);
    }
    res.send(daysOfWeather);
};
