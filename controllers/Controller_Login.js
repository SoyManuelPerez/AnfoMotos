const jsonwebtoken = require('jsonwebtoken')
const Usuario = require('../models/Usuario')
const dotenv = require('dotenv')
dotenv.config();
//Verificar Usuario
module.exports.Login = (req, res) => {
  const user = req.body.user;
  const password = req.body.password;
  if (!user || !password) {
    return res.status(400).send({ status: "Error", message: "Los campos están incompletos" })
  }
  Usuario.findOne({ user: user }).lean().exec()
    .then(usuario => {
      if (password !== usuario.password) {
        return res.status(400).send({ status: "Error", message: "Erro Contraseña" })
      }
      const token = jsonwebtoken.sign(
        { user: usuario.user },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION });

      const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/"
      }
      res.cookie("jwt", token, cookieOption);
      res.send({ status: "ok", message: "Usuario loggeado", redirect: "/inventario" });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/login')
    });

}