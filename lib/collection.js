'use strict';
var lodash = require('lodash');
var P = require('bluebird');
var defaults = {
  middleware : [],
  transforms : []
};
var Collection = module.exports = function (config) {
  config = lodash.extend({}, defaults, config);
  // add middleware and transforms
  this.middleware = this.middleware.concat(config.middleware);
  this.transforms = this.transforms.concat(config.transforms);
};

Collection.prototype.middleware = [];
Collection.prototype.transforms = [];
Collection.prototype.find = function (query) {
  return new P(function(resolve, reject) {
    this.mongoCollection.find(query)
      .toArray(function (err, results) {
       if (err) {
         return reject(err);
       }
       return resolve(results);
    });
  }.bind(this));
};

Collection.prototype.insert = function (query) {
  if (!this.mongoCollection) {
    return P.reject(new Error('Collection not initialized'));
  }
  return new P(function(resolve, reject) {
    this.mongoCollection.insert(query, function (err, results) {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  }.bind(this));
};
