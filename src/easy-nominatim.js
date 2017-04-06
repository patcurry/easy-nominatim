// nominatim string
const nominatim = 'http://nominatim.openstreetmap.org/search/'

// make geojson
// this is lifted from http://nominatim.openstreetmap.org/js/nominatim-ui.js
// normalize places the geometry into a featurecollection, similar to
// https://github.com/mapbox/geojson-normalize
const normalizeGeojson = obj => {
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

// make a couple buttons and an input in the 'enom' div

// this export thing breaks the browser support (which is what i want)
export {normalizeGeojson, nominatim}
