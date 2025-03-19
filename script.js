const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?';

function coordinatesToLongLat(coordsString) {
    let parts = coordsString.split(' ');
    console.log(coordsString);

    let latitude = parseInt(parts[0].split('°')[0]);
    let latitudeSeconds = parseInt(parts[0].split('°')[1].split(`'`)) / 60.0;

    latitude += latitudeSeconds;

    let longitude = parseInt(parts[1].split('°')[0]);
    let longitudeSeconds = parseInt(parts[1].split('°')[1].split(`'`)) / 60.0;

    longitude += longitudeSeconds;

    return {
        latitude: latitude,
        longitude: longitude
    };
}

function convertToQueryString(base, coords, language) {    
    if (language == undefined)
        language = 'bg';

    let params = new URLSearchParams({
        latitude: coords.latitude,
        longitude: coords.longitude,
        localityLanguage: 'bg'
    });

    return base + params.toString();
}

let obj;

async function submitData() {
    let content = document.getElementById('coordinates').value;

    let coords = coordinatesToLongLat(content);
    let queryString = convertToQueryString(BASE_URL, coords);

    await fetch(queryString)
        .then(result => result.json())
        .then((data) => obj = data);
}

async function visualiseData() {
    await submitData();

    let cityInfo = document.getElementById('city-info');
    cityInfo.classList.remove('invisible');

    console.log(obj);

    document.getElementById('city-name').innerHTML = obj.city;
    document.getElementById('city-country').innerHTML = obj.countryName;
    document.getElementById('city-area').innerHTML = obj.locality;
    document.getElementById('city-flag').src = `https://flagsapi.com/${obj.countryCode}/shiny/64.png`
}