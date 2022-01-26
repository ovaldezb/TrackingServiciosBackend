'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Producto = require('../models/producto');
const Mercancia = require('../models/mercancia');

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


  }
};

module.exports = controller;