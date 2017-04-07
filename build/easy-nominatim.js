"use strict";

var add1 = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(x) {
    var a, b;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            a = resolveAfter2Seconds(20);
            b = resolveAfter2Seconds(30);
            _context.t0 = x;
            _context.next = 5;
            return a;

          case 5:
            _context.t1 = _context.sent;
            _context.t2 = _context.t0 + _context.t1;
            _context.next = 9;
            return b;

          case 9:
            _context.t3 = _context.sent;
            return _context.abrupt("return", _context.t2 + _context.t3);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function add1(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
require("babel-polyfill");

add1(10).then(function (v) {
  console.log(v); // prints 60 after 2 seconds.
});

/*

const en = (() => {

  const module = {}

  // nominatim string - do these need to be part of the module?
  const nominatim = 'http://nominatim.openstreetmap.org/search/'

  // object to hold places
  const possiblePlaces = {}

  // make geojson
  // this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
  // normalize places the geometry into a featurecollection, similar to
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
  const getPlace = (url, selector) => {
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








  // this should probably be a private function too
  const makeSelectorOptions = (placeArr, selector) => {
    // shouldn't there be better way to get this selector?
    // const selector = document.getElementById('selector_en')

    // clear selector options
    selector.innerHTML = ''

    // create selector options
    placeArr.forEach(place => {
      // get the osm data
      const display_name = place['display_name']    
      const geojson = place['geojson']    

      const option = document.createElement('option')
      option.value = display_name

      const text = document.createTextNode(display_name)

      // this requires leaflet to work
      const lyr = L.geoJSON(normalizeGeoJSON(geojson))

      possiblePlaces[display_name] = lyr
      option.appendChild(text)
      selector.appendChild(option)
    })
  }

  // promisified xmlhttprequest bound to makeSelectorOptions function
  const getPlace = (url, selector) => {
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

  module.makeButtonsAndInput = (divId, map) => {
    // get div to put things in
    const div = document.getElementById(divId)

    const placeInput = document.createElement('input')
    const placeButton = document.createElement('input')
    const p = document.createElement('p')
    const selector = document.createElement('select')
    const selectButton = document.createElement('input')

    placeInput.type = 'text'
    placeInput.id = 'place_input_en'

    placeButton.type = 'submit'
    placeButton.id = 'place_button_en'

    selector.id = 'selector_en'

    selectButton.type = 'submit'
    selectButton.id = 'select_button_en'

    p.appendChild(selector)
    p.appendChild(selectButton)

    const arr = [placeInput, placeButton, p]

    arr.forEach(i => div.appendChild(i))

    // add event listeners and functions to elements
    placeButton.addEventListener('click', () => {
      const stringSearch = `${nominatim}${placeInput.value}?format=json&polygon_geojson=1`
      // do i need to include the selector here?
      getPlace(stringSearch, selector)
    })

    // the leaflet m variable is required here
    selectButton.addEventListener('click', map => {
//      Object.keys(possiblePlaces).forEach(p => {
//        map.removeLayer(possiblePlaces[p])
//      })

      const lyr = possiblePlaces[selector.value]
      lyr.addTo(map)
      map.fitBounds(lyr.getBounds())
    })
  }

  return module
  
// close and call
})()



// if this is here, I shouldn't need browserify.
if (typeof exports !== 'undefined') {
  exports.en = en
}
*/