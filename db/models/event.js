'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = Schema({
  name: String,
  image: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Event', EventSchema);
