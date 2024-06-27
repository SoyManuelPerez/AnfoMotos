const mongoose = require('mongoose')
const Producto = new mongoose.Schema ({
    Producto: String,
    Imagen: String,
    Precio: Number,
    Marca: String,
    Cantidad: Number,
    Tipo: String,
    Descripcion: String,
})
module.exports = mongoose.model('Productos', Producto)