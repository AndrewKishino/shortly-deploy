var mongoose = require('mongoose');
var path = require('path');
var crypto = require('crypto');
var Promise = require('bluebird');

mongoose.connect('mongodb://localhost/users')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:' ));
// db.once('open', function(){
//   //yay!

// });
var Schema = mongoose.Schema;

var linkSchema = new Schema{(
  hash : { type: String, requried: true, index: { unique: true } },
  clicks : { type: Number, default: 0 },
  fullLink: { type: String, requried: true }
)}

var userSchema = new Schema{(
  username : { type: String, requried: true, index: { unique: true } },
  password : { type: String, required: true },
  links : [Links]
)};

linkSchema.pre('save', function(next){
  var shasum = crypto.createHash('sha1');
  this.hash = shasum.digest('hex').slice(0,5);
  next();
});

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then(function(hash){
      this.password = hash;
    })
})

module.exports.Link = mongoose.model('Link', linkSchema);

module.exports.User = mongoose.model('User', userSchema);

//search for documents with filters
  //username
    // --> grab document ids

//start up mongo server with node js
//build collection schema on startup of server
//how to query for username
//validate password
//insert new users
//insert new links to a user document (specific user)
//retrieve links for a specific user


















































// var Bookshelf = require('bookshelf');
// var path = require('path');

// var db = Bookshelf.initialize({
//   client: 'sqlite3',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'password',
//     database: 'shortlydb',
//     charset: 'utf8',
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('base_url', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
