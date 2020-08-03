'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Equipo = require('../models/equipo');

var controller = {   

    save: (req,res) =>{
        //Recoger los parametros por post        
        var params = req.body;
        // Validar datos
        try{
            var id_servicio = !validator.isEmpty(params.id_servicio);
        }catch(err){
            return res.status(400).send({
                status:"error",
                message:"Faltan datos"
            });
        }

        if(id_servicio){
            var equipo = new Equipo();
            equipo.id_servicio = params.id_servicio;
            equipo.marca = params.marca;
            equipo.modelo = params.modelo;
            equipo.serie = params.serie;
            equipo.costo = params.costo;
            equipo.tecnico = params.tecnico; 
            equipo.comentarios = params.comentarios;           

            equipo.save((err,equipoStored)=>{
                if(err || !equipoStored){
                    return res.status(404).send({
                        status:"error",
                        message:"No se pudo guardar el equipo "+err
                    });
                }
                return res.status(201).send({
                    status:"success",
                    servicio:equipoStored
                });
            });
        }else{
            return res.status(400).send({
                status:"error",
                message: "Los datos no son válidos"
            });
        }
    },

    getEquipos:(req,res)=>{
        var serviceId = req.params.id;
        var query = Equipo.find({'id_servicio':serviceId});        

        query.sort('_id').exec((err,equipos)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver los equipos "+err
                });
            }
            
            if(equipos.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay equipos"                    
                });
            }
            return res.status(200).send({
                status:"success",
                equipos
            });
        });
    },

    getEquipo:(req,res)=>{
        var equipoId = req.params.id;
        if(!equipoId || equipoId==null){
            return res.status(404).send({
                status:"error",
                message:"no hay id del equipo"
            });
        }

        Equipo.findById(equipoId,(err,equipo)=>{
            if(err || !equipo){
                return res.status(404).send({
                    status:"error",
                    message:"No Existe el equipo"
                });
            }
            return res.status(200).send({
                status:"success",
                equipo
            });
        });

    },

    updateEquipoByid:(req,res)=>{
        var equipoId = req.params.id;
        var params = req.body;        
        Equipo.findOneAndUpdate({"_id":equipoId},params,{"new":true},(err,equipoUpdate)=>{
            if(err || !equipoUpdate ){
                return res.status(400).send({
                    status:"error",
                    message:"No fue posible actualizar"
                });
            }
            return res.status(200).send({
                status:"success",
                equipoUpdate
            });
        });
    }
};

module.exports = controller;