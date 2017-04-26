'use strict';

/////////////////////////////////////////////////////////////
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
  en.getPlaceDataPromise
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

var en = function () {

  // nominatim string - do these need to be part of the module?
  var nominatim = 'https://nominatim.openstreetmap.org/search/';

  // object to hold possible places in.
  var possiblePlaces = [];

  // normalize places the geometry into a featurecollection, similar to
  // this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
  // https://github.com/mapbox/geojson-normalize
  var normalizeGeoJSON = function normalizeGeoJSON(obj) {
    return {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: obj,
        properties: {}
      }]
    };
  };

  // promisified xmlhttprequest with nominatim addition for url
  var getPlaceDataPromise = function getPlaceDataPromise(place) {
    var searchString = '' + nominatim + place + '?format=json&polygon_geojson=1';
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

  // call the promise and deal with the data using .then and .catch functions
  var getPlaceData = function getPlaceData(place, callback) {
    getPlaceDataPromise(place).then(function (data) {
      // convert osm data to json object
      var placeArr = JSON.parse(data);

      // clear possible places array
      if (possiblePlaces.length > 0) {
        possiblePlaces.length = 0;
      }

      // loop through placeArr and create an object for each
      // of the array items, then add those objects to the
      // possible places array
      placeArr.forEach(function (place) {
        var obj = {};
        obj.display_name = place['display_name'];
        obj.geojson = normalizeGeoJSON(place['geojson']);
        possiblePlaces.push(obj);
      });

      // take the possible places and use the callback
      // to do something with it
      callback(possiblePlaces);
    }).catch(function (error) {
      return Error(error);
    });
  };

  // make everything public
  var module = {
    nominatim: nominatim,
    possiblePlaces: possiblePlaces,
    normalizeGeoJSON: normalizeGeoJSON,
    getPlaceDataPromise: getPlaceData,
    getPlaceData: getPlaceData
  };

  return module;
}();

// this is exporting en to node as en.en
if (typeof exports !== 'undefined') {
  exports.en = en;
}