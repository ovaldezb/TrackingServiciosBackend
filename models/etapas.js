'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EtapasSchema = Schema({    
    nombre:String,
    id:Number
});

module.exports = mongoose.model('Etapas',EtapasSchema);