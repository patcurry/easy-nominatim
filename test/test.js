const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const assert = chai.assert

const en = require('../src/easy-nominatim.js').en


describe('en.possiblePlaces', () => {

  it('should have an empty possiblePlaces array', () => {
    assert.equal(en.possiblePlaces.length, 0)
  })

  it('should get data for a location and put it into the possiblePlaces array', () => {
//    return en.getPlaceData('palm desert').should.eventually.have.length(2)
    return assert.eventually.equal(en.getPlaceData('palm desert'), 2)
  })

})

describe('en.nominatimSearchUrl', () => {
  it('should return osm nominatim api search url', () => {
    assert.equal(en.nominatimSearchUrl, 'http://nominatim.openstreetmap.org/search/')
  })
})

describe('en.normalizeGeoJson', () => {
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
      JSON.stringify(en.normalizeGeoJson(gj)),
      JSON.stringify(expected)
    )
  })
})
