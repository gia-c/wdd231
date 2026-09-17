// Fetches current weather and a 3-day forecast for Lima, Peru
// from the OpenWeatherMap API.


const apiKey = "9c72ec80c5d46bf1bca79e9063d9a542";
const lat = -12.0464;
const lon = -77.0428;

// ---------- Current weather ----------

async function getCurrentWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    document.querySelector("#current-weather").innerHTML =
      "<p>Current weather is unavailable right now.</p>";
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.querySelector("#current-weather").innerHTML = `
    <div class="current-weather-info">
      <img src="${iconUrl}" alt="${description}" class="weather-icon">
      <div>
        <p class="current-temp">${temp}&deg;C</p>
        <p class="current-desc">${description}</p>
      </div>
    </div>
  `;
}

// ---------- 3-day forecast ----------

async function getForecast() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    document.querySelector("#forecast").innerHTML =
      "<p>Forecast is unavailable right now.</p>";
  }
}

function displayForecast(data) {
  // The free "forecast" endpoint returns data in 3-hour steps
  // (8 entries per day). Index 7, 15, 23 land closest to
  // +24h, +48h, and +72h from now.
  const dayIndexes = [7, 15, 23];

  let html = "";
  dayIndexes.forEach((index) => {
    const entry = data.list[index];
    if (!entry) return;

    const date = new Date(entry.dt * 1000);
    const label = date.toLocaleDateString("en-US", { weekday: "long" });
    const temp = Math.round(entry.main.temp);

    html += `
      <div class="forecast-day">
        <p class="forecast-label">${label}</p>
        <p class="forecast-temp">${temp}&deg;C</p>
      </div>
    `;
  });

  document.querySelector("#forecast").innerHTML = html;
}

getCurrentWeather();
getForecast();
