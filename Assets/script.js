const apiKey = "d4e9f0c9a253b69ab2eeb89bc3cfb9c7";

function findWeather(city) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = data.main.temp;
      document.getElementById('wind').textContent = data.wind.speed;
      document.getElementById('humidity').textContent = data.main.humidity;
    })
    .catch((err) => {
      console.error("Uh oh, no weather fetch!", err);
    });
}

document.getElementById("searchBtn").addEventListener("click", function () {
  const cityInput = document.getElementById("cityInput").value;
  findWeather(cityInput);
});