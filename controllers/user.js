'use strict';

var User = require('../db/models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function saveUser(req, res) {
  var user = new User();
  var params = req.body;

  user.userName = params.userName;
  user.email = params.email;

  if (params.password) {
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if (user.userName != null && user.email != null) {
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: 'Error saving the user' });
          } else {
            if (!userStored) {
              res.status(404).send({ message: 'User not registered' });
            } else {
              res.status(200).send({ user: userStored });
            }
          }
        });
      } else {
        res.status(200).send({ message: 'You must fill all fields' });
      }
    });
  } else {
    res.status(200).send({ message: 'Please, enter a password' });
  }
}

function loginUser(req, res) {
  var params = req.body;
  var userName = params.userName;
  var password = params.password;

  User.findOne({ userName: userName }, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error in request' });
    } else {
      if (!user) {
        res.status(404).send({ message: 'The user does not exist' });
      } else {
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            if (params.gethash) {
              res.status(200).send({
                token: jwt.createToken(user)
              });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res.status(404).send({ message: 'The user could not login' });
          }
        });
      }
    }
  });
}

module.exports = {
  saveUser,
  loginUser
};
