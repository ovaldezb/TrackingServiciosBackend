'use strict'

var Etapas = require('../models/etapas');

var controller = {  

    getetapas: (req,res) =>{
        var query  = Etapas.find();
        query.sort('_id').exec((err,etapas)=>{
            if(err){
                return res.status(500).send({
                    status:"Error",
                    message: "Error al devolver los equipos "+err
                });
            }
            
            if(etapas.length==0){
                return res.status(404).send({
                    status:"Error",
                    message: "No Hay etapas"                    
                });
            }
            return res.status(200).send({
                status:"success",
                etapas
            });
        });
    }

}

module.exports = controller;