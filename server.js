const express = require("express");
const app = express();

app.get("/", (request, response) => {
    response.send("Hi there");
});

app.get("/about", (request, response) => {
    response.send("<h1>About</h1>");
});

app.listen(3000, () => {
    console.log("Listen on the port 3000...");
});