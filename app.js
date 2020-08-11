'use strict'

//Cargar Módulos de node para crear el servidor
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//Ejecutar express (http)
var app = express();
// cargar ficheros
var service_routes = require('./routes/servicios');
//Middleware (se ejecuta antes de la ruta de la aplicacion)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS
app.use(cors());
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//Añadir prefijo a la ruta / cargar rutas
app.use('/api',service_routes);

module.exports = app;