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

function getTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function search(city) {
  let apiKey = "a592e749eb4eda83dffcd2b9176f3c7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
}

let showCity = document.querySelector("#city-form");

showCity.addEventListener("submit", submitCity);

function showPosition(position) {
  console.log(position);
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
