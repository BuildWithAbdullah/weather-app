const temperatureField = document.querySelector('.temp');
const cityField = document.querySelector('.time_location p');
const dateTimeField = document.querySelector('.time_location span');
const conditionField = document.querySelector('.condition p:last-child');
const iconImg = document.querySelector('.weather-icon');
const searchField = document.querySelector('.search_area');
const form = document.querySelector('form');

form.addEventListener('submit', searchForLocation);

let target = 'Lahore';

const fetchResults = async (targetLocation) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${targetLocation}&appid=3bc22f0dc9032f08a51aa68671b1e80a&units=metric`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error('City not found');
        }

        const data = await res.json();
        console.log(data);

        const locationName = data.name;
        const condition = data.weather[0].description;
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const timestamp = data.dt * 1000;
        const date = new Date(timestamp);
        const timeString = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });          
        const dateString = date.toLocaleDateString();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        updateDetails(
            `${temperature}°C`,
            locationName,
            `${timeString} - ${dayName} ${dateString}`,
            condition,
            iconUrl
        );
    } catch (error) {
        alert(error.message);
    }
};

function updateDetails(temp, locationName, time, condition, iconUrl) {
    temperatureField.innerText = temp;
    cityField.innerText = locationName;
    dateTimeField.innerText = time;
    conditionField.innerText = condition;
    iconImg.setAttribute('src', iconUrl);
    iconImg.setAttribute('alt', condition);
}

function searchForLocation(e) {
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
}

fetchResults(target);
