'use strict'

var validator = require('validator');

var Producto = require('../models/producto');
const Mercancia = require('../models/mercancia');
const Vendido = require('../models/vendido');

var controller = {
  save: (req,res) =>{
    var params = req.body;  
    var producto = new Producto();
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
    var descripcion = req.params.descripcion;
    var queryProducto = Producto.find({'modelo':{$regex:descripcion}},(err,productos)=>{
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
    console.log(noSerie);
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
    vendido.precioCompra= params.precioCompra
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
            console.log(mercanciaDeleted);
          });
        }
      });
      return res.status(201).send({
        status:"success",
        vendido
      });
    });
  }
};

module.exports = controller;