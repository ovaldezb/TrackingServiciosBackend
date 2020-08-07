'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeriaSchema = Schema({
    nombre:String,    
    activo:Boolean
});

module.exports = mongoose.model('Mensajeria', MensajeriaSchema);