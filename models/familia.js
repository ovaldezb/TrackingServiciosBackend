'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FamiliaSchema = Schema({
    value:String,    
    viewValue:String
});

module.exports = mongoose.model('Familia', FamiliaSchema);