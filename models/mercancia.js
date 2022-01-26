'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MercanciaSchema = Schema({
    producto:{
        type: Schema.Types.ObjectId,
        ref: "Producto"
    },
    estado:String,
    serie:String,
    proveedor:String,
    precioCompra:Number,
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
    FechaVencimientoGarantia:Date,
    observaciones:String
});

module.exports = mongoose.model('Mercancia', MercanciaSchema);