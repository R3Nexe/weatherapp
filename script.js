function getWeather() {
  const apikey = "0ae67cfb262df518786df01ea142cc7a";
  const city = document.getElementById("city").value;
  if (!city) {
    alert("please enter a valid city name");
    return;
  }
  const currentWeatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apikey;
  const forecastUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    apikey;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch(error=>{
        console.log('Error fetching current weather data:',error);
        alert('Error fetching current weather data. Please try again.');

    });
    fetch(forecastUrl)
    .then(response => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch(error=>{
        console.log('Error fetching hourly forcast data:',error);
        alert('Error fetching hourly forcast data. Please try again.');

    });
}
function displayWeather(data) {
  const tempdivInfo = document.getElementById("temp-div");
  const weatherInfoDiv = document.getElementById("weather-info");
  const weatherIcon = document.getElementById("weather-icon");
  const hourlyForecastDiv = document.getElementById("hourly-forecast");

  weatherInfoDiv.innerHTML = "";
  hourlyForecastDiv.innerHTML = "";
  tempdivInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@4x.png";

    const temperatureHtml = `<p>${temperature}&deg;C</p>`;

    const weatherHTML = `<p>${cityName}</p>
                          <p>${description}</p>`;

    tempdivInfo.innerHTML = temperatureHtml;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
  }
}
function displayHourlyForecast(hourlydata) {
    const hourlyForecastDiv = document.getElementById("hourly-forecast");
  
    if (!hourlydata || hourlydata.length === 0) {
      hourlyForecastDiv.innerHTML = `<p>No forecast data available.</p>`;
      return;
    }
  
    hourlyForecastDiv.innerHTML = "";
  
    const next24hours = hourlydata.slice(0, 8);
    next24hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15);
      const iconCode = item.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
      const hourlyItemhtml = `<div class="hourly-item">
                                  <span>${hour}:00</span>
                                  <img src="${iconUrl}" alt="Hourly weather icon">
                                  <span>${temperature}&deg;C</span>
                              </div>`;
      hourlyForecastDiv.innerHTML += hourlyItemhtml;
    });
  }
  
function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
    }