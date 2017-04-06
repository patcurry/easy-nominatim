const assert = require('chai').assert

import {normalizeGeojson, nominatim} from '../src/easy-nominatim.js'

describe('normalizeGeojson', () => {
  it('turn a json object from osm nominatim api into a geojson object', () => {

    // osm nominatim gives the json polygon info in this form.    
    const gj = {"type":"Polygon","coordinates":[0,0]}

    // this is what it should look like after it's normalized
    const expected = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    "type": "Polygon",
                    "coordinates": [0, 0]
                },
                properties: {}
            }
        ]
    }

    // make assertion
    // for some reason mocha or chai doesn't like objects, so these must be stringified
    assert.equal(
      JSON.stringify(normalizeGeojson(gj)),
      JSON.stringify(expected)
    )
  })
})

describe('nominatim', () => {
  it('should be a constant variable set to the nominatim url', () => {
    const expected = 'http://nominatim.openstreetmap.org/search/'
    assert.equal(nominatim, expected)
  }) 
})

// append buttons to div with id 'enom'
describe('enom div', () => {

  it('should have buttons appended to it', () => {

  })
})
