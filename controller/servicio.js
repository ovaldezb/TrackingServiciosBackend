'use strict'

var validator = require('validator');

var Servicio = require('../models/servicio');
const Folio = require('../models/folio');
//const Cliente = require('../models/cliente');

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
            servicio.clienteId = params.clienteId;
            servicio.receptor = params.receptor;
            servicio.folio = params.folio;
            servicio.cliente = params.cliente;
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
            servicio.mensajeria = params.mensajeria;
            servicio.fechaactualizacion = params.fechaactualizacion;
            servicio.save((err,serviceStored)=>{
                if(err || !serviceStored){
                    return res.status(404).send({
                        status:"error",
                        message:"No se pudo guardar el servicio "+err
                    });
                }
                /* Se incrementa en 1 el folio cuando se inserta el servicio */
                const filter = { _id: 'folio' };
                const update = {$inc:{sequence_value:1}};
                Folio.findOneAndUpdate(filter,update,{new:true},(err,folioUpdated)=>{
                    return res.status(201).send({
                        status:"success",
                        servicio:serviceStored
                    });
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
                    message:"No fue posible actualizar "+err
                });
            }
            return res.status(200).send({
                status:"success",
                serviceUpdate
            });
        });
    },
    getServicios:(req,res)=>{        
        var query = Servicio.find({ etapa: { $lt: 9 } }).populate("equipos").populate('clienteId');
        var last = req.params.last;
        if(last || last!=undefined){
            query.limit(5);
        }

        query.sort({fechaIngreso:-1}).exec((err,servicios)=>{
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
        
        var query = Servicio.findById(serviceId).populate("equipos").populate("clienteId");
        query.exec((err,servicio)=>{
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
    },
    updateGuia:(req,res)=>{
        var servicioId = req.params.id;
        var params = req.body;
        Servicio.findByIdAndUpdate({_id:servicioId},params,(err,servUpdt)=>{
            if(err || !servUpdt){
                return res.status(404).send({
                    status:"error",
                    message:"No Existe el servicio"
                });
            }
            return res.status(200).send({
                status:"success",
                servUpdt
            });
        });
    },

    getServNoEnv:(req,res)=>{        
        var query = Servicio.find({ etapa: { $eq: 0 } });
        query.sort({fechaIngreso:-1}).exec((err,servicios)=>{
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
    }
};

module.exports = controller;