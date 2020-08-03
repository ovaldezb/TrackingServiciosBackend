'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FolioSchema = Schema({    
    _id: String,
    sequence_value:Number    
});

module.exports = mongoose.model('Folio',FolioSchema);