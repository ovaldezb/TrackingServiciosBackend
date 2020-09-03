'use strict'
const SECRET_KEY = '752146398l@654308#%!|';
var express = require('express');
const jwt = require('jsonwebtoken');

var ServicioController = require('../controller/servicio');
var TecnicoController = require('../controller/tecnico');
var EquipoController = require('../controller/equipo');
var FolioControler = require('../controller/folio');
var SendmailController = require('../controller/nodemailer');
var EtapasController = require('../controller/etapas');
var MarcaController = require('../controller/marca');
var ImagenController = require('../controller/imagen');
var MensajeriaController = require('../controller/mensajeria');
var ReporteController = require('../controller/reportes');

var router = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/equipos'});
var sess;

router.post('/servicio',ServicioController.open);
router.get('/get-servicios',verifyToken,ServicioController.getServicios);
router.get('/servicio/:id',ServicioController.getServicio);
router.put('/servicio/:id',ServicioController.update);

router.post('/tecnico',TecnicoController.save);
router.get('/tecnico/:filtro',TecnicoController.getTecnicos);
router.get('/tecnico-by/:usuario',TecnicoController.getTecnico);
router.put('/tecnico/:id',TecnicoController.updateTecnico);

router.post('/login',TecnicoController.loginUser);

router.post('/equipo/:id',EquipoController.save);
router.get('/equipos/:id',EquipoController.getEquipos);
router.get('/equipo/:id',EquipoController.getEquipo);
router.put('/equipo/:id',EquipoController.updateEquipoByid);
router.post('/upload-img/',md_upload,EquipoController.upload);
router.post('/equipo-imagen/:id',EquipoController.createImagenbyEquipoId);

router.get('/get-folio/:name',FolioControler.getNextValue);

router.post('/email-inicial',SendmailController.sendEmailInicial);
router.post('/email-final',SendmailController.sendEmailFinal);

router.get('/etapas',EtapasController.getetapas);

router.post('/marca',MarcaController.save);
router.get('/marca',MarcaController.getMarcas);
router.put('/marca/:id',MarcaController.updateMarca);

router.post('/imagen',ImagenController.save);
router.delete('/imagen/:id',ImagenController.delete);
router.delete('/imagen-name/:name',ImagenController.deletebyName);
router.get('/get-image/:image',ImagenController.getImage);
router.get('/imagenes/:id/:tipo',ImagenController.getImagesByEquipoId);
router.post('/img-pagtec/:id',ImagenController.createImagePagoTec);


router.get('/mensajeria',MensajeriaController.getMensajerias);

router.get('/reportehtml',verifyToken,ReporteController.reporteHTML);
router.get('/reportexls',verifyToken,ReporteController.reporteXLS);

router.get('/',(req,res)=>{
    console.log(req);
    sess = req.session;
    if(sess.user) {
        return res.redirect('/home');
    }
});

async function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
		let token = req.headers.authorization.split(' ')[1];
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
		}

		const payload = await jwt.verify(token, SECRET_KEY);
		if (!payload) {
			return res.status(401).send('Unauhtorized Request');
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		console.log(e)
		return res.status(401).send('Unauhtorized Request');
	}
}

module.exports = router;
