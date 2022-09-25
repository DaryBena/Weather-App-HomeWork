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
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate();
let now = new Date();
let h3 = document.querySelector("h3");
h3.innerHTML = `${now.getHours()} : ${now.getUTCMinutes()}`;
function showCityValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  let city = cityInput.value;
  let apiKey = "7e5b57c35b922297644dec58a82f602c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  function showTemperature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#temp");
    temp.innerHTML = temperature;
    let humid = document.querySelector("#humid");
    humid.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#windValue");
    wind.innerHTML = response.data.wind.speed;
  }
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", showCityValues);
