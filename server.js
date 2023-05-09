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
    constructor(datetime, description){
        this.date = datetime;
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
    res.send(a);
});
//localhost:3001/weather?lat=...&lon=...&searchQuery=...

// page url
app.listen(process.env.PORT, () => {
    console.log(`Listen on the port ${process.env.PORT}...`);
});