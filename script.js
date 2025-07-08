// Basic DOM elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');

// Add event listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', function (e) {
    if (e === 'Enter') {
        searchWeather();
    }
});

// Search function (placeholder)
function searchWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        // showError('Please enter a city name');
        // error.innerText = "error";
        error.style.display = "block"
        return;
    }

    showLoading();


    async function fetchWeatherData(cityy) {
        const apiKey = '4b3d3f9a38924abfae464050250807';

        try {
            // Wait for 1 second
            await new Promise((resolve) => {
                setTimeout(resolve)
            }, 1000);

            // Fetch weather data
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityy}`);
            const data = await response.json();
            console.log(data)

            // Show weather data
            showWeatherData({
                city: data.location.name,
                temperature: data.current.heatindex_c,
                description: data.current.condition.text,
                feelsLike: data.current.feelslike_c,
                humidity: data.current.humidity,
                windSpeed: data.current.wind_mph,
                visibility: data.current.vis_miles,
                uvIndex: data.current.uv,
                region: data.location.region,

            });
            console.log()

        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    }

    // Call the function
    fetchWeatherData(city);

}

/* setTimeout(() => {
       // This is where you'll add your weather API call
       // For now, just show sample data


       const apiKey = '4b3d3f9a38924abfae464050250807';

       fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
           .then(response => response.json())
           .then(data => {
               showWeatherData({
                   city: data.location.name,
                   temperature: data.current.heatindex_c,
                   description: data.current.condition.text,
                   feelsLike: data.current.feelslike_c,
                   humidity: data.current.humidity,
                   windSpeed: data.current.wind_mph,
                   visibility: data.current.vis_miles,
                   uvIndex: data.current.uv
               });
           })
           .catch(error => {
               console.error('Error fetching weather:', error);
           });


   }, 1000);
}*/


// Show loading state
function showLoading() {
    loading.style.display = 'block';
    error.style.display = 'none';
    weatherInfo.style.display = 'none';
}

// Show error message
function showError(message) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = message;
    weatherInfo.style.display = 'none';
}

// Show weather data
function showWeatherData(data) {

    loading.style.display = 'none';
    error.style.display = 'none';
    weatherInfo.style.display = 'block';

    // Update UI elements
    document.getElementById('cityName').textContent = data.city;
    document.getElementById('temperature').textContent = data.temperature + '°C';
    document.getElementById('weatherDescription').textContent = data.description;
    document.getElementById('feelsLike').textContent = `Feels like ${data.feelsLike}°F`;
    document.getElementById('humidity').textContent = data.humidity + '%';
    document.getElementById('windSpeed').textContent = data.windSpeed + ' mph';
    document.getElementById('visibility').textContent = data.visibility + ' mi';
    document.getElementById('uvIndex').textContent = data.uvIndex;
    document.getElementById("region").textContent= data.region;

    // You can add logic here to change weather icon based on conditions
    updateWeatherIcon(data.description);
}

// Update weather icon based on description
function updateWeatherIcon(description) {
    const iconElement = document.getElementById('weatherIcon');
    const desc = description.toLowerCase();

    if (desc.includes('sunny') || desc.includes('clear')) {
        iconElement.textContent = '☀️';
    } else if (desc.includes('cloud')) {
        iconElement.textContent = '☁️';
    } else if (desc.includes('rain')) {
        iconElement.textContent = '🌧️';
    } else if (desc.includes('snow')) {
        iconElement.textContent = '❄️';
    } else if (desc.includes('thunder')) {
        iconElement.textContent = '⛈️';
    } else {
        iconElement.textContent = '🌤️';
    }
}