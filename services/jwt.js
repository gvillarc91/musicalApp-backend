'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user) {
  var payload = {
    sub: user._id,
    userName: user.userName,
    email: user.email,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };
  return jwt.encode(payload, secret);
};
