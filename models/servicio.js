'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ServicioSchema = Schema({
    folio: String,
    fechaIngreso:{type: Date, default: Date.now},
    receptor:String,
    cliente:String,
    telefono:String,
    correo:String,    
    tecnico:String,
    esgarantia:Boolean,
    numeroguia:Number,
    cliautoriza:Boolean,
    costorevision:Number,
    costotecnico:Number,
    diagnostico:String,
    costocliente:Number,
    costoenvio:Number,    
    pagoanticipotecnico:Number,
    equipoprobado:Boolean,
    avisoclientelisto:Boolean,
    clientepago:Boolean,
    tecnicopago:Boolean,
    firmarecibido:Boolean,
    fechaultimaact:Date,
    estatus:String,
    notas:String,
    condregreso:String,
    etapa:Number,
    puedereparar:Boolean,
    tecrecequ: Boolean
});

module.exports = mongoose.model('Servicio',ServicioSchema);