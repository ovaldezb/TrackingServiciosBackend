'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Equipo = require('../models/equipo');
var Imagen = require('../models/imagenes');
var Servicio = require('../models/servicio');

var controller = {   

    save: (req,res) =>{
        //Recoger los parametros por post        
        var params = req.body;        
        var idServicio = req.params.id;
        // Validar datos
        try{
            var idServicioValid = !validator.isEmpty(idServicio);
        }catch(err){
            return res.status(400).send({
                status:"error",
                message:"Faltan datos"
            });
        }

        if(idServicioValid){
            var equipo = new Equipo();            
            equipo.marca = params.marca;
            equipo.modelo = params.modelo;
            equipo.serie = params.serie;
            equipo.costo = params.costo;
            equipo.tecnico = params.tecnico; 
            equipo.comentarios = params.comentarios;         
            equipo.diagnostico = params.diagnostico;  
            equipo.id_servicio = idServicio;
            equipo.folioequipo = params.folioequipo;
            var imagenes = params.imagenes;            
            equipo.save((err,equipoStored)=>{
                if(err || !equipoStored){
                    return res.status(404).send({
                        status:"error",
                        message:"No se pudo guardar el equipo "+err
                    });
                }
                
                /*for(var i=0;i<imagenes.length;i++){
                    var imagen = new Imagen();
                    imagen.id_equipo = equipoStored._id;
                    imagen.nombre = imagenes[i].nombre;
                    imagen.nombreoriginal = imagenes[i].nombreoriginal;
                    imagen.tipo = 0; 
                    imagen.save((err,imagenSaved)=>{                       
                        
                    });
                }*/

                Servicio.findOneAndUpdate({"_id":idServicio},{$push:{equipos:equipoStored._id}},{new:true,useFindAndModify:false},(err,serviceUpdate)=>{
                    if(err || !serviceUpdate){
                        return res.status(201).send({
                            status:"error",
                            message:"No se pudo actualizar el servicio con los equipos"
                        });
                    }else{
                        return res.status(201).send({
                            status:"success",
                            serviceUpdate
                        });
                    }
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
        var query = Equipo.find({'id_servicio':serviceId}).populate("tecnico");        
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
        var imagenes = params.imagenes;
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
    },
    createImagenbyEquipoId:(req,res)=>{
        var equipoId = req.params.id;
        var params = req.body;
        
        var imagen = new Imagen();
        imagen.id_equipo = equipoId;
        imagen.nombre = params.nombre;
        imagen.nombreoriginal = params.nombreoriginal;
        imagen.tipo = 0; 
        imagen.save((err,imagenSaved)=>{                       
            return res.status(200).send({
                status:"success",
                imagenSaved
            });
        });
    },
    upload:(req,res)=>{
        var file_name='Imagen no subida...';
        var originaFilename = req.files.file0.originalFilename;
        if(!req.files){
            return res.status(404).send({
                status:"error",
                message: file_name
            });
        }
        //Conseguir el nombre y la extensión
        var file_path = req.files.file0.path;      
        var file_split = file_path.split('\\');
        //nombre del archivo
        file_name = file_split[2];       
        //extension
        var extension = file_name.split('\.')[1];
        //comprobar la extension, sino es valida borar el archivo
        if(extension != 'png' && extension != 'jpg' && extension != 'JPG' && extension != 'jpeg' && extension != 'gif' ){
            //borrar el archivo
            fs.unlink(file_path,(err)=>{
                return res.status(404).send({
                    status:"error",
                    message:"La extension de la imagen no es válida"
                });
            });
        }else{                        
            var imagen = new Imagen();
            imagen.nombre = file_name;
            imagen.nombreoriginal = originaFilename;
            //imagen._id = "";
            imagen.id_equipo = "";
            return res.status(200).send({
                status:"success",
                imagen
            });
        }
    }
};

module.exports = controller;