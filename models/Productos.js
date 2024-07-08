const mongoose = require('mongoose')
const Producto = new mongoose.Schema ({
    Producto: String,
    Imagen: String,
    Precio: Number,
    Tipo: String,
    Descripcion: String,
})
module.exports = mongoose.model('Productos', Producto)