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
const placeButton = document.getElementById('place_button')
const selector = document.getElementById('selector')
const selectButton = document.getElementById('select_button')
const possiblePlaces = {}

const nominatim = 'http://nominatim.openstreetmap.org/search/'

// make geojson
// this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
const normalize_geojson = obj => {
    // normalize places the geometry into a featurecollection, similar to
    // https://github.com/mapbox/geojson-normalize
    const geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: obj,
                properties: {}
            }
        ]
    }
    return geojson
}

// make selector options
const makeSelectorOptions = (array, selector) => {
  // clear selector options
  selector.innerHTML = ''
  array.forEach(p => {
    // get the osm data
    const display_name = p['display_name']
    const geojson = p['geojson']

    const option = document.createElement('option')
    option.value = display_name
    const text = document.createTextNode(display_name)
    const lyr = L.geoJSON(normalize_geojson(geojson))

    possiblePlaces[display_name] = lyr
    option.appendChild(text)
    selector.appendChild(option)
  })
}

const getPlace = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = () => {
      xhr.readyState === 4 && xhr.status === 200
      ? makeSelectorOptions(JSON.parse(xhr.responseText), selector)
      : console.log(xhr.statusText)
    }
    xhr.onerror = () => console.log('error')
    xhr.send()
  })
} 

placeButton.addEventListener('click', () => {
  const searchString = `${nominatim}${placeInput.value}?format=json&polygon_geojson=1`
  getPlace(searchString)
})

// tightly coupled with the selector options thing
// i can't just keep geojson in the possiblePlaces object, it must be layers, that way
// i can use the 'map.hasLayer()' function
selectButton.addEventListener('click', () => {
  Object.keys(possiblePlaces).forEach(n => {
    myMap.removeLayer(possiblePlaces[n])
  })

  const lyr = possiblePlaces[selector.value]
  lyr.addTo(myMap)
  myMap.fitBounds(lyr.getBounds()) 
})
