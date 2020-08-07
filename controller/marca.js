'use strict'

var Marca = require('../models/marca');

var controller = {
    save:(req,res)=>{
        var params = req.body;
        var marca = new Marca();
        marca.nombre = params.nombre;
        marca.activo = params.activo;
        marca.save((err,marcaSaved)=>{
            if(err || !marcaSaved){
                return res.status(404).send({
                    status:"error",
                    message:"No se pudo guardar la marca"
                });
            }
            return res.status(201).send({
                status:"success",
                marcaSaved
            });
        });
    },

    getMarcas:(req,res)=>{
        var query = Marca.find();
        query.sort('_id').exec((err,marcas)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver las marcas "+err
                });
            }
            
            if(marcas.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay marcas"                    
                });
            }
            return res.status(200).send({
                status:"success",
                marcas
            });
        });
    },

    updateMarca:(req,res)=>{
        var marcaId = req.params.id;
        var params = req.body;
        Marca.findOneAndUpdate({"_id":marcaId},params,{"new":true},(err,marcaUpdated)=>{
            if(err || !marcaUpdated ){
                return res.status(400).send({
                    status:"error",
                    message:"No fue posible actualizar"
                });
            }
            return res.status(200).send({
                status:"success",
                marcaUpdated
            });
        });
    } 
};

module.exports = controller;