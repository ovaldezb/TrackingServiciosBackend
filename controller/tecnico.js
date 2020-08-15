'use strict'

var validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '752146398l@654308#%!|';
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
            tecnico.rol = params.rol;
            tecnico.password = bcrypt.hashSync(params.password);
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
        var filtroId = req.params.filtro;        
        
        var query;
        if(filtroId=='true'){
            query = Tecnico.find({activo:true});             
        }else{
            query = Tecnico.find({}); 
        }
        
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
        var usuario = req.params.usuario;
        if(!usuario || usuario==null){
            return res.status(404).send({
                status:"error",
                message:"no hay id del tecnico"
            });
        }

        Tecnico.findOne({clave:usuario},(err,tecnico)=>{
            if(err || !tecnico){
                return res.status(203).send({
                    status:"error",
                    message:"No Existe el tecnico"
                });
            }
            return res.status(202).send({
                status:"success",
                tecnico
            });
        });
    },
    updateTecnico:(req,res)=>{
        var tecnicoId = req.params.id;
        var params = req.body;
        params.password = bcrypt.hashSync(req.body.password);        
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
    },
    loginUser : (req, res) => {
        const userData = {
          clave: req.body.clave,
          password: req.body.password
        }         
        Tecnico.findOne({ clave: userData.clave,activo:true }, (err, user) => {
          if (err) {
            return res.status(500).send({message:"Algo salio mal",error:err});         
          }
          // email does not exist
          if (!user) {            
            res.status(409).send({ status:'error', message: 'Something is wrong' });
          } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
              const expiresIn = 12 * 60 * 60;
              const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });      
              const dataUser = {
                name: user.nombre,
                apellido: user.apeliido,                
                accessToken: accessToken,
                expiresIn: expiresIn,
                rol: user.rol,
                clave:userData.clave
              }
              res.status(200).send({ dataUser });
            } else {
              // password wrong
              res.status(409).send({ message: 'Something is wrong' });
            }
          }
        });
      }
};

module.exports = controller;