# easy-nominatim

This package uses the javascript fetch api to make requests to the https://nominatim.openstreetmap.org/ site. It brings back an array of json objects with location display name and a valid geojson FeatureCollection object. It is written with ES6 Javascript and compiled to ES5 with Babel. However, this is probably unnecessary, because if a browser supports the fetch api, it probably supports the ES6 javascript used to write the functions.

The functions are made public the module pattern and must be called with an 'en' prefix.
