'use strict'
var Servicio = require('../models/servicio');
var Cliente = require('../models/cliente');

var controller = {
  migrar: (req,res)=>{
    
    var query = Servicio.find();
    query.exec(async (err,servicios)=>{
      
      for(var i=0;i<servicios.length;i++){
        var clienteFound = await Cliente.find({nombre:servicios[i].cliente});
        if(clienteFound.length===0){
          var cliente = new Cliente();
          cliente.nombre = servicios[i].cliente;
          cliente.correo = servicios[i].correo;
          cliente.telefono = servicios[i].telefono;
          var clienteInsertado = await cliente.save();
          await Servicio.updateOne({_id:servicios[i]._id},{"clienteId":clienteInsertado},{"multi":true});
        }else{
          await Servicio.updateOne({_id:servicios[i]._id},{"clienteId":clienteFound[0]},{"multi":true});
        }
      }
    });
    
    return res.status(200).send({
      status:"success",
      message: "Migracion"
  });
  }
}

module.exports = controller;