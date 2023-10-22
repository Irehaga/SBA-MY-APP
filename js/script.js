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
