const express = require('express')
const login = require('../controllers/Controller_Login')
const inventario = require('../controllers/Controller_inventario')
const router = express.Router()
router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/catalogo',inventario.mostrar,(req,res)=>{
    res.render('catalogo')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/nosotros',(req,res)=>{
    res.render('nosotros')
})
router.get('/inventario',inventario.mostrarInventario,(req,res)=>{
    res.render('inventario')
})
router.get('/EliminarInvetario/:id',inventario.eliminar,(req,res)=>{
    res.render('inventario')
})
router.post('/CrearProducto',inventario.Crear,(req,res)=>{
    res.render('inventario')})
router.post('/login',login.Login)
module.exports= router