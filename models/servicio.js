'use strict'

var mongoose = require('mongoose');
var Imagen = require('./imagenes');
var Schema = mongoose.Schema;

var ServicioSchema = Schema({    
    folio: String,
    fechaIngreso:{type: Date, default: Date.now},
    receptor:String,
    clienteId:{
        type: Schema.Types.ObjectId,
        ref: "Cliente"
      },
    cliente:String,
    telefono:String,
    correo:String,        
    esgarantia:Boolean,
    numeroguia:String,
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
    tecrecequ: Boolean,
    mensajeria: String,
    fechaactualizacion: Date,
    equipos:[{
        type:Schema.Types.ObjectId,
        ref:"Equipo"
    }],
    linkpago:String,
    pagofinal:Number,
    metodopago:String,
    imgpagotecnico:[]
});

module.exports = mongoose.model('Servicio',ServicioSchema);