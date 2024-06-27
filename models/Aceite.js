const mongoose = require('mongoose')
const Aceite = new mongoose.Schema ({
    Aceite: String,
    Imagen: String,
    Marca: String,
    Tipo: String,
    Viscosidad: String,
    Precio: Number,
    Cantidad: Number,
    Descripcion: String,
})
module.exports = mongoose.model('Aceites', Aceite)