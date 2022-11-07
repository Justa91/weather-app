//display actual time and date
let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuseday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
if (hour < 10) {
  hour = `0${hour}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[now.getDay()];

let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = `${day} ${hour}:${minutes}`;

//search for city with current temperature
function changeCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let units = "metric";
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let name = response.data.name;
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  let humidity = document.querySelector(".humidity");
  let humidityInfo = response.data.main.humidity;
  let wind = document.querySelector(".wind");
  let windSpeed = Math.round(response.data.wind.speed);
  let clouds = document.querySelector(".clouds");
  let cloudsInfo = response.data.weather[0].description;
  clouds.innerHTML = cloudsInfo;
  wind.innerHTML = `${windSpeed} km/h`;
  humidity.innerHTML = ` ${humidityInfo}%`;
  h2.innerHTML = `${temperature}℃`;
  h1.innerHTML = name;
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey1 = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey1}&units=${units}`;
  axios.get(apiUrl1).then(showTemperature);
}

function geolocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", geolocation);
