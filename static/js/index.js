const osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: `&copy; <a href="http://www.openstreetmap.org/copyright">
  OpenStreetMap</a>`,
  minZoom: 2,
  maxZoom: 19
})

const myMap = L.map('mapid', {
  center: {lat: 0, lng: 8.8460},
  zoom: 2,
  layers: osm,
  scrollWheelZoom: false
})

const placeInput = document.getElementById('place_input')
const placeButton = document.getElementByID('place_button')

const nominatim = 'http://nominatim.openstreetmap.org/'

////////////////////////////////////////////////////////////
// Basically, i'm going to have to separate input text by
// spaces, then join it by plus marks, then append it to
// the nominatim string and request it with XMLHttpRequest.
// After that I will have to parse the JSON and get the
// coordinates that form the polygon or line or point or
// whatever and make a geojson object from the points. I
// will probably do that with the Turfjs libary.
////////////////////////////////////////////////////////////
