'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TecnicoSchema = Schema({
    nombre:String,
    apellido:String,
    telefono:String,
    correo:String,
    activo:Boolean,
    marca:String
});

module.exports = mongoose.model('Tecnico', TecnicoSchema);