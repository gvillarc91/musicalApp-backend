'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  userName: String,
  password: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
