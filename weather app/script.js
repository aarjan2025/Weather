// Function to get weather emoji based on description
function getWeatherEmoji(description) {
    description = description.toLowerCase();
    
    const weatherEmojis = {
        // Clear sky
        'clear sky': '☀️',
        
        // Clouds
        'few clouds': '🌤️',
        'scattered clouds': '⛅',
        'broken clouds': '☁️',
        'overcast clouds': '☁️',
        
        // Rain
        'light rain': '🌧️',
        'moderate rain': '🌧️',
        'heavy rain': '🌧️',
        'shower rain': '🌦️',
        'rainy': '🌧️',
        
        // Drizzle
        'light intensity drizzle': '🌧️',
        'drizzle': '🌧️',
        'heavy intensity drizzle': '🌧️',
        
        // Thunderstorm
        'thunderstorm': '⛈️',
        'thunderstorm with light rain': '⛈️',
        'thunderstorm with rain': '⛈️',
        'thunderstorm with heavy rain': '⛈️',
        
        // Snow
        'light snow': '❄️',
        'snow': '❄️',
        'heavy snow': '❄️',
        
        // Atmosphere
        'mist': '🌫️',
        'smoke': '🌫️',
        'haze': '🌫️',
        'fog': '🌫️',
        
        // Default
        'default': '🌈'
    };
    
    // Find the most specific match
    for (let key in weatherEmojis) {
        if (description.includes(key)) {
            return weatherEmojis[key];
        }
    }
    
    // Return default emoji if no match found
    return weatherEmojis['default'];
}

async function getweatherinfo() {
    const searchInput = document.getElementById('search-input');
    const cityName = searchInput.value.trim();

    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Note: Replace with your actual API key and endpoint
        const apiKey = '7a46a174f01ed8076af4029799592358';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        // Create a results container if it doesn't exist
        let resultsContainer = document.getElementById('weather-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'weather-results';
            resultsContainer.classList.add('weather-results');
            document.querySelector('.container').appendChild(resultsContainer);
        }
        
        // Get weather emoji
        const weatherEmoji = getWeatherEmoji(data.weather[0].description);
        
        // Display weather information
        resultsContainer.innerHTML = `
            <h2>${data.name}, ${data.sys.country} ${weatherEmoji}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Feels Like: ${data.main.feels_like}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].description} ${weatherEmoji}</p>
        `;
    } catch (error) {
        alert(error.message);
    }
}

// Optional: Add event listener for Enter key
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getweatherinfo();
    }
});