
const Usuario = require('../models/Usuario')
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
      res.send({ status: "ok", message: "Usuario loggeado", redirect: "/inventario" });
    })
    .catch(err => {
      console.error(err);
      res.redirect('/login')
    });

}