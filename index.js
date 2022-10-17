function formatDate() {
  let now = new Date();
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
  let date = now.getDate();
  let currentDay = `${day}, ${date}`;
  return currentDay;
}
function formatTime(timestemp) {
  let time = new Date(timestemp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
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
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="36"
                />
                <div class="wearhet-forecast-temperatures">
                  <span class="max-temp">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="min-temp"> ${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&cnt=7&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function search(city) {
  let apiKey = "7e5b57c35b922297644dec58a82f602c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showCityValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
function formatSun(timesun) {
  let timeRise = new Date(timesun);
  let hours = timeRise.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = timeRise.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humid");
  let speedElement = document.querySelector("#speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#time");
  let riseElement = document.querySelector("#rise");
  let setElement = document.querySelector("#set");
  let durationElement = document.querySelector("#duration");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate();
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  riseElement.innerHTML = formatSun(response.data.sys.sunrise * 1000);
  setElement.innerHTML = formatSun(response.data.sys.sunset * 1000);
  function showDuration() {
    let dur = response.data.sys.sunset - response.data.sys.sunrise;
    let sunDay = Math.trunc(dur / 3600);
    let minSunDur = Math.trunc((dur - 36000) / 60);
    return `${sunDay}:${minSunDur}`;
  }
  durationElement.innerHTML = showDuration();
  getForecast(response.data.coord);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCityValues);
search("Kyiv");
