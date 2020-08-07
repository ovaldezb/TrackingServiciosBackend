'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Tecnico = require('../models/tecnico');

var controller = {

    save:(req,res)=>{
        var params = req.body;
        try{
            var valida_nombre = !validator.isEmpty(params.nombre);

        }catch(err){
            return res.status(400).send({
                status:"error",
                message:"Faltan datos"+err
            });

        }

        if(valida_nombre){
            var tecnico = new Tecnico();
            tecnico.nombre = params.nombre;
            tecnico.apellido = params.apellido;
            tecnico.telefono = params.telefono;
            tecnico.correo = params.correo;
            tecnico.activo = params.activo;
            tecnico.marca = params.marca;
            tecnico.clave = params.clave;
            tecnico.save((err,tecnicoStored)=>{
                if(err || !tecnicoStored){
                    return res.status(404).send({
                        status:"error",
                        message:"No se pudo guardar el Tecnico "+err
                    });
                }
                return res.status(201).send({
                    status:"success",
                    tecnico:tecnicoStored
                });
            });
        }
    },

    getTecnicos:(req,res)=>{
        var query = Tecnico.find({});

        query.sort('_id').exec((err,tecnicos)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver los tecnicos "+err
                });
            }
            if(tecnicos.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay Tecnicos"                    
                });
            }
            return res.status(200).send({
                status:"success",
                tecnicos
            });
        });
    },

    getTecnico:(req,res)=>{
        var tecnicoId = req.params.id;
        if(!tecnicoId || tecnicoId==null){
            return res.status(404).send({
                status:"error",
                message:"no hay id del tecnico"
            });
        }

        Tecnico.findById(tecnicoId,(err,tecnico)=>{
            if(err || !tecnico){
                return res.status(404).send({
                    status:"error",
                    message:"No Existe el tecnico"
                });
            }
            return res.status(200).send({
                status:"success",
                tecnico
            });
        });
    },
    updateTecnico:(req,res)=>{
        var tecnicoId = req.params.id;
        var params = req.body;
        Tecnico.findOneAndUpdate({"_id":tecnicoId},params,{"new":true},(err,tecnicoUpdated)=>{
            if(err || !tecnicoUpdated ){
                return res.status(400).send({
                    status:"error",
                    message:"No fue posible actualizar"
                });
            }
            return res.status(200).send({
                status:"success",
                tecnicoUpdated
            });
        });
    }
};

module.exports = controller;