'use strict'
var fs = require('fs');
var Imagen = require('../models/imagenes');
var path = require('path');

var controller = {  

    save:(req,res)=>{
        var params = req.body;
        var imagen = new Imagen();
        imagen.nombre = params.nombre;
        imagen.nombreoriginal = params.nombreoriginal;
        imagen.id_equipo = params.id_equipo;
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
        var query = Imagen.find({'id_equipo':equipoId});
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
    }

}

module.exports = controller;