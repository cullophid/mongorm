'use strict';
var P = require('bluebird');
var connect = require('./connect');
var Mongoorm = module.exports = function (url) {
  this.url = url;
  this.collections = [];
};
Mongoorm.Collection = require('./collection');

// connect to the database and loadmodels
Mongoorm.prototype.connect = function () {
  return connect(this.url)
    .then(this.setDb.bind(this))
    .then(this.loadCollections.bind(this));
};
// specify the mongo database
Mongoorm.prototype.setDb = function (db) {
  this.db = db;
};

// load all the registered collections
Mongoorm.prototype.loadCollections = function () {
  var i;
  for (i in this.collections) {
    this.collections[i].mongoCollection = this.db.collection(i);
  }
};

// register a collection
Mongoorm.prototype.register = function (name, collection) {
   if (this.collections[name]) {
     throw new Error('Model ' + name + ' already exists');
   }
   this.collections[name] = collection;
};
