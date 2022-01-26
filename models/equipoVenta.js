'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovimientoMercanciaSchema = Schema({
    mercancia:[{
      type: Schema.Types.ObjectId,
        ref: "Mercancia"
    }],
    costoTotal:Number,
    fechaVenta:Date,
    precioVenta:Number,
    vendedor:String,
    cliente:String,
    facturaVenta:String,
    tiempoGarantia:Number,
    fechaVencimientoGarantia:Date,
    observaciones:String
});

module.exports = mongoose.model('MovimientoMercancia', MovimientoMercanciaSchema);