const express = require("express");
const hbs = require("hbs");
const request = require("request");

const app = express();

const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("You must provide an address!");
  }

  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send(error);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
