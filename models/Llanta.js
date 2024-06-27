const mongoose = require('mongoose')
const Llanta = new mongoose.Schema ({
    Llanta: String,
    Imagen: String,
    Marca: String,
    Rin: String,
    Precio: Number,
    Cantidad: Number,
    Descripcion: String,
})
module.exports = mongoose.model('Llantas', Llanta)