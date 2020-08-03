'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Servicio = require('../models/servicio');

var controller = {
    

    open: (req,res) =>{
        //Recoger los parametros por post
        var params = req.body;
        // Validar datos
        try{
            var valida_nombre = !validator.isEmpty(params.cliente);
        }catch(err){
            return res.status(400).send({
                status:"error",
                message:"Faltan datos"
            });
        }

        if(valida_nombre){
            var servicio = new Servicio();
            servicio.cliente = params.cliente;
            servicio.receptor = params.receptor;
            servicio.folio = params.folio;
            servicio.telefono = params.telefono;
            servicio.correo = params.correo;
            servicio.costorevision = params.costorevision;
            servicio.esgarantia = params.esgarantia;            
            servicio.estatus = params.estatus;
            servicio.numeroguia = params.numeroguia;
            servicio.costotecnico = params.costotecnico;
            servicio.diagnostico = params.diagnostico;
            servicio.costoenvio = params.costoenvio;
            servicio.cliautoriza = params.cliautoriza;
            servicio.pagoanticipotecnico = params.pagoanticipotecnico;
            servicio.condregreso = params.condregreso;
            servicio.costocliente = params.costocliente;
            servicio.etapa = params.etapa;
            servicio.puedereparar = params.puedereparar;
            servicio.tecrecequ = params.tecrecequ;
            servicio.equipoprobado = params.equipoprobado;

            servicio.save((err,serviceStored)=>{
                if(err || !serviceStored){
                    return res.status(404).send({
                        status:"error",
                        message:"No se pudo guardar el servicio "+err
                    });
                }
                return res.status(201).send({
                    status:"success",
                    servicio:serviceStored
                });
            });
        }else{
            return res.status(400).send({
                status:"error",
                message: "Los datos no son válidos"
            });
        }
    },

    update:(req,res)=>{
        var serviceId = req.params.id;
        var params = req.body;
        Servicio.findOneAndUpdate({"_id":serviceId},params,{"new":true},(err,serviceUpdate)=>{
            if(err || !serviceUpdate ){
                return res.status(400).send({
                    status:"error",
                    message:"No fue posible actualizar"
                });
            }
            return res.status(200).send({
                status:"success",
                serviceUpdate
            });
        });
    },

    getServicios:(req,res)=>{
        var query = Servicio.find({});
        var last = req.params.last;
        if(last || last!=undefined){
            query.limit(5);
        }

        query.sort('_id').exec((err,servicios)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver los servicios "+err
                });
            }
            
            if(servicios.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay servicios"                    
                });
            }
            return res.status(200).send({
                status:"success",
                servicios
            });
        });
    },

    getServicio:(req,res)=>{
        var serviceId = req.params.id;
        if(!serviceId || serviceId==null){
            return res.status(404).send({
                status:"error",
                message:"no hay id del servicio"
            });
        }

        Servicio.findById(serviceId,(err,servicio)=>{
            if(err || !servicio){
                return res.status(404).send({
                    status:"error",
                    message:"No Existe el servicio"
                });
            }
            return res.status(200).send({
                status:"success",
                servicio
            });
        });

    }
};

module.exports = controller;