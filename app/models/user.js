var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Promise = require('bluebird');

var Schema = mongoose.Schema;

var userSchema = new Schema{(
  username : { type: String, index: { unique: true } },
  password : String
)};

var User = mongoose.model('User', userSchema);

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if(err) {
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};

userSchema.pre('save', function(next){
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then(function(hash){
      this.password = hash;
      next();
    });
});

module.exports = User;