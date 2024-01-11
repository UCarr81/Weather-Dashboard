const apiKey = "d4e9f0c9a253b69ab2eeb89bc3cfb9c7";
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const defaultCity = 'Portland';

// Function to find weather based on city
//function findWeather(city) {
 // let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


function handleFormSubmit(event) {
  event.preventDefault();

  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;

  if (cityName != '') {
    getWeatherData(cityName);
    get5DayForecast(cityName);

    cityInput.value = '';
  }
}



function getWeatherData(cityName) {
  const apiURL = `${baseUrl}?q=${cityName}&appid=${apiKey}`;

  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data);
      get5DayForecast(cityName);
    })
    .catch(error => console.error('Weather got lost in the cloud somewhere IDK', error));
}

function get5DayForecast(cityName) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

  fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
      updateForecast(data);
    })
    .catch(error => console.error('forecast got lost in the cloud somewhere IDK', error));
}


function updateCurrentWeather(data) {
  const currentWeather = document.getElementById('currentWeather');
  const cityNameElement = document.getElementById('cityName');
  const temperatureElement = document.getElementById('temperature');
  const windElement = document.getElementById('wind');
  const humidityElement = document.getElementById('humidity');
  const weatherIconElement = document.getElementById('weatherIcon');

  const city = data.name;
  const temperatureKelvin = data.main.temp;
  const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const weatherIconCode = data.weather[0].icon;

  const currentDate = moment().format('MM/DD/YYYY');

  weatherIconElement.src = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

  cityNameElement.textContent = `Current Weather in ${city} (${currentDate})`;
  temperatureElement.textContent = `Temperature: ${temperatureFahrenheit.toFixed(2)} °F`;
  windElement.textContent = `Wind: ${windSpeed} MPH`;
  humidityElement.textContent = `Humidity: ${humidity}%`;

  currentWeather.style.display = 'block';
}
function updateForecast(data) {
  const forecastContainer = document.getElementById('forecastContainer');

  forecastContainer.innerHTML = '';

  for (let i = 0; i < 40; i+= 8) {
    const forecast = data.list[i];
    const date = moment(forecast.dt_txt).add(1, 'days').format('MM/DD/YYYY');
    const temperatureKelvin = forecast.main.temp;
    const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
    const windSpeed = forecast.wind.speed;
    const humidity = forecast.main.humidity;
    const weatherIconCode = forecast.weather[0].icon;
    

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${date}</h5>
                <img src="http://openweathermap.org/img/w/${weatherIconCode}.png" alt="Weather Icon">
                <p class="card-text">Temperature: ${temperatureFahrenheit.toFixed(2)} °F</p>
                <p class="card-text">Wind: ${windSpeed} MPH</p>
                <p class="card-text">Humidity: ${humidity}%</p>
            </div>
        `;

        forecastContainer.appendChild(card);
  }
}

document.getElementById('search-form').addEventListener('submit', handleFormSubmit);

document.addEventListener('DOMContentLoaded', function () {
  getWeatherData(defaultCity);
});