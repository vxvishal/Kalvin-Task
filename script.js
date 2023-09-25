const form = document.getElementById('weather-form');
const locationBtn = document.getElementById('location-btn');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

locationBtn.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
    });
});

async function getWeather(city) {
    const apiKey = 'a8a87ad6ba72503a0e9c3c6832e40da2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
}

async function getWeatherByCoords(latitude, longitude) {
    const apiKey = 'a8a87ad6ba72503a0e9c3c6832e40da2';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp, feels_like, humidity } = main;
    const { description, icon } = weather[0];
    const html = `
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
                    <p>Temperature: ${temp}&deg;C</p>
                    <p>Feels like: ${feels_like}&deg;C</p>
                    <p>Humidity: ${humidity}%</p>
                `;
    weatherInfo.innerHTML = html;
}