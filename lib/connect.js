'use strict';
var client = require('mongodb').MongoClient;
var P = require('bluebird');
module.exports = function (url) {
  return new P(function (resolve, reject) {
    client.connect(url, function (err, db) {
      if (err) {
        return reject(err);
      }
      return resolve(db);
    });
  });
};
