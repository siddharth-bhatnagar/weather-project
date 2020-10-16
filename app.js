const express = require('express');
const https = require('https');
const app = express();

app.get("/", (req, res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Agra&appid=713a92966cc2f06f7cddb92fc0934c05&units=metric";
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            
        });
    });

    res.send("server is running");
});












app.listen(3000, function() {
    console.log("Server started on port 3000.");
});
