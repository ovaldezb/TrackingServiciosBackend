'use strict'

var Familia = require('../models/familia');

var controller = {
    getFamilias:(req,res)=>{
        var query = Familia.find();
        query.exec((err,familias)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver las marcas "+err
                });
            }
            
            if(familias.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay marcas"                    
                });
            }
            return res.status(200).send({
                status:"success",
                familias
            });
        });
    } 
};

module.exports = controller;