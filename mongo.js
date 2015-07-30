var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('test', server);
// var models = require('app/config');

client.open(function(err, p_client){
  console.log("connected to MongoDB");
})