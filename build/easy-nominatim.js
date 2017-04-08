"use strict";

/////////////////////////////////////////////////////////////
/*
Everything must be called with the 'en' prefix. For example:

  en.getPlaceData('berlin')
  en.possiblePlaces

*/
/////////////////////////////////////////////////////////////

var en = function () {
  // private functions and variables

  // nominatim string - do these need to be part of the module?
  var nominatim = 'http://nominatim.openstreetmap.org/search/';

  // object to hold possible places in
  var possiblePlaces = [];

  // make geojson
  // normalize places the geometry into a featurecollection, similar to
  // this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
  // https://github.com/mapbox/geojson-normalize
  var normalizeGeoJSON = function normalizeGeoJSON(obj) {
    return {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: obj,
        properties: {}
      }]
    };
  };

  // promisified xmlhttprequest bound to makeSelectorOptions function
  // can I put this in the module instead of here?
  var _getPlaceData = function _getPlaceData(place) {
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
  };

  // public functions (in module)
  var module = {
    // this might make things difficult to test. It calls a function that calls
    // a promise function... how in the world do i test that? I hate thse things
    getPlaceData: function getPlaceData(place) {

      _getPlaceData(place)

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