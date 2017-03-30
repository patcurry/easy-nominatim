const assert = require('chai').assert

import {whatever} from '../src/easy-nominatim.js'


describe('first test', () => {
  it('should say hello god', () => {
    assert.equal(whatever(), 'hello god')
  })
})
