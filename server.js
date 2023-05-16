'use strict'

require('dotenv').config(); // enables process.env.
const express = require("express");
const cors = require('cors');
// read weather database
const data = require('./data/weather.json');

const app = express();

// middleware
app.use(cors());



class Forecast {
    constructor(valid_date, description){
        // date of weather
        this.valid_date = valid_date;
        // get weather description
        this.description = description;
    }
}

app.get("/", (req, res) => {
    res.send("Hi there");
});


// get lon, lat, and searchQuery from the form
app.get("/weather", (req, res) => {
    let searchQuery = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let a = {
        lat,
        lon,
        searchQuery
    };
    let cityData = data.find(e => {
        return(
            a.lat === e.lat &&
            a.lon === e.lon &&
            a.searchQuery === e.city_name
        )
    });
    if(cityData != undefined){
        console.log(cityData);
    }else{
        console.log("ERROR: data undefined");
    }
    let daysOfWeather =  cityData.data.map((day) => {
        return new Forecast(day.valid_date, day.weather.description)
    });
    if(!daysOfWeather){
        let err = Error("500 Server Error");
        err.status = 500;
        next(err);
    }
    res.send(daysOfWeather);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

// page url
app.listen(process.env.PORT, () => {
    console.log(`Listen on the port ${process.env.PORT}...`);
});