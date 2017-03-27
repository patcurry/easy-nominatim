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
const placeSelect = document.getElementById('place_select')
const possiblePlaces = []

const nominatim = 'http://nominatim.openstreetmap.org/search/'

////////////////////////////////////////////////////////////
// Basically, i'm going to have to separate input text by
// spaces, then join it by plus marks, then append it to
// the nominatim string and request it with XMLHttpRequest.
// After that I will have to parse the JSON and get the
// coordinates that form the polygon or line or point or
// whatever and make a geojson object from the points. I
// will probably do that with the Turfjs libary.
////////////////////////////////////////////////////////////

// make selector buttons
const makeSelectorButtons = (array, color, container) => {
  array.forEach(n => {
    const btn = document.createElement('button')
    const value = document.createTextNode(n['display_name'])

    btn.value = text

    btn.style.color = color
  })
}

// make function for adding buttons
const addButton = (text, color, container) => {
  const btn = document.createElement('button')
  const value = document.createTextNode(text)
  //btn.setAttribute('value', text)
  btn.value=text

  // make the color of the number correspond
  // to the color of the dataset on the map
  btn.style.color = color
  btn.style.fontWeight = 'bold'

  // add text to button and button to div
  btn.appendChild(value)
  container.appendChild(btn)

  return btn
}



const dataToDiv = (data, div) => {
  div.innerHTML = data
}

const getPlace = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = () => {
      xhr.readyState === 4 && xhr.status === 200
//      ? dataToDiv(JSON.parse(xhr.responseText), placeSelect)
      ? makeSelectorButtons(JSON.parse(xhr.responseText))
      : console.log(xhr.statusText)
    }
    xhr.onerror = () => console.log('error')
    xhr.send()
  })
} 

placeButton.addEventListener('click', () => {
  console.log(placeInput.value)
  const searchString = `${nominatim}${placeInput.value}?format=json`
  getPlace(searchString)
})
