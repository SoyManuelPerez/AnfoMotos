const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
module.exports.Cookie = (req, res) => {
  if (!req.cookies.Anfomotos) {
    const token = jsonwebtoken.sign(
      {}, // Payload vacío, puedes agregar datos aquí si es necesario
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      path: "/"
    };
    res.cookie("Anfomotos", token, cookieOption);
  }

  const Cookie = req.cookies.Anfomotos;
  console.log(Cookie);
  res.render('index')
};
