const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const apiKey = 'e15b5d4e2122f88d61de43e6945e56db';


const fetchData = async(city) => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(weatherUrl);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log('Error fetching the weather data: ', e);
        return null;
    }
}

// lat, los => breitengrad, längengrad (Geografische Koordinaten)
const fetchForecast = async(lat, lon) => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(forecastUrl);
        const data = await res.json();
        
        console.log(data);
    } catch (e) {
        console.log('Error fetching the forecast data: ', e);
        return null;
    }
}
fetchForecast();


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
        <div class="container">
        <h2>${cityName}, ${country}</h2>
    
        <div class="icon-container">
        <span id="temp">${temperature}°C</span>
        <p class="font-size-down">Feels like: <span>${feelsLike}°C</span></p><br>
        <img id="icon" src="${icon}" alt="Weather icon"><br>
        <span id="descr">${description}</span><br>
        <p class="font-size-down">Wind speed: <span>${windSpeed}</span> m/s, deg: <span>${windDeg}</span>°, gust: <span>${windGust}</span>km/h</p>
        <p class="font-size-down">Sunrise: <span>${sunrise} | Sunset: <span>${sunset}</span></p>
        <p class="font-size-down">Clouds Overall: <span>${cloudsOverall}</span>%  | visibility: <span>${visibility}</span> meters</p>
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