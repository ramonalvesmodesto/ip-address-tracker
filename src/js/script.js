document.getElementById("submit").addEventListener('click', query);

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ENV.MAP_BOX_API
}).addTo(map);

async function query() {
    const URL_GEO = `https://geo.ipify.org/api/v2/country,city?apiKey=${ENV.GEO_IP_IFY_API_KEY}`;
    let ipAddress = "";
    let search = document.getElementById("search");

    if(search.value != "") {
        ipAddress = "&ipAddress=" + search.value;
    }

    const data = await fetch(URL_GEO + ipAddress);
    const json = await data.json();

    document.getElementById("ipAddress").innerHTML = json.ip;
    document.getElementById("location").innerHTML = json.location.city;
    document.getElementById("timezone").innerHTML = "UTC " + json.location.timezone;
    document.getElementById("isp").innerHTML = json.isp;

    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Coors Field",
            "amenity": "Baseball Stadium",
            "popupContent": "This is where the Rockies play!"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [json.location.lng, json.location.lat]
        }
    };

    L.geoJSON(geojsonFeature).addTo(map);


    map.setView([json.location.lat, json.location.lng], 12);
}

query();
