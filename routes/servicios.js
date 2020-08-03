'use strict'

var express = require('express');

var ServicioController = require('../controller/servicio');
var TecnicoController = require('../controller/tecnico');
var EquipoController = require('../controller/equipo');
var FolioControler = require('../controller/folio');
var SendmailController = require('../controller/nodemailer');
var EtapasController = require('../controller/etapas');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/servicios'});


router.post('/servicio',ServicioController.open);
router.get('/get-servicios',ServicioController.getServicios);
router.get('/get-servicio/:id',ServicioController.getServicio);
router.put('/servicio/:id',ServicioController.update);

router.post('/tecnico',TecnicoController.save);
router.get('/tecnicos',TecnicoController.getTecnicos);
router.get('/tecnico/:id',TecnicoController.getTecnico);

router.post('/equipo',EquipoController.save);
router.get('/equipos/:id',EquipoController.getEquipos);
router.get('/equipo/:id',EquipoController.getEquipo);
router.put('/equipo/:id',EquipoController.updateEquipoByid);

router.get('/get-folio/:name',FolioControler.getNextValue);

router.post('/send-email',SendmailController.sendEmail);

router.get('/etapas',EtapasController.getetapas);

module.exports = router;
