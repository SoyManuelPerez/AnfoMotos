const mongoose = require('mongoose')
const Llanta = new mongoose.Schema ({
    Producto: String,
    Imagen: String,
    Marca: String,
    Rin: String,
    Precio: Number,
    Descripcion: String,
})
module.exports = mongoose.model('Llantas', Llanta)