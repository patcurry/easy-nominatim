"use strict";

/////////////////////////////////////////////////////////////
/*
Everything must be called with the 'en' prefix. For example:

  en.getPlaceData('berlin', callback)

where the callback is a function that takes the possiblePlaces
array (which is an array of objects)

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
  /////////////////////////////////////////////////////////////
  // private functions and variables
  /////////////////////////////////////////////////////////////

  // nominatim string - do these need to be part of the module?
  var nominatim = 'http://nominatim.openstreetmap.org/search/';

  // object to hold possible places in.
  var possiblePlaces = [];

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

  // promisified xmlhttprequest with nominatim addition for url
  var _getPlaceData = function _getPlaceData(place) {
    var searchString = "" + nominatim + place + "?format=json&polygon_geojson=1";

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', searchString, true); // does this need to be asynchronous?
      xhr.onload = function () {
        xhr.status >= 200 < 300 ? resolve(xhr.responseText) : reject(xhr.statusText);
      };
      xhr.onerror = function () {
        return reject(xhr.statusText);
      };
      xhr.send();
    });
  };

  /////////////////////////////////////////////////////////////
  // public functions and variables
  /////////////////////////////////////////////////////////////

  var module = {
    // call the .then and .catch statements parts
    // this might make things difficult to test. It calls a function that calls
    // a promise function... how in the world do i test that? I hate thse things
    // I need to pass in another function to be called
    getPlaceData: function getPlaceData(place, callback) {
      _getPlaceData(place).then(function (data) {
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

        // now take the possible places and use the callback
        // to do something with it
        callback(possiblePlaces);
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