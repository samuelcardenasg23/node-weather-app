require("dotenv").config();

const request = require("request");

const openWeatherMap = {
  BASE_URL: process.env.OPEN_WEATHER_BASE_URL,
  SECRET_KEY: process.env.OPEN_WEATHER_MAP_API_KEY,
};

const weatherData = (address, callback) => {
  const url = `${openWeatherMap.BASE_URL}${encodeURIComponent(address)}&appid=${
    openWeatherMap.SECRET_KEY
  }`;

  request({ url, json: true }, (error, data) => {
    if (error) {
      callback(true, "Unable to connect to weather service!" + error);
    }
    callback(false, data?.body);
  });
};

module.exports = weatherData;
