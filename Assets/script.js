const apiKey = "d4e9f0c9a253b69ab2eeb89bc3cfb9c7";
const searchForm = document.getElementById("search-form");

// Function to find weather based on city
function findWeather(city) {
  let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((data) => {
      // Update the current weather display
      updateCurrentWeather(data);

      // Save the city to local storage
      saveToLocalStorage(city);
    })
    .catch((err) => {
      console.error("Uh oh, no weather fetch!", err);
    });
}

// Function to update the current weather display
function updateCurrentWeather(data) {
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('temperature').textContent = data.main.temp;
  document.getElementById('wind').textContent = data.wind.speed;
  document.getElementById('humidity').textContent = data.main.humidity;
}

// Function to save city to local storage
function saveToLocalStorage(city) {
  // Check if the city already exists in the local storage
  var cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(city)) {
    // Add the city to the array and save it back to local storage
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    // Call a function to update the list of default city buttons
    updateDefaultCityButtons();
  }
}

// Event listener for the form submission
document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior
  const cityInput = document.getElementById("cityInput").value;
  findWeather(cityInput);
});

