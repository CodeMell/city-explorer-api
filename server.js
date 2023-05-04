const express = require("express");
const app = express();
// Read in the weather from our "Database"
const data = require('./data/weather.json');

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.get("/weather", (request, response) => {
    response.send("Hi there");
});


app.get("/about", (request, response) => {
    response.send("<h1>About</h1>");
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});