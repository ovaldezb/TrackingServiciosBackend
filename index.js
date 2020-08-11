'use strict'

var mongoose = require('mongoose');
var app = require('./app');

var port = 3899;
mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tdmservicios',{useNewUrlParser: true})
.then(() =>{
    console.log('Se ha creado la conexión a la base de datos del mandona');
    app.listen(port,()=>{
        console.log('Servidor corriendo en http://localhost:'+port);
    });
    

}).catch(err=>{
    console.log(err);
});

