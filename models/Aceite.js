const mongoose = require('mongoose')
const Aceite = new mongoose.Schema ({
    Producto: String,
    Imagen: String,
    Marca: String,
    Tipo: String,
    Viscosidad: String,
    Precio: Number,
    Descripcion: String,
})
module.exports = mongoose.model('Aceites', Aceite)