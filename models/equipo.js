'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoSchema = Schema({
    id_servicio:String,
    marca:String,
    modelo:String,
    serie:String,
    costo:Number,
    tecnico:String,
    comentarios:String
});

module.exports = mongoose.model('Equipo',EquipoSchema);