'use strict'

const Cliente = require('../models/cliente');

var controller = {
    saveCliente:(req,res) =>{
      var params = req.body;
      var cliente = new Cliente();
      cliente.nombre = params.nombre.toUpperCase();
      cliente.telefono = params.telefono;
      cliente.correo = params.correo;
      cliente.save((err, clienteSaved)=>{
        if(err || !clienteSaved){
          return res.status(400).send({
            status:"error",
            message:"No se pudo guardar el cliente"
          });
        }
        return res.status(201).send({
          status:"success",
          clienteSaved
        });
      });
    },
    getAllClientes:(req,res) =>{
      var query = Cliente.find();
      query.exec((err, listaClientes)=>{
        if(err){
          return res.status(500).send({
            status:"Error",
            message: "Error al devolver los clientes "+err
          });
        }
        if(listaClientes.length==0){
          return res.status(404).send({
            status:"Error",
            message: "No Hay clientes"                    
          });
        }
        return res.status(200).send({
          status:"success",
          listaClientes
        });
      });
    },
    getClientesByName:(req,res) =>{
      var nombre = req.params.nombre
      var query = Cliente.find({'nombre':{$regex:nombre}})
      query.exec((err,listaClientes)=>{
        if(err){
          return res.status(500).send({
            status:"Error",
            message: "Error al devolver los clientes "+err
          });
        }
        if(listaClientes.length==0){
          return res.status(404).send({
            status:"Error",
            message: "No Hay clientes"                    
          });
        }
        return res.status(200).send({
          status:"success",
          listaClientes
        });
      });
    },
    updateUsuario:(req,res)=>{
      var clientId = req.params.clientId;
      var params = req.body;
      Cliente.findOneAndUpdate({"_id":clientId}, params, {"new":true},(err,ClienteUpdated)=>{
        if(err || !ClienteUpdated){
          return res.status(400).send({
            status:"error",
            message:"No fue posible actualizar al cliente"
          });
        }
        return res.status(200).send({
          status:"success",
          ClienteUpdated
      });
      });
    },
    deleteClienteById:(req,res)=>{
      var clientId = req.param.clientId;
      console.log("DeleteId: "+clientId);
      Cliente.deleteOne({'_id':clientId},(err,clienteDeleted)=>{
        if(err || !clienteDeleted){
          return res.status(400).send({
            status:"error",
            message:"No fue posible borrar al cliente "+err + " client:"+clienteDeleted
          });
        }
        return res.status(200).send({
          status:"success",
          clienteDeleted
      });
      });
    }
}

module.exports = controller;