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
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatForcastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".weather-forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      ${formatForcastDay(forecastDay.time)}
      <br />
      <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        width="36"
      />
      <br />
      <span class="weather-forecast-temperature-max">${Math.round(
        forecastDay.temperature.maximum
      )}°</span>
      <span class="weather-forecast-temperature-min">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "1t46b45ad73356d1fdb57b7o025ca415";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
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

  getForecast(response.data.city);
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);
let celsiusTemperature = null;
search("Warsaw");
