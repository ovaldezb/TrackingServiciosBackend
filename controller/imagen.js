'use strict'
var fs = require('fs');
var Imagen = require('../models/imagenes');
var Servicio = require('../models/servicio');
var path = require('path');
const dir = './upload/equipos/';

var controller = {  

    save:(req,res)=>{
        var params = req.body;
        var imagen = new Imagen();
        imagen.nombre = params.nombre;
        imagen.nombreoriginal = params.nombreoriginal;
        imagen.id_equipo = params.id_equipo;
        imagen.tipo = params.tipo;
        imagen.save((err,imagenSaved)=>{
            if(err || !imagenSaved){
                return res.status(404).send({
                    status:"error",
                    message:"No se pudo guardar la imagen "+err
                });
            }
            return res.status(201).send({
                status:"success",
                imagenSaved
            });
        });
    },
    delete:(req,res)=>{
        var idImagen = req.params.id;
        Imagen.findByIdAndDelete({"_id":idImagen}).exec((err,imagenDeleted)=>{
            if(err || !imagenDeleted){
                return res.status(404).send({
                    status:"error",
                    message:"No se pudo borrar la imagen "+err
                });
            }  
            return res.status(201).send({
                status:"success",
                imagenDeleted
            });            
        });
    },
    deletebyName:(req,res)=>{
        var name = req.params.name;
        fs.stat(dir+name,(err,stats)=>{
            if(err){
                return res.status(400).send({
                    status:"error",
                    message:"Archivo no encontrado "+err
                });
            }
            fs.unlink(dir+name,err=>{
                if(err){
                    return res.status(400).send({
                        status:"error",
                        message:"Archivo no eliminado "+err
                    });
                }                
                return res.status(200).send({
                    status:"success",
                    message:"Archivo eliminado "
                });
                
            })
        })
    },
    getImage: (req,res) =>{
        var file = req.params.image;
        var path_file = './upload/equipos/'+file;        
        fs.exists(path_file,(exists)=>{            
            if(exists){
                return res.sendFile(path.resolve(path_file));                
            }else{
                return res.status(404).send({
                    status:"error",
                    message:'La imagen no existe'
                });
            }
        });
    },
    getImagesByEquipoId:(req,res)=>{
        var equipoId = req.params.id;
        var tipo = req.params.tipo;
        var query = Imagen.find({id_equipo:equipoId,tipo:tipo});
        query.sort('_id').exec((err,imagenes)=>{
            if(err || !imagenes){
                return res.status(404).send({
                    status:"error",
                    message:'no hay imagenes para el id'
                });
            }
            return res.status(200).send({
                status:"success",
                imagenes
            });
        });
    },
    createImagePagoTec:(req,res)=>{        
        var serviceId = req.params.id;
        var params = req.body;
        console.log(params);
        Servicio.findByIdAndUpdate(serviceId,{
            $push:{
                imgpagotecnico:{
                    nombre:params.nombre,
                    nombreoriginal:params.nombreoriginal
                }
            }
        },
        { new: true, useFindAndModify: false },(err,servicio)=>{
            if(err){
                return res.status(404).send({
                    status:"error",
                    message:'no se pudo insertar imagen'
                });
            }
            return res.status(200).send({
                status:"success",
                servicio
            });
        });
    }

}

module.exports = controller;