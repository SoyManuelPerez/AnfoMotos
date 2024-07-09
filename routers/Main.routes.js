const express = require('express')
const login = require('../controllers/Controller_Login')
const inventario = require('../controllers/Controller_inventario')
const Cart = require('../controllers/Controller_cart')
const router = express.Router()
router.get('/',Cart.Cookie,(req,res)=>{
    res.render('index')
})
router.get('/cart',Cart.mostrar,(req,res)=>{
    res.render('cart')
})
router.get('/catalogo',inventario.mostrar,(req,res)=>{
    res.render('catalogo')
})
router.get('/aceites',inventario.mostrarAceite,(req,res)=>{
    res.render('aceites')
})
router.get('/llantas',inventario.mostrarllantas,(req,res)=>{
    res.render('llantas')
})
router.get('/repuestos',inventario.mostrarRepuestos,(req,res)=>{
    res.render('repuestos')
})
router.get('/herramientas',inventario.mostrarHeramientas,(req,res)=>{
    res.render('herramientas')
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
router.get('/eliminarcart/:id',Cart.Eliminarcart,(req,res)=>{
    res.render('cart')
})
router.post('/Agregarcart/:id',Cart.Crear,(req,res)=>{
    res.render('cart')
})
router.post('/CrearProducto',inventario.Crear,(req,res)=>{
    res.render('inventario')})
router.post('/login',login.Login)

module.exports= router