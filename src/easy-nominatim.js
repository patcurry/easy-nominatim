/////////////////////////////////////////////////////////////
/*
This package is currently only available in the browser. I
realized that for my current purposes, I only need it in
the browser. However, I will be adding node functionality...
maybe. It uses babel to transpile everything from ES2015 to
es5, but it also uses the new javascript fetch api. I probably
don't need to have babel do anything if I'm sticking with the
fetch api, because any browser that can handle fetch will be
able to handle ES2015. So, maybe I'll remove that.
*/
/*
Everything must be called with the 'en' prefix. For example:

  en.getPlaceData('berlin', callback)

where the callback is a function that takes the possiblePlaces
array (which is an array of objects). All the functions below
are available to users. This is so that they could be tested
from the command line with mocha (and also used with node).
Call them with the 'en' prefix.

  en.nominatim
  en.possiblePlaces
  en.normalizeGeoJSON
  en.getPlaceData

*/
/*

While I want to use the revealing module pattern of coding,
I also want to be able to test my code. I will be unable
to test private functions (unless I jump through a bunch
of hoops), so I can just make all the functions public. Why
worry if the nominatim variable is private of public? Even so
it could still be difficult to test the promises. How do I do
that?
*/
/////////////////////////////////////////////////////////////

const en = (() => {


  // nominatim string - do these need to be part of the module?
  const nominatim = 'https://nominatim.openstreetmap.org/search/'

  // object to hold possible places in.
  const possiblePlaces = []

  // normalize places the geometry into a featurecollection, similar to
  // this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
  // https://github.com/mapbox/geojson-normalize
  const normalizeGeoJSON = obj => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: obj,
          properties: {}
        }
      ]
    }
  }

  const getPlaceData = (place, callback) => {
    const searchString = `${nominatim}${place}?format=json&polygon_geojson=1`
    return fetch(searchString)
      .then(response => {
        if (!response.ok) {
          console.log('Looks like there was a problem. Status code: ', response.status)
        }
        return response.json()
      })
      .then(response => {
        if (possiblePlaces.length > 0) { possiblePlaces.length = 0 }

        response.forEach(place => {
          const obj = {}
          obj.display_name = place['display_name']
          obj.geojson = normalizeGeoJSON(place['geojson'])
          possiblePlaces.push(obj)
        })
      })
      .then(() => callback(possiblePlaces))
      .catch(error => console.log('There has been a problem with the fetch operation: ', error))
  }

  // make everything public
  const everything = {
    nominatim: nominatim,
    possiblePlaces: possiblePlaces,
    normalizeGeoJSON: normalizeGeoJSON,
    getPlaceData: getPlaceData
  }

  return everything 
})()
