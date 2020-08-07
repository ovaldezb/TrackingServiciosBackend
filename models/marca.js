'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarcaSchema = Schema({
    nombre:String,    
    activo:Boolean
});

module.exports = mongoose.model('Marca', MarcaSchema);