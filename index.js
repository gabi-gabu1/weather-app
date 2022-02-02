function addZero(zero) {
  if (zero < 10) {
    zero = "0" + zero;
  }
  return zero;
}
let now = new Date();
let time = document.querySelector("#current-time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

let hours = addZero(now.getHours());

let minutes = addZero(now.getMinutes());

time.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// forecast

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>

    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" 
    alt=""
    width="42"/>
    <div class="forecast-temperature">
      <span class="forecast-temperature-max"> ${Math.round(
        forecastDay.temp.max
      )}° </span>
      <span class="forecast-temperature-min"> ${Math.round(
        forecastDay.temp.min
      )}° </span>
  </div>
  </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

///

function getForecast(coordinates) {
  let apiKey = "a592e749eb4eda83dffcd2b9176f3c7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
  let cityTemperature = Math.round(response.data.main.temp);
  let celsius = document.querySelector("#temperature");
  celsius.innerHTML = cityTemperature;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].icon);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "a592e749eb4eda83dffcd2b9176f3c7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let apiKey = "a592e749eb4eda83dffcd2b9176f3c7f";
  let showCity = document.querySelector("#enter-city");
  let city = showCity.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

let city = document.querySelector("#city-form");

city.addEventListener("submit", submitCity);

//// geolocation

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a592e749eb4eda83dffcd2b9176f3c7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPosition = document.querySelector("#current-weather");

currentPosition.addEventListener("click", showCurrentPosition);

search("London");
