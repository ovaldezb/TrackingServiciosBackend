'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Folio = require('../models/folio');

var controller = { 

    getNextValue:(req,res)=>{
        var id = req.params.name;
        try{
            var query = Folio.find({"_id":id});
            var valueExist = '';
            query.exec((err,idExiste)=>{
                valueExist = idExiste;
                if(valueExist != ''){
                    return res.status(201).send({
                        status:"success",
                        folio: pad(idExiste[0].sequence_value,7)
                    });
                }else{                
                    var folio1 = new Folio();
                    folio1._id = id;
                    folio1.sequence_value = 1;                    
                    folio1.save((err,folioStored)=>{                        
                        if(err || !folioStored){                            
                            return res.status(400).send({
                                status:"error",
                                message:"No se pudo guardar el folio "+id
                            });
                        }
                        return res.status(201).send({
                            status:"success",
                            folio: pad(folioStored.sequence_value,10)
                        });                      
                    });
                }
            });
        }catch(error){
            var folio = new Folio();
            folio._id = id;
            folio.sequence_value = 1;
            folio.save((err,folioStored)=>{
                if(err || !folioStored){
                    return res.status(400).send({
                        status:"error",
                        message:"No se pudo guardar el folio "+id
                        
                    });
                }
                return res.status(201).send({
                    status:"success",
                    folio:folioStored
                });
            });
            
        }
        
    }
};

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

module.exports = controller;