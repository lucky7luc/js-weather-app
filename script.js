const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const apiKey = 'e15b5d4e2122f88d61de43e6945e56db';
let city = 'Berlin';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

const fetchData = async(city) => {
    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log('Error fetching the weather data: ', e);
        return null;
    }
}


const searchCity = async() => {
    const city = searchInput.value;
    const data = await fetchData(city);

    if (!data || data.cod === '404') {
        alert("City not found, please try again.");
    } else {
        let cityName = data.name;
        let country = data.sys.country;
        let temperature = data.main.temp;
        let feelsLike = data.main.feels_like;
        let icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        let description = data.weather[0].description;
        let windSpeed = data.wind.speed;
        let windDeg = data.wind.deg;
        let windGust = data.wind.gust;
        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        let cloudsOverall = data.clouds.all;
        let visibility = data.visibility;

        document.getElementById('weather-output').innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <div class="container">
        <div class="icon-container">
        <span>Temperature: ${temperature}°C</span>
        <span>Feels like: ${feelsLike}°C</span>
        <img src="${icon}" alt="Weather icon">
        <span>${description}</span>
        <span>Wind speed: ${windSpeed} m/s, deg: ${windDeg}°, gust: ${windGust}km/h</span>
        <span>Sunrise: ${sunrise} | Sunset: ${sunset}</span>
        <span>Clouds Overall: ${cloudsOverall}%  | visibility: ${visibility} meters</span>
        </div>
        
        </div>
        `;
    }
}


const checkUserInput = () => {
    if(!searchInput.value) {
        alert('Please Enter a city name!');
    } else {
        searchCity();
    }
}

searchBtn.addEventListener('click', checkUserInput);
searchInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter" || e.key === "Return"){
        checkUserInput();
    }
});