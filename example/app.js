'use strict';

var Mongorm = require('../index');
var requireindex = require('requireindex');
var path = require('path');
var db = new Mongorm('mongodb://localhost:27017/mongorm');
db.collections = requireindex(path.join(__dirname,'./collections')); // this way you dont need register
db.connect()
  .then(init);


function init () {
  db.collections.users.insert({name : 'frank'})
  .then(function (result) {
    console.log(result);
    return db.collections.groups.insert({name: 'Group1', users : [result._id]});
  })
  .then(function (result) {
    console.log(result);
  });
}
