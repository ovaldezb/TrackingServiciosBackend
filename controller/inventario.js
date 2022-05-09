'use strict'

var validator = require('validator');
var Producto = require('../models/producto');
const Mercancia = require('../models/mercancia');
const Vendido = require('../models/vendido');
const Pendiente = require('../models/pendiente');
const Bodega = require('../models/bodega');
const { param } = require('../routes/servicios');

var controller = {
  save: (req,res) =>{
    var params = req.body;  
    var producto = new Producto();
    //no recuerdo para que se actualiza
    //solo debe buscar que exista
    //Producto.findOneAndUpdate({'_id':params._id},params,(err,productoSaved)=>{
    // ya me acorde para que se actualiza, para tener actaulizado el registro del Stock
    Producto.findOneAndUpdate({'_id':params._id},params,(err,productoSaved)=>{
      if(err===null && productoSaved){
        return res.status(200).send({
          status:"success",
          productoSaved
        });
      }else{
        producto.marca = params.marca;
        producto.modelo = params.modelo;
        producto.familia = params.familia;
        producto.noParte = params.noParte;
        producto.proveedor = params.proveedor;
        producto.url = params.url;
        producto.stock = params.stock;
        producto.save((err, productoSaved)=>{
          if(err || !productoSaved){
            return res.status(404).send({
                status:"error",
                message:"No se pudo guardar la mercancia "+err
            });
          }
          return res.status(200).send({
            status:"success",
            productoSaved
          });
        });
      }
    });
  },
  updateProducto:(req,res)=>{
    var params = req.body;
    Producto.findOneAndUpdate({'_id':params._id},params,(err,productSaved)=>{
      if(err || !productSaved){
        return res.status(400).send({
          status:"error",
          message:"No se pudo actualizar el producto"
        });
      }
      return res.status(200).send({
        status:"success",
        productSaved
      });
    });
  },
  saveMerca:(req,res)=>{
    var params = req.body;
    var mercancia = new Mercancia();
    mercancia.producto = params.producto;
    mercancia.estado = params.estado;
    mercancia.bodega = params.bodega;
    mercancia.serie = params.serie;
    mercancia.proveedor = params.proveedor;
    mercancia.proveedor = params.proveedor;
    mercancia.precioCompra = params.precioCompra;
    mercancia.precioDolares = params.precioDolares;
    mercancia.noFacturaCompra = params.noFacturaCompra;
    mercancia.fechaCompra = params.fechaCompra;
    mercancia.capturoEntrada = params.capturoEntrada;
    mercancia.save((err,mercanciaSaved)=>{
      if(err || !mercanciaSaved){
        return res.status(404).send({
          status:"error",
          message:"No se pudo guardar la mercancia"
        });
      }
        return res.status(201).send({
          status:"success",
          mercanciaSaved
        });
      
    });
  },
  updateMerca:(req,res)=>{
    var id = req.params.id;
    var params = req.body;
    Mercancia.findOneAndUpdate({'_id':id},params,(err,mercaSaved)=>{
      if(err || !mercaSaved){
        return res.status(400).send({
          status:"error",
          message:"No se pudo actualizar la merca"
        });
      }

      return res.status(200).send({
        status:"success",
        mercaSaved
      });
    });
  },
  findNoParte:(req,res)=>{
    var noParteFind = req.params.noParte;
    Producto.find({'noParte':noParteFind},(err,productoEncontrado)=>{
      if(err || productoEncontrado.length==0){
        return res.status(404).send({
          status:"error",
          message:"No se pudo encontrar el producto"
        });
      }else{
        let producto = productoEncontrado[0];
        return res.status(200).send({
          status:"success",
          producto
        });
      }
    });
  },
  getProductos:(req,res)=>{
    var productos = Producto.find({});
    productos.exec((err,productos)=>{
      return res.status(200).send({
        status:"success",
        productos
      });
    });
  },
  getByProductoFeatures:(req,res)=>{
    var filtro = req.params.filtro;
    var descripcion = req.query.descripcion;    
    var queryProducto;
    if(filtro === 'marca'){
      queryProducto = Producto.find({marca:{$regex:descripcion}});
    }else if(filtro === 'modelo'){
      queryProducto = Producto.find({modelo:{$regex:descripcion}});
    }else if(filtro === 'familia'){
      queryProducto = Producto.find({familia:{$regex:descripcion}});
    }else if(filtro === 'noParte'){
      queryProducto = Producto.find({noParte:{$regex:descripcion}});
    }
     queryProducto.exec((err,productos)=>{
      if(err!==null){
        return res.status(404).send({
          status:"error",
          message:"error al buscar mercancias por serie"
        });
      }
      return res.status(200).send({
        status:"success",
        productos
      });
    });
  },
  getByNoSerie:(req,res)=>{
    var noSerie = req.params.noSerie;
    var queryMercancia = Mercancia.find({'serie':{'$regex':noSerie}}).populate("producto");
    queryMercancia.exec((err,founds)=>{
      if(err!==null){
        return res.status(404).send({
          status:"error",
          message:"error al buscar mercancias por serie"
        });
      }
      return res.status(200).send({
        status:"success",
        founds
      });
    });
  },
  getByProductId:(req,res)=>{
    var productoId = req.params.id;
    Mercancia.find({'producto':productoId},(err,mercancias)=>{
      if(err!==null){
        return res.status(404).send({
          status:"error",
          message:"error al buscar mercancias por product id "+err
        });
      }
      return res.status(200).send({
        status:"success",
        mercancias
      });
    }).populate("producto");
  },
  saveVendido:(req,res)=>{
    var params = req.body;
    var vendido = new Vendido();
    vendido.producto = params.producto;
    vendido.estado = params.estado;
    vendido.bodega= params.bodega;
    vendido.serie= params.serie;
    vendido.precioCompra= params.precioCompra;
    vendido.precioDolares = params.precioDolares;
    vendido.fechaCompra= params.fechaCompra;
    vendido.capturoEntrada= params.capturoEntrada;
    vendido.capturoSalida= params.capturoSalida;
    vendido.precioVenta= params.precioVenta;
    //vendido.idEquipoVenta= params. 
    vendido.noFacturaCompra= params.noFacturaCompra;
    vendido.noFacturaVenta= params.noFacturaVenta;
    vendido.fechaVenta= params.fechaVenta;
    vendido.cliente= params.cliente;
    vendido.tiempoGarantia= params.tiempoGarantia;
    vendido.fechaVencimientoGarantia= params.fechaVencimientoGarantia;
    vendido.motivo= params.motivo;
    vendido.observaciones= params.observaciones;
    vendido.save((err,vendido)=>{
      if(err || !vendido){
        return res.status(400).send({
          status:"error",
          message:"Error al Guardar el vendido "+err
        });
      }
      Producto.findOneAndUpdate({'_id':params.producto._id},{'$inc':{'stock':-1}},{"new":true},(err,prodUpdated)=>{
        if(!err){
          Mercancia.findOneAndDelete({'_id':params._id},(err,mercanciaDeleted)=>{
            //console.log(mercanciaDeleted);
          });
        }
      });
      return res.status(201).send({
        status:"success",
        vendido
      });
    });
  },
  saveAjuste:(req,res)=>{
    var params = req.body;
    var vendido = new Vendido();
    vendido.producto = params.producto;
    vendido.estado = params.estado;
    vendido.bodega= params.bodega;
    vendido.serie= params.serie;
    vendido.precioCompra= params.precioCompra;
    vendido.precioDolares = params.precioDolares;
    vendido.fechaCompra= params.fechaCompra;
    vendido.capturoEntrada= params.capturoEntrada;
    vendido.capturoSalida= params.capturoSalida;
    vendido.precioVenta= params.precioVenta;
    //vendido.idEquipoVenta= params. 
    vendido.noFacturaCompra= params.noFacturaCompra;
    vendido.noFacturaVenta= params.noFacturaVenta;
    vendido.fechaVenta= params.fechaVenta;
    vendido.cliente= params.cliente;
    vendido.tiempoGarantia= params.tiempoGarantia;
    vendido.fechaVencimientoGarantia= params.fechaVencimientoGarantia;
    vendido.motivo= params.motivo;
    vendido.observaciones= params.observaciones;
    vendido.save((err,vendido)=>{
      if(err || !vendido){
        return res.status(400).send({
          status:"error",
          message:"Error al Guardar el vendido "+err
        });
      }
      Producto.findOneAndUpdate({'_id':params.producto._id},{'$inc':{'stock':1}},{"new":true},(err,prodUpdated)=>{
        if(err || !prodUpdated){
          return res.status(400).send({
            status:"error",
            message:"Error al Guardar el vendido "+err
          });
        } 
      });
      return res.status(201).send({
        status:"success",
        vendido
      });
    });
  },
  savePendiente:(req,res)=>{
    var params = req.body;
    var pendiente = new Pendiente();
    pendiente.producto = params.producto;
    pendiente.estado = params.estado;
    pendiente.bodega = params.bodega;
    pendiente.serie = params.serie;
    pendiente.precioCompra = params.precioCompra;
    pendiente.precioDolares = params.precioDolares;
    pendiente.fechaCompra = params.fechaCompra;
    pendiente.capturoEntrada = params.capturoEntrada;
    pendiente.capturoSalida = params.capturoSalida;
    pendiente.precioVenta = params.precioVenta;
    //pendiente.idEquipoVenta= params. 
    pendiente.noFacturaCompra = params.noFacturaCompra;
    pendiente.noFacturaVenta = params.noFacturaVenta;
    pendiente.fechaVenta = params.fechaVenta;
    pendiente.cliente = params.cliente;
    pendiente.tiempoGarantia = params.tiempoGarantia;
    pendiente.fechaVencimientoGarantia = params.fechaVencimientoGarantia;
    pendiente.motivo = params.motivo;
    pendiente.observaciones = params.observaciones;
    pendiente.save((err,pendiente)=>{
      if(err || !pendiente){
        return res.status(400).send({
          status:"error",
          message:"Error al Guardar el pendiente "+err
        });
      }
      Producto.findOneAndUpdate({'_id':params.producto._id},{'$inc':{'stock':-1}},{"new":true},(err,prodUpdated)=>{
        
      });
      return res.status(201).send({
        status:"success",
        pendiente
      });
    });
  },
  increasePendientes:(req,res)=>{
    var params = req.body;
    var pendiente = new Pendiente();
    var vendido = new Vendido();
    Pendiente.find({'producto':params.producto._id},(err,pendienteEncontrado)=>{
      if(!err && pendienteEncontrado.length > 0){
        pendiente = pendienteEncontrado[0];
        vendido.producto = pendiente.producto;
        vendido.estado = params.estado;
        vendido.bodega = params.bodega;
        vendido.serie = params.serie;
        vendido.precioCompra = params.precioCompra;
        vendido.precioDolares = params.precioDolares;
        vendido.fechaCompra = params.fechaCompra;
        vendido.capturoEntrada = params.capturoEntrada;
        vendido.capturoSalida = pendiente.capturoSalida;
        vendido.precioVenta = pendiente.precioVenta;
        vendido.noFacturaCompra = params.noFacturaCompra;
        vendido.noFacturaVenta = pendiente.noFacturaVenta;
        vendido.fechaVenta = pendiente.fechaVenta;
        vendido.cliente = pendiente.cliente;
        vendido.tiempoGarantia = pendiente.tiempoGarantia;
        vendido.fechaVencimientoGarantia = pendiente.fechaVencimientoGarantia;
        vendido.motivo = pendiente.motivo;
        vendido.observaciones = pendiente.observaciones; 
        vendido.save((err,vendidoSaved)=>{
          if(err || !vendidoSaved){
            return res.status(400).send({
              status:"error",
              message:"Error al mover de pendiente a vendido "+err
            });
          }
          console.log('va a borrar');
          //console.log(pendiente);
          Pendiente.deleteOne({'_id':pendiente._id},(err,deleted)=>{
            if(err || !deleted){
              return res.status(400).send({
                status:"error",
                message:"error al borrar el producto pendiente "+err 
              });
            }
            console.log('borro');
          });
        });
        return res.status(200).send({
          status:"success"
        });
      }else{
        //caso poco probable, que entre aqui por error
        return res.status(400).send({
          status:"error",
          message:"error, entro por equivocacion aqui"
        });
      }
    });
  },
  getVendido:(req,res)=>{
    Vendido.find({},(err,mercancias)=>{
      if(err || !mercancias){
        return res.status(400).send({
          status:"error",
          message:"Error al buscar mercancias"
        });
      }
      return res.status(200).send({
        status:"success",
        mercancias
      });
    }).populate("producto");
  },
  getVendidoByRangoFechas:(req,res)=>{
    const fecIni = new Date(req.query.fecIni);
    const fecFin = new Date(req.query.fecFin);
    var queryVendidos = null;
    if(req.query.fecIni !== 'null' && req.query.fecFin!=='null'){
      queryVendidos = Vendido.find({'fechaVenta':{$gte:new Date(fecIni.getFullYear(),fecIni.getMonth(),fecIni.getDate(),0,0,0),
        $lte:new Date(fecFin.getFullYear(),fecFin.getMonth(),fecFin.getDate(),23,59,59)}}).populate("producto");
    }else if(req.query.fecIni !== 'null'){
      queryVendidos = Vendido.find({'fechaVenta':{$gte:new Date(fecIni.getFullYear(),fecIni.getMonth(),fecIni.getDate(),0,0,0)}}).populate("producto");
    }else if(req.query.fecFin !== 'null'){
      queryVendidos = Vendido.find({'fechaVenta':{$lte:new Date(fecFin.getFullYear(),fecFin.getMonth(),fecFin.getDate(),23,59,59)}}).populate("producto");
    }
    queryVendidos.exec((err,mercancias)=>{
      if(err){
        return res.status(400).send({
          status:"error",
          message:"error al buscar por rango de fechas "+err
        });
      }
      return res.status(200).send({
        status:"success",
        mercancias
      });
    });
  },
  getBodegas:(req,res)=>{
    Bodega.find({},(err,bodegas)=>{
      if(err || !bodegas){
        return res.status(400).send({
          status:"error",
          message:"Error al buscar bodegas"
        });
      }
      return res.status(200).send({
        status:"success",
        bodegas
      });
    });
  },
  getMercanciaDisponible:(req,res)=>{
    Mercancia.find({},(err,mercancias)=>{
      if(err || !mercancias){
        return res.status(400).send({
          status:"error",
          message:"Error al buscar mercancias disponibles"
        });
      }
      return res.status(200).send({
        status:"success",
        mercancias
      });
    }).populate("producto");
  }
};

module.exports = controller;