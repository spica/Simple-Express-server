var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username   : {type: String, required: true, index: true, unique: true},
  password    : {type: String, required: true},
  loginCnt  : {type: Number, required: true, default: 1}
});

User.path('username').validate(function (value) {
  return value.length >=5 && value.length <= 20;
}, "Invalid username length");

User.path('password').validate(function (value) {
  return value.length >= 8 && value.length <= 20;
}, "Invalid password length");

module.exports = mongoose.model('user', User);
mongoose.connect( 'mongodb://heroku_app30612503:20ovajh1rfl34qesbajsac05rt@ds035260.mongolab.com:35260/heroku_app30612503' );
