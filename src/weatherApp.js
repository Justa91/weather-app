function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuseday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let temperature = document.querySelector("h2");
  let currentTemperature = Math.round(response.data.temperature.current);
  temperature.innerHTML = currentTemperature;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.temperature.humidity;
  humidity.innerHTML = currentHumidity;
  let wind = document.querySelector("#wind");
  let currentWind = Math.round(response.data.wind.speed);
  wind.innerHTML = currentWind;
  let description = document.querySelector("#description");
  let currentDescription = response.data.condition.description;
  description.innerHTML = currentDescription;
  let iconWeather = document.querySelector("#icon-weather");
  let currentIconWeather = response.data.condition.icon_url;
  iconWeather.setAttribute("src", currentIconWeather);
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);
  let city = document.querySelector("h1");
  let currentCity = response.data.city;
  city.innerHTML = currentCity;
  celsiusTemperature = currentTemperature;
}

function search(city) {
  let apiKey = "1t46b45ad73356d1fdb57b7o025ca415";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  search(searchInput.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = celsiusTemperature;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheitTemperature);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsiusTemperature);
let celsiusTemperature = null;
