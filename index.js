'use scrict';

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect(
  'mongodb+srv://gvillar:musical@cluster0-zpffx.mongodb.net/musicalApp?retryWrites=true',
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log('Conectado!');
      app.listen(port, function() {
        console.log('Server listening in http://localhost:' + port);
      });
    }
  }
);
