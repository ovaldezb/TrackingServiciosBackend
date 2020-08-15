'use strict'

var excel = require('excel4node');
var fs = require('fs');
var path = require('path');

var Servicio = require('../models/servicio');
var Equipo = require('../models/equipo');
var Etapa  = require('../models/etapas');

var controller = { 
     reporteHTML:(req,res)=>{        
        var query = Servicio.find().populate("equipos");
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
    reporteXLS:(req,res)=>{
        var fileName = 'Excel.xlsx';
        fs.exists('./excel/'+fileName, (err,exists) =>{
            if(err){
                fs.unlink('./excel/'+fileName,(err,res)=>{
                    
                });                    
            }
        });      
        Etapa.find().sort().exec((err,etapas)=>{                
                var query = Servicio.find().populate("equipos");
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
                var i=1; 
                var k=1;           
                var workbook = new excel.Workbook();
                var worksheet = workbook.addWorksheet('Sheet 1');
                var styleHeader = workbook.createStyle({
                    font: {
                    color: '#FF0800',
                    size: 12                   
                    } ,
                    fill:{
                        type:'pattern',
                        bgColor:'#293ef7'
                    }                   
                });
                var styleNumber = workbook.createStyle({                
                    numberFormat: '$#,##0.00; ($#,##0.00); -'
                });
                var styleDate = workbook.createStyle({                
                    dateFormat: 'm/d/yyyy hh:mm:ss'
                });
                
                worksheet.cell(i,k++).string('Folio').style(styleHeader);
                worksheet.cell(i,k++).string('Abierto').style(styleHeader);
                worksheet.cell(i,k++).string('Cliente').style(styleHeader);
                worksheet.cell(i,k++).string('Teléfono').style(styleHeader);
                worksheet.cell(i,k++).string('Correo').style(styleHeader);
                worksheet.cell(i,k++).string('Marca').style(styleHeader);
                worksheet.cell(i,k++).string('Modelo').style(styleHeader);
                worksheet.cell(i,k++).string('Serie').style(styleHeader);
                worksheet.cell(i,k++).string('Costo Estimado').style(styleHeader);
                worksheet.cell(i,k++).string('Comentarios').style(styleHeader);
                worksheet.cell(i,k++).string('Diagnóstico').style(styleHeader);
                worksheet.cell(i,k++).string('Garantía').style(styleHeader);
                worksheet.cell(i,k++).string('Mensajeria').style(styleHeader);;
                worksheet.cell(i,k++).string('Número de Guía').style(styleHeader);;
                worksheet.cell(i,k++).string('Cliente Autoriza').style(styleHeader);;
                worksheet.cell(i,k++).string('Costo de Revisión').style(styleHeader);;
                worksheet.cell(i,k++).string('Costo del Técnico').style(styleHeader);;
                worksheet.cell(i,k++).string('Diagnostico').style(styleHeader);;
                worksheet.cell(i,k++).string('Costo al Cliente').style(styleHeader);;
                worksheet.cell(i,k++).string('Costo de Envio').style(styleHeader);;
                worksheet.cell(i,k++).string('Anticipo al Técnico').style(styleHeader);;
                worksheet.cell(i,k++).string('Equipo Probado').style(styleHeader);;
                worksheet.cell(i,k++).string('Estatus').style(styleHeader);;
                worksheet.cell(i,k++).string('Cond Regreso').style(styleHeader);;
                worksheet.cell(i,k++).string('Pago Final').style(styleHeader);;
                worksheet.cell(i,k++).string('Método de Pago').style(styleHeader);; 
                
                i=2;
                servicios.forEach(servicio =>{        
                    k=1;        
                    worksheet.cell(i,k++).string(servicio.folio);
                    worksheet.cell(i,k++).date(new Date(servicio.fechaIngreso)).style(styleDate);
                    worksheet.cell(i,k++).string(servicio.cliente);
                    worksheet.cell(i,k++).string(servicio.telefono);
                    worksheet.cell(i,k++).string(servicio.correo);
                    worksheet.cell(i,k++).string(servicio.equipos[0].marca);
                    worksheet.cell(i,k++).string(servicio.equipos[0].modelo);
                    worksheet.cell(i,k++).string(servicio.equipos[0].serie);
                    worksheet.cell(i,k++).number(servicio.equipos[0].costo).style(styleNumber);
                    worksheet.cell(i,k++).string(servicio.equipos[0].comentarios);
                    worksheet.cell(i,k++).string(servicio.equipos[0].diagnostico);
                    worksheet.cell(i,k++).string(servicio.esgarantia?'Si':'No');
                    worksheet.cell(i,k++).string(servicio.mensajeria);
                    worksheet.cell(i,k++).string(servicio.numeroguia);
                    worksheet.cell(i,k++).string(servicio.cliautoriza?'Si':'No');
                    worksheet.cell(i,k++).number(servicio.costorevision==undefined ? 0:servicio.costorevision).style(styleNumber);
                    worksheet.cell(i,k++).number(servicio.costotecnico==undefined ? 0:servicio.costorevision).style(styleNumber);
                    worksheet.cell(i,k++).string(servicio.diagnostico);
                    worksheet.cell(i,k++).number(servicio.costocliente==undefined ? 0:servicio.costocliente).style(styleNumber);
                    worksheet.cell(i,k++).number(servicio.costoenvio==undefined ? 0:servicio.costoenvio).style(styleNumber);
                    worksheet.cell(i,k++).number(servicio.pagoanticipotecnico==undefined ? 0:servicio.pagoanticipotecnico).style(styleNumber);
                    worksheet.cell(i,k++).string(servicio.equipoprobado?'Si':'No');                    
                    worksheet.cell(i,k++).string(etapas[servicio.etapa].nombre);                                
                    worksheet.cell(i,k++).string(servicio.condregreso);                           
                    worksheet.cell(i,k++).number(servicio.pagofinal==undefined ? 0:servicio.pagofinal).style(styleNumber);
                    worksheet.cell(i,k++).string(servicio.metodopago);                
                    i++;
                });
                workbook.write('./excel/'+fileName,(err,fileCreated)=>{                
                    res.download('./excel/'+fileName);
                });            
            });
        });
    }
  }

module.exports = controller;