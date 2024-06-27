const mongoose = require('mongoose')
const Usuario = new mongoose.Schema ({
    user: String,
    password: String
})
module.exports = mongoose.model('Usuario', Usuario)