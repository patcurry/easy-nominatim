const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const assert = chai.assert
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const en = require('../src/easy-nominatim.js').en

describe('en.nominatim', () => {
  it('should return osm nominatim api search url', () => {
    assert.equal(en.nominatim, 'http://nominatim.openstreetmap.org/search/')
  })
})

describe('en.possiblePlaces', () => {
  it('should have an empty possiblePlaces array', () => {
    assert.equal(en.possiblePlaces.length, 0)
  })
})

describe('en.normalizeGeoJSON', () => {
  it('should return a json object from the osm nominatim api into a geojson object', () => {
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
      JSON.stringify(en.normalizeGeoJSON(gj)),
      JSON.stringify(expected)
    )
  })
})

describe('en.getPlaceDataPromise', () => {
  it('should eventually return object data', () => {
    //nominatim = 'http://nominatim.openstreetmap.org/search/'
    const place = 'palm desert'
    return assert.eventually.equal(en.getPlaceDataPromise(place).length, 2)
  })
})

describe('en.getPlaceData', () => {
  it('should parse data from getPlaceDataPromise and add it to possiblePlaces array', () => {
    assert.equal(0, "this isn't done yet")
  })
  it('should should replace the data in the possiblePlaces array with the new data', () => {
    assert.equal(0, "this isn't done yet")
  })
  it('should should return error when the place does not work', () => {
    assert.equal(0, "this isn't done yet")
  })
})
