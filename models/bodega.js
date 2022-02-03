'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BodegaSchema = Schema({    
    value:String,
    viewValue:String
});

module.exports = mongoose.model('Bodega',BodegaSchema);