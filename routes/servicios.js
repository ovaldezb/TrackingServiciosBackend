'use strict'

var express = require('express');

var ServicioController = require('../controller/servicio');
var TecnicoController = require('../controller/tecnico');
var EquipoController = require('../controller/equipo');
var FolioControler = require('../controller/folio');
var SendmailController = require('../controller/nodemailer');
var EtapasController = require('../controller/etapas');
var MarcaController = require('../controller/marca');
var ImagenController = require('../controller/imagen');
var MensajeriaController = require('../controller/mensajeria');

var router = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/equipos'});
var sess;

router.post('/servicio',ServicioController.open);
router.get('/get-servicios',ServicioController.getServicios);
router.get('/get-servicio/:id',ServicioController.getServicio);
router.put('/servicio/:id',ServicioController.update);

router.post('/tecnico',TecnicoController.save);
router.get('/tecnico',TecnicoController.getTecnicos);
router.put('/tecnico/:id',TecnicoController.updateTecnico);

router.post('/equipo',EquipoController.save);
router.get('/equipos/:id',EquipoController.getEquipos);
router.get('/equipo/:id',EquipoController.getEquipo);
router.put('/equipo/:id',EquipoController.updateEquipoByid);
router.post('/upload-img/',md_upload,EquipoController.upload);

router.get('/get-folio/:name',FolioControler.getNextValue);

router.post('/email-inicial',SendmailController.sendEmailInicial);
router.post('/email-final',SendmailController.sendEmailFinal);

router.get('/etapas',EtapasController.getetapas);

router.post('/marca',MarcaController.save);
router.get('/marca',MarcaController.getMarcas);
router.put('/marca/:id',MarcaController.updateMarca);

router.post('/imagen',ImagenController.save);
router.delete('/imagen/:id',ImagenController.delete);
router.get('/get-image/:image',ImagenController.getImage);
router.get('/imagenes/:id',ImagenController.getImagesByEquipoId);

router.get('/mensajeria',MensajeriaController.getMensajerias);

router.get('/',(req,res)=>{
    console.log(req);
    sess = req.session;
    if(sess.user) {
        return res.redirect('/home');
    }
});

module.exports = router;
