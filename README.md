# easy-nominatim

This package simply makes a promisified XMLHttpRequest to the http://nominatim.openstreetmap.org/ site and brings back an array of objects with the location display name, and a valid geojson FeatureCollection. It allows one to put a callback into the, currently single, function that does whatever the user wants with the data. It is written with ES6 JavaScript, and compiled to mostly ES5 javascript with Babel.
