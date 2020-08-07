'use strict'

var Mensajeria = require('../models/mensajeria');

var controller = {
    save:(req,res)=>{
        var params = req.body;
        var marca = new Marca();
        marca.nombre = params.nombre;
        marca.activo = params.activo;
        marca.save((err,mensajSaved)=>{
            if(err || !mensajSaved){
                return res.status(404).send({
                    status:"error",
                    message:"No se pudo guardar la marca"
                });
            }
            return res.status(201).send({
                status:"success",
                mensajSaved
            });
        });
    },

    getMensajerias:(req,res)=>{
        var query = Mensajeria.find();
        query.sort('_id').exec((err,mensajeria)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver las mensajerias "+err
                });
            }
            
            if(mensajeria.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay mensajerias"                    
                });
            }
            return res.status(200).send({
                status:"success",
                mensajeria
            });
        });
    },

    updateMarca:(req,res)=>{
        var mensajId = req.params.id;
        var params = req.body;
        Marca.findOneAndUpdate({"_id":mensajId},params,{"new":true},(err,mensajUpdated)=>{
            if(err || !mensajUpdated ){
                return res.status(400).send({
                    status:"error",
                    message:"No fue posible actualizar"
                });
            }
            return res.status(200).send({
                status:"success",
                mensajUpdated
            });
        });
    } 
};

module.exports = controller;