'use strict';
var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Collection = require('../lib/collection');
chai.use(require('chai-as-promised'));

describe('collection', function() {
  it('should create a simple collection when passed no arguments', function () {
    var collection = new Collection();
    expect(collection).to.be.ok;
    expect(collection).to.have.property('middleware')
    .that.is.eql([]);
    expect(collection).to.have.property('transforms')
      .that.is.eql([]);
  });
});
