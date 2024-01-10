const apiKey = "d4e9f0c9a253b69ab2eeb89bc3cfb9c7";
const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';

// Function to find weather based on city
//function findWeather(city) {
 // let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


function handleFormsubmit(event) {
  event.preventDefault();

  const cityInput = document.getElementById("cityInput");
  const cityName = documnet.getElementById("cityName:");

  if (cityName != '') {
    getWeatherData(cityName);

    cityInput.value = '';
  }
}



function getWeatherData(cityName) {
  const apiURl = `${baseUrl}?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      updateCurrentWeather(data);
      updateForecast(data);
    })
    .catch(error => console.error('Data got lost in the mail somewhere IDK', error));
}


function updateCurrentWeather(data) {
  const currentWeather = document.getElementById('currentWeather');
  const cityNameElement = document.getElementById('cityName');
  const temperatureElement = document.getElementById('temperature');
  const windElement = document.getElementById('wind');
  const humidityElement = document.getElementById('humidity');


  const city = data.city.name;
  const temperature = data.list[0].main.temp;
  const windSpeed = data.list[0].wind.speed;
  const humidity = data.list[0].main.humidity;

  currentWeather.style.display = 'block';
}