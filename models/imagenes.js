'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImagenSchema = Schema({    
    nombreoriginal:String,    
    nombre:String,    
    id_equipo:String,
    tipo:Number
});

module.exports = mongoose.model('Imagen', ImagenSchema);