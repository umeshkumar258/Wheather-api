const cityInput = document.querySelector('#cityInput');

const searchBtn = document.querySelector('#searchBtn');

const cityName = document.querySelector('#cityName');

const temperature = document.querySelector('#temperature');

const description = document.querySelector('#description');

const humidity = document.querySelector('#humidity');

const windSpeed = document.querySelector('#windSpeed');

const API_PORT = '5000';



searchBtn.addEventListener('click', () => {

    const city = cityInput.value;

    getWeather(city);

});



function buildWeatherUrls(city) {

    const encodedCity = encodeURIComponent(city);
    const host = window.location.hostname || '127.0.0.1';
    const sameOriginUrl = `/weather/${encodedCity}`;
    const localApiUrl = `http://${host}:${API_PORT}/weather/${encodedCity}`;
    const localhostApiUrl = `http://localhost:${API_PORT}/weather/${encodedCity}`;

    return [...new Set([sameOriginUrl, localApiUrl, localhostApiUrl])];

}



async function fetchWeatherData(city) {

    const urls = buildWeatherUrls(city);
    let lastError = new Error('Unable to fetch weather data from backend.');

    for (const url of urls) {

        try {

            const response = await fetch(url);
            const contentType = response.headers.get('content-type') || '';

            if (!contentType.includes('application/json')) {
                lastError = new Error('Backend did not return JSON.');
                continue;
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `Weather request failed (${response.status}).`);
            }

            if (data && data.main && data.weather && data.wind) {
                return data;
            }

            throw new Error(data.message || 'Unexpected weather data received.');

        }

        catch (error) {

            lastError = error;
        }

    }

    throw lastError;

}



async function getWeather(city) {

    if (!city || !city.trim()) {
        description.innerText = 'Please enter a city name.';
        return;
    }

    try {

        const data = await fetchWeatherData(city.trim());



        console.log(data);



        cityName.innerText = data.name;

        temperature.innerText =
            `${data.main.temp}\u00b0C`;

        description.innerText =
            data.weather[0].description;

        humidity.innerText =
            `Humidity: ${data.main.humidity}%`;

        windSpeed.innerText =
            `Wind: ${data.wind.speed} m/s`;

    }

    catch (error) {

        console.log(error);

        description.innerText = error.message || `Could not load weather data. Check if backend is running on port ${API_PORT}.`;

    }

}
