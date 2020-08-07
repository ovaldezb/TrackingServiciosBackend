'use strict'

const nodemailer = require('nodemailer');
var Equipo = require('../models/equipo');

var transporter = nodemailer.createTransport({            
  host: "smtp.tdm.mx",            
  port: 587,
  secure: false ,
  auth: {
    type : 'login',
    user: "reparaciones@tdm.mx",
    pass: "Marcio123"
  },
  ignoreTLS: true,
  tls: {
   // do not fail on invalid certs
   rejectUnauthorized: false
  },
  name : 'OmarVB',            
  debug : true
});

var controller = {    
    sendEmailInicial: (req,res) =>{
      var params = req.body;
      Equipo.find({'id_servicio':params._id}).exec((err,equipoFound)=>{
        if(err || !equipoFound){
          console.log(err);
          return res.status(400).send({
            status:"error",
            message:"No es posible encontrar el equipo del servicio "+params.folio
          }); 
        }
        console.log(equipoFound);        
        const message = {            
          from: 'reparaciones@tdm.mx', // List of recipients
          to: params.correo,
          subject: 'TDM - Folio de reparación '+params.folio, // Subject line
          html: '<p>Estimado(a): <strong>'+params.cliente+'</strong></p>'+
              '<p>Gracias por confiar en TDM para la reparaci&oacute;n de su equipo, el equipo ser&aacute; analizado y regresaremos con usted una vez que tengamos el diagnóstico y costo de la reparaci&oacute;n en un lapso de 2 a 3 semanas.</p>'+
              '<p>El equipo que nos confi&oacute; es el siguiente:</p>'+
              '<table style="border-collapse: collapse; width: 100%;" border="0">'+
              ' <tbody>'+
              '   <tr>'+
              '     <td colspan="2" align="center">'+
              '       <table style="border-collapse: collapse; width: 50%;" height="42" border="1">'+
              '         <tbody>'+
              '           <tr>'+
              '             <td style="width: 20%; text-align: right;">Marca:</td>'+
              '             <td style="width: 80%; text-align: center;"><strong>'+equipoFound[0].marca+'</strong></td>'+
              '           </tr>'+
              '           <tr>'+
              '             <td style="width: 20%; text-align: right;">Modelo:</td>'+
              '             <td style="width: 80%; text-align: center;"><strong>'+equipoFound[0].modelo+'</strong></td>'+
              '           </tr>'+
              '           <tr>'+
              '             <td style="width: 20%; text-align: right;">No Serie:</td>'+
              '             <td style="width: 80%; text-align: center;"><strong>'+equipoFound[0].serie+'</strong></td>'+
              '           </tr>'+
              '         </tbody>'+
              '       </table>'+
              '     </td>'+
              '   </tr>'+
              '   <tr><td colspan="2">&nbsp;</td></tr>'+
              '   <tr>'+
              '     <td colspan="2">'+
              '       <h3 style="text-align: center;">El folio de su servicio es:</h3>'+
              '       </td>'+
              '   </tr>'+
              '   <tr>'+
              '     <td style="width: 50%;" colspan="2">'+
              '       <h3 style="text-align: center;"><span style="background-color: #ffffff; color: #3366ff;">'+params.folio+'</span><span style="background-color: #ffffff; color: #000000;"></span></h3>'+
              '     </td>'+
              '   </tr>'+
              ' </tbody>'+
              '</table>'+
              '<p></p>'+
              '<p><span style="background-color: #ffffff; color: #000000;">Por favor conserve este n&uacute;mero hasta que reciba su equipo, si tiene cualquier duda o aclaraci&oacute;n use dicho n&uacute;mero como referencia.</span></p>'+
              '<p><span style="background-color: #ffffff; color: #000000;">Gracias por su preferencia.</span></p>'+
              '<hr/>'+
              '<p>TDM Premium<br />WTC Piso 18, Oficina 2<br />(800) 161 4656, (55) 8116-0192 y 93 <br /> <a href="mailto:contacto@tdm.mx">contacto@tdm.mx</a></p>'+
              '<hr/>'
            };    
          transporter.sendMail(message)
            .then(info=>{
              return res.status(200).send({
                status:"success",
                message:info
              }); 
            })
            .catch(err=>{
              return res.status(400).send({
                status:"error",
                message:"No fue posible enviar el correo "+err
              }); 
            });    
          transporter.close();
      });     
    },
    sendEmailFinal:(req,res)=>{
      var params = req.body;
      Equipo.find({'id_servicio':params._id}).exec((err,equipoFound)=>{
        if(err || !equipoFound){
          console.log(err);
          return res.status(400).send({
            status:"error",
            message:"No es posible encontrar el equipo del servicio "+params.folio
          }); 
        }
        console.log(equipoFound);        
        const message = {            
          from: 'reparaciones@tdm.mx', // List of recipients
          to: params.correo,
          subject: 'TDM - Equipo listo para entrega - Folio '+params.folio, // Subject line
          html: '<p>Estimado(a): <strong>'+params.cliente+'</strong></p>'+
              '<p>Nos complace informarle que TDM tiene listo su equipo para entreg&aacute;rselo</p>'+
              '<p>El equipo a ser entregado es el siguiente:</p>'+
              '<table style="border-collapse: collapse; width: 100%;" border="0">'+
              ' <tbody>'+
              '   <tr>'+
              '     <td colspan="2" align="center">'+
              '       <table style="border-collapse: collapse; width: 50%;" height="42" border="1">'+
              '         <tbody>'+
              '           <tr>'+
              '             <td style="width: 20%; text-align: right;">Marca:</td>'+
              '             <td style="width: 80%; text-align: center;"><strong>'+equipoFound[0].marca+'</strong></td>'+
              '           </tr>'+
              '           <tr>'+
              '             <td style="width: 20%; text-align: right;">Modelo:</td>'+
              '             <td style="width: 80%; text-align: center;"><strong>'+equipoFound[0].modelo+'</strong></td>'+
              '           </tr>'+
              '           <tr>'+
              '             <td style="width: 20%; text-align: right;">No Serie:</td>'+
              '             <td style="width: 80%; text-align: center;"><strong>'+equipoFound[0].serie+'</strong></td>'+
              '           </tr>'+
              '         </tbody>'+
              '       </table>'+
              '     </td>'+
              '   </tr>'+
              '   <tr><td colspan="2">&nbsp;</td></tr>'+
              '   <tr>'+
              '     <td colspan="2">'+
              '       <h3 style="text-align: center;">El folio de su servicio es:</h3>'+
              '       </td>'+
              '   </tr>'+
              '   <tr>'+
              '     <td style="width: 50%;" colspan="2">'+
              '       <h3 style="text-align: center;"><span style="background-color: #ffffff; color: #3366ff;">'+params.folio+'</span><span style="background-color: #ffffff; color: #000000;"></span></h3>'+
              '     </td>'+
              '   </tr>'+
              ' </tbody>'+
              '</table>'+
              '<p></p>'+
              '<p><span style="background-color: #ffffff; color: #000000;">Puede pasar a recogerlo a nuestras oficinas a partir de este momento</span></p>'+
              '<p><span style="background-color: #ffffff; color: #000000;">Gracias por su preferencia.</span></p>'+
              '<hr/>'+
              '<p>TDM Premium<br />WTC Piso 18, Oficina 2<br />(800) 161 4656, (55) 8116-0192 y 93 <br /> <a href="mailto:contacto@tdm.mx">contacto@tdm.mx</a></p>'+
              '<hr/>'
            };    
          transporter.sendMail(message)
            .then(info=>{
              return res.status(200).send({
                status:"success",
                message:info
              }); 
            })
            .catch(err=>{
              return res.status(400).send({
                status:"error",
                message:"No fue posible enviar el correo "+err
              }); 
            });    
          transporter.close();
      });
    }

}

module.exports = controller;
