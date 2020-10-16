const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "713a92966cc2f06f7cddb92fc0934c05";
  const units = "metric";
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(URL, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather condition is " + weatherDescription + ".</p>");
      res.write("<h1>The temperature in " + query +  " is " + temp + " degrees Celcius.</h1>");
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});

app.listen(3000, () => console.log("Server started on port 3000."));