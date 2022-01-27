'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    id:String,
    marca:String,    
    modelo:String,
    familia:String,
    noParte:String,
    url:String,
    proveedor:String,
    stock:Number,

});

module.exports = mongoose.model('Producto', ProductoSchema);