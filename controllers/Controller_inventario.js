const Productos = require('../models/Productos')
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/img/Productos'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });
//Crear Producto
module.exports.Crear = async (req, res) => {
  upload.single('Imagen')(req, res, async function (err) {
    if (err) {
      return res.status(500).send("Error al subir la imagen.");
    }
    const { Producto, Precio, Cantidad, Tipo, Descripcion } = req.body;
    const Imagen = req.file ? req.file.filename : '';
    const newProducto = new Productos({
      Producto,
      Precio,
      Cantidad,
      Tipo,
      Imagen,
      Descripcion
    });

    try {
      await newProducto.save();
      res.redirect('/inventario');
    } catch (error) {
      res.status(500).send("Error al guardar el producto.");
    }
  });
};
//Eliminar Producto
module.exports.eliminar = (req,res) =>{
    const id = req.params.id
    Productos.findById({_id:id}).exec()
  .then(resultado => {
    const foto = resultado.Imagen
    const absolutePath = path.resolve(__dirname, '../public/img/Productos/',foto);
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
        return res.status(500).send('Error al eliminar el archivo.');
      }
    });
    Productos.findByIdAndDelete({_id:id}).exec()
    console.log("Objeto eliminado : ", resultado); 
  })
  .catch(error => {
    console.log(error) 
  });
    res.redirect('/inventario')       
}
//Editar Producto
module.exports.editar = (req,res) =>{
    const producto = req.body.ProductoE
    const Tipo = req.body.TipoE
    const Cantidad = req.body.CantidadE
    const Precio = req.body.PrecioE
    const Descripcion = req.body.DescripcionE
    console.log(Cantidad)
    Productos.findOneAndUpdate({Producto:producto.trim()},{Precio,Cantidad,Tipo,Descripcion}).exec()
    .then(resultado=>{
        console.log("Objeto Actualizado : ", resultado); 
    })
    .catch(error=>{
        console.log(error) 
    })
    res.redirect('/inventario')  
}
//Mostrar productos 
module.exports.mostrar = (req, res) => {
  Promise.all([
    Productos.find({Tipo: 'Llantas'}).then(result => result || []),
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Productos.find({Tipo: 'Aceites'}).then(result => result || []),
    Productos.find({Tipo: 'Repuestos'}).then(result => result || [])
  ])
  .then(([Llantas, Herramientas, Aceites, Repuestos]) => {
    res.render('catalogo', {
      Llantas: Llantas,
      Herramientas: Herramientas,
      Aceites: Aceites,
      Repuestos: Repuestos
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
};

//Mostrar en inventario
module.exports.mostrarInventario = (req, res) => {
  Promise.all([
    Productos.find({Tipo: 'Llantas'}).then(result => result || []),
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Productos.find({Tipo: 'Aceites'}).then(result => result || []),
    Productos.find({Tipo: 'Repuestos'}).then(result => result || [])
  ])
  .then(([Llantas, Herramientas, Aceites, Repuestos]) => {
    res.render('Inventario', {
      Llantas: Llantas,
      Herramientas: Herramientas,
      Aceites: Aceites,
      Repuestos: Repuestos
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
}
