'use strict';

var express = require('express');
var EventController = require('../controllers/event');
var multiparty = require('connect-multiparty');

var api = express.Router();

api.get('/probando-controlador', EventController.pruebas);

module.exports = api;
