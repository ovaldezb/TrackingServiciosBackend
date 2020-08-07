'use strict'

//Cargar Módulos de node para crear el servidor
var express = require('express');
//var session = require('express-session');
var bodyParser = require('body-parser');

//Ejecutar express (http)
var app = express();
// cargar ficheros
var service_routes = require('./routes/servicios');
//Middleware (se ejecuta antes de la ruta de la aplicacion)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
//app.use(express.static(__dirname + '/views'));
//Añadir prefijo a la ruta / cargar rutas
app.use('/api',service_routes);
//Manejo de sesion
/*app.use(session({
    secret: "cookie_secret",
    name: "cookie_name",
    //store: "sessionStore", // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.get('/',function(req,res){
	console.log('Session');
	sess=req.session;
	console.log(sess);
});*/
module.exports = app;