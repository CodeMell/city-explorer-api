const express = require("express");
// Read in the weather from our "Database"
const data = require('./data/weather.json');

const app = express();

class Report {
    
}

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.get("/weather", (request, response) => {
    response.send("Yeet");
});


app.get("/about", (request, response) => {
    response.send("<h1>About</h1>");
});

app.listen(3001, () => {
    console.log("Listen on the port 3001...");
});