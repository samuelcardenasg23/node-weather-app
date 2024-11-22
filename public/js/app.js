let weatherApi = "/weather";

const weatherForm = document.querySelector(".weather-location");
const searchInput = document.querySelector(".input-field");
const weatherIcon = document.querySelector(".weather-icon i");
const weatherCondition = document.querySelector(".weather-condition");
const temperature = document.querySelector(".temperature");
const place = document.querySelector(".place");
const date = document.querySelector(".date");

const currentDate = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};

date.textContent = currentDate.toLocaleDateString("en-US", options);

if ("geolocation" in navigator) {
  place.textContent = "Loading...";
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address && data.address.city) {
            const city = data.address.city;
            showData(city);
          } else {
            place.textContent = "Location not found";
          }
        })
        .catch((error) => {
          console.log("Error fetching location data:", error);
          place.textContent = "Error fetching location data";
        });
    },
    function (error) {
      console.log("Error getting location:", error);
      place.textContent = "Error getting location";
    }
  );
} else {
  place.textContent = "Geolocation is not supported by your browser";
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(searchInput.value);
  place.textContent = "Loading...";
  weatherIcon.className = "";
  temperature.textContent = "";
  weatherCondition.textContent = "";

  showData(searchInput.value);
});

function showData(city) {
  getWeatherData(city, (data) => {
    if (data.cod == 200) {
      if (data.weather[0].description.includes("clear")) {
        weatherIcon.className = "wi wi-day-sunny";
      } else if (data.weather[0].description.includes("rain")) {
        weatherIcon.className = "wi wi-rain";
      } else {
        weatherIcon.className = "wi wi-day-cloudy";
      }
      place.textContent = data.name;
      temperature.textContent =
        Math.floor(data.main.temp - 273.5) + String.fromCharCode(176) + "C";
      weatherCondition.textContent = data.weather[0].description.toUpperCase();
    } else {
      place.textContent = "City not found";
    }
  });
}

function getWeatherData(city, callback) {
  const locationApi = weatherApi + "?address=" + city;
  fetch(locationApi)
    .then((response) => response.json())
    .then((data) => callback(data));
}

// Add this to toggle dark mode
document.documentElement.setAttribute("data-theme", "dark");

// Dark mode toggle functionality
const toggleSwitch = document.querySelector("#checkbox");
const currentTheme = localStorage.getItem("theme");

// Check if there's a theme stored in localStorage
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme);
