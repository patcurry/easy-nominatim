"use strict";

/////////////////////////////////////////////////////////////
/*
Everything must be called with the 'en' prefix. For example:

  en.getPlaceData('berlin')
  en.possiblePlaces

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

var en = function () {
  // private functions and variables

  // nominatim string - do these need to be part of the module?
  //  const nominatim = 'http://nominatim.openstreetmap.org/search/'

  // object to hold possible places in. I'm not making this public yet
  // there needs to be an empty container to add data to
  var possiblePlaces = [];

  // make geojson
  // normalize places the geometry into a featurecollection, similar to
  // this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
  // https://github.com/mapbox/geojson-normalize
  /*
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
  */

  /*
  // promisified xmlhttprequest bound to makeSelectorOptions function
  // can I put this in the module instead of here?
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
  */

  // public functions (in module)
  var module = {

    nominatimSearchUrl: 'http://nominatim.openstreetmap.org/search/',

    normalizeGeoJson: function normalizeGeoJson(obj) {
      return {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          geometry: obj,
          properties: {}
        }]
      };
    },

    getPlaceDataPromise: function getPlaceDataPromise(place) {
      var searchString = "" + nominatim + place + "?format=json&polygon_geojson=1";

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', searchString, true);
        xhr.onload = function () {
          xhr.status >= 200 < 300 ? resolve(xhr.responseText) : reject(xhr.statusText);
        };
        xhr.onerror = function () {
          return reject(xhr.statusText);
        };
        xhr.send();
      });
    },

    // call the .then and .catch statements parts
    // this might make things difficult to test. It calls a function that calls
    // a promise function... how in the world do i test that? I hate these things
    getPlaceData: function getPlaceData(place) {

      getPlaceDataPromise(place)

      // can i put the rest of this stuff in a separate call?

      .then(function (data) {
        // convert osm data to json object
        var placeArr = JSON.parse(data);

        // clear possible places array
        possiblePlaces.length > 0 ? possiblePlaces.length = 0 : console.log('first additions');

        // loop through placeArr and create an object for each
        // of the array items. Add those objects to the
        // possible places array, so that they can be accessed
        // by calling 'en.possiblePlaces'
        placeArr.forEach(function (place) {
          var obj = {};
          obj.display_name = place['display_name'];
          obj.geojson = place['geojson'];
          possiblePlaces.push(obj);
        });
      }).catch(function (error) {
        return console.log(error);
      });
    },

    // array to hold places
    possiblePlaces: possiblePlaces

  };

  return module;

  // close and call
}();

// this is exporting en to node as en.en
if (typeof exports !== 'undefined') {
  exports.en = en;
}