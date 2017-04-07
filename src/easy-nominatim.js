/////////////////////////////////////////////////////////////
/*
Everything must be called with the 'en' prefix. Use the main
(currently only) function like this:

  en.makeButtonsAndInput(divid)

where the 'divid' is the id of the div you want the buttons and
input to be in and the 'map' is the leaflet maps variable.


I'm redoing this. It's only function is going to be connecting
to open street maps, getting the geojson data, and returning
it as an array of geojson objects.

This will be the way the function is called:

  en.getPlaceData(place)

where place is a string that open street map's nominatim api can look up

*/
/////////////////////////////////////////////////////////////


const en = (() => {

  // private functions and variables

  // nominatim string - do these need to be part of the module?
  const nominatim = 'http://nominatim.openstreetmap.org/search/'

  // object to hold possible places in
  const possiblePlaces = []

  // make geojson
  // normalize places the geometry into a featurecollection, similar to
  // this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
  // https://github.com/mapbox/geojson-normalize
  const normalizeGeoJSON = obj => {
  return {
             type: "FeatureCollection",
             features: [
                 {
                     type: "Feature",
                     geometry: obj,
                     properties: {}
                 }
             ]
        }
  }

  // promisified xmlhttprequest bound to makeSelectorOptions function
  const getPlaceData = place => {

    const searchString = `${nominatim}${place}?format=json&polygon_geojson=1`

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', searchString, true)
      xhr.onload = () => {
        xhr.status >= 200 < 300
        ? resolve(xhr.responseText)
        : reject(xhr.statusText)
      }
      xhr.onerror = () => reject(xhr.statusText)
      xhr.send()
    })
  } 

  // public functions (in module)
  const module = {

    // object to hold places
    possiblePlaces: possiblePlaces,

    getPlaceData: place => {
      console.log(place)
      
      getPlaceData(place)
      .then(data => {
        // convert osm data to json object
        const placeArr = JSON.parse(data)

        // clear possible places array
        possiblePlaces.length > 0
        ? possiblePlaces.forEach(p => possiblePlaces.pop())
        : console.log('first additions')

        // loop through placeArr and create an object for each
        // of the array items. Add those objects to the
        // possible places array, so that they can be accessed
        // by calling 'en.possiblePlaces'
        placeArr.forEach(place => {
          const obj = {}
          const displayName = place['display_name']
          const geojson = place['geojson']
          obj[displayName] = geojson
          possiblePlaces.push(obj)
        })
      })
      .catch(error => console.log(error))
    }
  }

  return module
  
// close and call
})()



// if this is here, I shouldn't need browserify.
if (typeof exports !== 'undefined') {
  exports.en = en
}

