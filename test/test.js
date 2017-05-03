if (typeof require !== 'undefined') {
  const chai = require('chai')
  const chaiAsPromised = require('chai-as-promised')
  chai.use(chaiAsPromised)
  const assert = chai.assert
  const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

  const en = require('../src/easy-nominatim.js').en
}


describe('en.nominatim', () => {
  it('should return osm nominatim api search url', () => {
    assert.equal(en.nominatim, 'https://nominatim.openstreetmap.org/search/')
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

  const nominatim = 'https://nominatim.openstreetmap.org/search/'
  const getPlaceDataPromise_test = place => {
    const searchString = `${nominatim}${place}?format=json&polygon_geojson=1`
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', searchString, true) // does this need to be asynchronous?
      xhr.onload = () => {
        xhr.status >= 200 < 300
        ? resolve(xhr.responseText)
        : reject(xhr.statusText)
      }
      xhr.onerror = () => reject(xhr.statusText)
      xhr.send()
    })
  }



    const place = 'palm desert'
    console.log(getPlaceDataPromise_test('palm desert')) // why is this undefined?

    return assert.eventually.equal(getPlaceDataPromise_test(place).length, 2)
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
