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
        language: 'bg'
    });

    return base + params.toString();
}

async function submitData() {
    let content = document.getElementById('coordinates').value;

    let coords = coordinatesToLongLat(content);
    let queryString = convertToQueryString(BASE_URL, coords);

    fetch(queryString)
        .then(result => result.json())
        .then((data) => console.log(data));
}