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
var InventarioController = require('../controller/inventario');
var FamiliaController = require('../controller/familia');
var ClienteController = require('../controller/cliente');
var MigrateController = require('../controller/migrate');

var router = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./upload/equipos'});

router.get('/migracion',MigrateController.migrar);

router.post('/cliente',ClienteController.saveCliente);
router.get('/cliente/:nombre',ClienteController.getClientesByName);
router.get('/cliente/',ClienteController.getAllClientes);
router.put('/cliente/:clientId', ClienteController.updateUsuario);
router.delete('/cliente/:clientId', ClienteController.deleteClienteById);

router.post('/servicio',ServicioController.open);
router.get('/get-servicios',verifyToken,ServicioController.getServicios);
router.get('/servicio/:id',ServicioController.getServicio);
router.put('/servicio/:id',ServicioController.update);
router.put('/servudptng/:id',ServicioController.updateGuia);
router.get('/servabierto',ServicioController.getServNoEnv);

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

router.get('/familia',FamiliaController.getFamilias);
router.get('/marca',MarcaController.getMarcas);
//router.put('/marca/:id',MarcaController.updateMarca);

router.post('/imagen',ImagenController.save);
router.delete('/imagen/:id',ImagenController.delete);
router.delete('/imagen-name/:name',ImagenController.deletebyName);
router.get('/get-image/:image',ImagenController.getImage);
router.get('/imagenes/:id/:tipo',ImagenController.getImagesByEquipoId);
router.post('/img-pagtec/:id',ImagenController.createImagePagoTec);

router.get('/mensajeria',MensajeriaController.getMensajerias);

router.get('/reportehtml',verifyToken,ReporteController.reporteHTML);
router.get('/reportexls',verifyToken,ReporteController.reporteXLS);

router.post('/producto',InventarioController.save);
router.get('/producto',InventarioController.getProductos);
router.get('/producto/:noParte',InventarioController.findNoParte);
router.put('/producto',InventarioController.updateProducto);

router.get('/mercancia',InventarioController.getVendido);
router.get('/mercancia/rango',InventarioController.getVendidoByRangoFechas);
router.post('/mercancia',InventarioController.saveMerca);
router.put('/mercancia/:id',InventarioController.updateMerca);
router.get('/mercancia/:filtro',InventarioController.getByProductoFeatures);
router.get('/mercancia/producto/:id',InventarioController.getByProductId);
router.get('/disponible',InventarioController.getMercanciaDisponible);
router.post('/mercancia/vendido',InventarioController.saveVendido);

router.post('/pendiente',InventarioController.savePendiente);
router.post('/pendiente/increase',InventarioController.increasePendientes);

router.get('/bodegas',InventarioController.getBodegas);

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
