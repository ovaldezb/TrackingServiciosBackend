'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MercanciaSchema = Schema({
    producto:{
        type: Schema.Types.ObjectId,
        ref: "Producto"
    },
    estado:String,
    bodega:String,
    serie:String,
    precioCompra:Number,
    precioDolares:Number,
    fechaCompra:Date,
    capturoEntrada:String,
    capturoSalida:String,
    precioVenta:Number,
    idEquipoVenta:Number, //Esto para cuando sea parte de un Equipo
    noFacturaCompra:String,
    noFacturaVenta:String,
    fechaVenta:Date,
    cliente:String,
    tiempoGarantia:Number,
    fechaVencimientoGarantia:Date,
    motivo:String,
    observaciones:String
});

module.exports = mongoose.model('Mercancia', MercanciaSchema);