'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarcaSchema = Schema({
    value:String,    
    viewValue:String
});

module.exports = mongoose.model('Marca', MarcaSchema);