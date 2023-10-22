
// Populate the dropdown when the page loads
window.onload = function() {
    // Define the cities array
    var cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

    // Get the dropdown element by its ID
    var dropdown = document.getElementById('cityDropdown');

    // Populate the dropdown with the cities
    for (var i = 0; i < cities.length; i++) {
        var option = document.createElement('option');
        option.value = cities[i];
        option.text = cities[i];
        dropdown.appendChild(option);
    }
}

// Define bus routes for each city
var cityRoutes = {
    'New York': ['Route A1', 'Route A2', 'Route A3'],
    'Los Angeles': ['Route B1', 'Route B2'],
    'Chicago': ['Route C1', 'Route C2', 'Route C3', 'Route C4'],
    'Houston': ['Route D1', 'Route D2'],
    'Phoenix': ['Route E1', 'Route E2', 'Route E3']
};

// Function to show bus routes based on the selected city
function showBusRoutes() {
    // Retrieve the selected city
    var selectedCity = document.getElementById('cityDropdown').value;

    // Construct a table based on the city's bus routes
    var routesTable = '<table border="1"><thead><tr><th>Bus Routes for ' + selectedCity + '</th></tr></thead><tbody>';
    
    var routes = cityRoutes[selectedCity];
    for (var i = 0; i < routes.length; i++) {
        routesTable += '<tr><td>' + routes[i] + '</td></tr>';
    }
    routesTable += '</tbody></table>';

    // Insert the table into the busRouteDisplay div
    document.getElementById('busRouteDisplay').innerHTML = routesTable;
}



function updateTime() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = ((360 / 12) * hours) + ((360 / 12) * (minutes / 60));
    const minuteDeg = ((360 / 60) * minutes) + ((360 / 60) * (seconds / 60));
    const secondDeg = (360 / 60) * seconds;

    document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${secondDeg}deg)`;
}

setInterval(updateTime, 1000);
updateTime();




/*This is for the landing page, ask user for permition to get their location so it can show the clock */
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getTimeFromLocation, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}

function getTimeFromLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    updateTime();
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
    updateTime();
}





/*getting loction of user and display the weather in the table*/
function fetchWeather() {
    let cityName = document.getElementById("city-name").value;
    let apiKey = '71490afcce3e205a9adb5a85eff359b2';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        let temperature = data.main.temp;
        let condition = data.weather[0].description;
        let humidity = data.main.humidity;

        document.getElementById("location-name").textContent = cityName;
        document.getElementById("temperature").textContent = temperature;
        document.getElementById("condition").textContent = condition;
        document.getElementById("humidity").textContent = humidity;
        document.getElementById("weather-info").style.display = "block";
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert("Failed to fetch weather data. Make sure the city name is correct.");
    });
}







