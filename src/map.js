// eslint-disable-next-line no-undef
const clock = document.querySelector('.clock');

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
let map;
let geocoder;
let day;
const input = document.querySelector('.geocoder');
const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const month = new Array(12);
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

function toDegreesMinutesAndSeconds(coordinate) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  return `${degrees}° ${minutes}'`;
}

function convertLat(lat) {
  const latitude = toDegreesMinutesAndSeconds(lat);
  const latitudeCardinal = lat >= 0 ? 'N' : 'S';

  return `Latitude: ${latitude} ${latitudeCardinal}`;
}

function convertLng(lng) {
  const longitude = toDegreesMinutesAndSeconds(lng);
  const longitudeCardinal = lng >= 0 ? 'E' : 'W';

  return `Longitude: ${longitude} ${longitudeCardinal}`;
}

function initMap(position) {
  mapboxgl.accessToken = 'pk.eyJ1IjoicHJva29maWV2YSIsImEiOiJja2FvNHV3cDAxa2c1MzFwNnV3MWNuYTdjIn0.hk_7r7T2slYlwTe56mH7Tw';
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 9,
  });
}

function addMarker(position) {
  const marker = new mapboxgl.Marker()
    .setLngLat([position.coords.longitude, position.coords.latitude])
    .addTo(map);
}

function addSearch() {
  geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl,
  });
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
}

function renderLocationData(long, lat) {
  document.querySelector('.longitude').innerHTML = convertLng(long);
  document.querySelector('.latitude').innerHTML = convertLat(lat);
}

async function getWeatherDate(long, lat) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=deed25509943629b7effbd7f7dfe2b68`;
  const response = await fetch(url);
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
    return false;
  }
  const data = await response.json();
  return data;
}

async function getWeatherFor5Days(long, lat) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,current,minutely&appid=deed25509943629b7effbd7f7dfe2b68`;
  const response = await fetch(url);
  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.log(`Looks like there was a problem. Status Code: ${response.status}`);
    return false;
  }
  const data = await response.json();
  return data;
}

async function setTime(lat, long) {
  const data = await getWeatherFor5Days(lat, long);
  const timeZone = data.timezone;

  moment.tz.setDefault(timeZone);
  setInterval(() => {
    const now = moment();
    const t = now.format('ddd D MMMM hh:mm:ss A');
    clock.innerHTML = t;
  }, 1000);
}

async function renderWeather(long, lat) {
  const data = await getWeatherDate(long, lat);
  const city = data.name;
  const wind = data.wind.speed;
  const feelsLike = Math.round(data.main.feels_like - 273);
  const temp = Math.round(data.main.temp - 273);
  const humidityLevel = data.main.humidity;
  const desc = data.weather[0].description;
  const iconWeather = data.weather[0].icon;
  const country1 = data.sys.country;
  document.querySelector('.city').innerText = `${city}, ${country1}`;
  document.querySelector('.temp').innerText = temp;
  document.querySelector('.additional-information').innerHTML = `
    <div class="additional-information">
          <img class="weather-icon" src="src/assets/amcharts_weather_icons_1.0.0/animated/${iconWeather}.svg" alt="forecast"></img>
          <p class="desc">${desc}</p>
          <p class="feels-like">Feels like: ${feelsLike}°C</p><p class="wind">Wind: ${wind} M/S</p>
          <p class="humidity">Humidity: ${humidityLevel}%</p>
    </div>`;
}

async function renderWeatherFor3Days(long, lat) {
  const data = await getWeatherFor5Days(long, lat);
  console.log(data);
  const tempDay1 = Math.round((data.daily[1].temp.max + data.daily[1].temp.min) / 2 - 273);
  const tempDay2 = Math.round((data.daily[2].temp.max + data.daily[2].temp.min) / 2 - 273);
  const tempDay3 = Math.round((data.daily[3].temp.max + data.daily[3].temp.min) / 2 - 273);
  const iconWeatherDay1 = data.daily[1].weather[0].icon;
  const iconWeatherDay2 = data.daily[2].weather[0].icon;
  const iconWeatherDay3 = data.daily[3].weather[0].icon;
  const day1 = new Date(data.daily[1].dt * 1000);
  const day2 = new Date(data.daily[2].dt * 1000);
  const day3 = new Date(data.daily[3].dt * 1000);
  document.querySelector('.forecast-for-3-days').innerHTML = `<div class="day"><div class="days-of-the-week"><p class="day-of-the-week">${weekday[day1.getDay()]}</p></div>
<div class="icon-and-temp">
      <div><p class="temperature">${tempDay1}°</p></div>
      <div><img class="weather-icon" src="src/assets/amcharts_weather_icons_1.0.0/animated/${iconWeatherDay1}.svg" alt="forecast"></img></div>
</div></div>

<div class="day"><div class="days-of-the-week"><p class="day-of-the-week">${weekday[day2.getDay()]}</p></div>
<div class="icon-and-temp">
      <div><p class="temperature">${tempDay2}°</p></div>
      <div><img class="weather-icon" src="src/assets/amcharts_weather_icons_1.0.0/animated/${iconWeatherDay2}.svg" alt="forecast"></img></div>
</div></div>

<div class="day"><div class="days-of-the-week"><p class="day-of-the-week">${weekday[day3.getDay()]}</p></div>
<div class="icon-and-temp">
      <div><p class="temperature">${tempDay3}°</p></div>
      <div><img class="weather-icon" src="src/assets/amcharts_weather_icons_1.0.0/animated/${iconWeatherDay3}.svg" alt="forecast"></img></div>
</div></div>`;
}

navigator.geolocation.getCurrentPosition((position) => {
  initMap(position);
  renderLocationData(position.coords.longitude, position.coords.latitude);
  addMarker(position);
  addSearch();
  renderWeather(position.coords.longitude, position.coords.latitude);
  renderWeatherFor3Days(position.coords.longitude, position.coords.latitude);
  setTime(position.coords.longitude, position.coords.latitude);
});

input.oninput = () => {
  geocoder.on('result', (results) => {
    const lon = results.result.geometry.coordinates[1];
    const lat = results.result.geometry.coordinates[0];
    uploadRandomImage();
    renderWeather(lat, lon);
    renderLocationData(lon, lat);
    renderWeatherFor3Days(lat, lon);
    setTime(lat, lon);
    c.disabled = 'true';
    f.disabled = '';
  });
};
