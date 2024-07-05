const Productos = require('../models/Productos')
const Aceite = require('../models/Aceite')
const Llanta = require('../models/Llanta')
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
    const Producto = req.body.Producto;
    const Precio = req.body.Precio;
    const Tipo = req.body.Tipo;
    const Descripcion = req.body.Descripcion;
    const Marca = req.body.Marca
    let newProducto
    const Imagen = req.file ? req.file.filename : '';
    if(Tipo == "Llantas"){
      const Rin = req.body.Rin
       newProducto = new Llanta({
        Producto,
        Rin,
        Precio,
        Tipo,
        Marca,
        Imagen,
        Descripcion
      });
    }else if (Tipo == "Aceites"){
      const TipoAceite =req.body.TipoAceite;
      const Viscosidad = req.body.Viscosidad
       newProducto = new Aceite({
        Producto,
        TipoAceite,
        Viscosidad,
        Marca,
        Precio,
        Tipo,
        Marca,
        Imagen,
        Descripcion
      });
    }
   else if (Tipo == "Herramienta" || Tipo == "Repuestos" ){
       newProducto = new Productos({
        Producto,
        Precio,
        Tipo,
        Marca,
        Imagen,
        Descripcion
      });
    }
    try {
      await newProducto.save();
      res.redirect('/inventario');
    } catch (error) {
      res.status(500).send("Error al guardar el producto.");
      console.log(error)
    }
  });
};
//Eliminar Producto
module.exports.eliminarllanta = (req,res) =>{
    const id = req.params.id
    Llanta.findById({_id:id}).exec()
  .then(resultado => {
    const foto = resultado.Imagen
    const absolutePath = path.resolve(__dirname, '../public/img/Productos/',foto);
    fs.unlink(absolutePath, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo:', err);
        return res.status(500).send('Error al eliminar el archivo.');
      }
    });
    Llanta.findByIdAndDelete({_id:id}).exec()
    console.log("Objeto eliminado : ", resultado); 
  })
  .catch(error => {
    console.log(error) 
  });
    res.redirect('/inventario')       
}
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
    Llanta.find().then(result => result || []),
    Aceite.find({Tipo: 'Aceites'}).then(result => result || []),
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Productos.find({Tipo: 'Repuestos'}).then(result => result || [])
  ])
  .then(([Llantas,Aceites, Herramientas,  Repuestos]) => {
    res.render('catalogo', {
      Llantas: Llantas,
      Aceites: Aceites,
      Herramientas: Herramientas,
      Repuestos: Repuestos
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
};
module.exports.mostrarllantas = (req, res) => {
    Llanta.find().then(result => result || [])
  .then((result) => {
    res.render('llantas', {
      Llantas: result
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
};
module.exports.mostrarAceite = (req, res) => {
  Aceite.find().then(result => result || [])
.then((result) => {
  res.render('aceites', {
    Aceites: result
  });
})
.catch(err => {
  console.error('Error mostrando datos', err);
  res.status(500).send('Error mostrando datos');
});
};
module.exports.mostrarRepuestos = (req, res) => {
  Productos.find({Tipo: 'Repuestos'}).then(result => result || [])
.then((result) => {
  res.render('repuestos', {
    Repuestos: result
  });
})
.catch(err => {
  console.error('Error mostrando datos', err);
  res.status(500).send('Error mostrando datos');
});
};
module.exports.mostrarHeramientas = (req, res) => {
  Productos.find({Tipo: 'Herramientas'}).then(result => result || [])
.then((result) => {
  res.render('herramientas', {
    Herramientas: result
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
    Llanta.find().then(result => result || []),
    Aceite.find().then(result => result || []),
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Productos.find({Tipo: 'Repuestos'}).then(result => result || [])
  ])
  .then(([Llantas, Herramientas, Aceites, Repuestos]) => {
    res.render('inventario', {
      Llantas: Llantas,
      Aceites: Aceites,
      Herramientas: Herramientas,
      Repuestos: Repuestos
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
}
