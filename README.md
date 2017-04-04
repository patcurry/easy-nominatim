# easy-nominatim
I've made a webpage that will connect to the openstreetmaps nominatim api, pull in geojson data for searched locations, and add those data to a map background. This is a simplified recreation of the http://nominatim.openstreetmap.org/ site. It does not have the same number of features, only the parts I need for the WebGIS project. It is written with ES6 JavaScript, without jQuery.

Is there a way to just put this repo into my webgis repo? I don't want to rewrite anything, i just want to be able to work on this as a separate entity. Maybe if I turn this into a javascript library. I can just work on it that way and make it a general enough helper set to be added to other projects.

I'm going to set this up as a javascript helper file with tests and stuff. I can just include it in the projects I intend to use OSM on.

How do I set the tests up for this one? Should I use phantomjs or should I try and mock everything with JSDOM? What do people usually do to test these javascript libraries?
