'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
  id: String,
  nombre:String,
  correo: String,
  telefono: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);