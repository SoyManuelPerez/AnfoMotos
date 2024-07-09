const Productos = require('../models/Productos')
const Carrito = require('../models/cart');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const { exec } = require('child_process');
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
    const Imagen = req.file ? req.file.filename : '';
    const newProducto = new Productos({ Producto, Precio, Tipo, Imagen });
    
    try {
      await newProducto.save();
      // Llama a la función para actualizar Git
      updateGitRepo();
      res.redirect('/inventario');
    } catch (error) {
      res.status(500).send("Error al guardar el producto.");
      console.log(error);
    }
  });
};

// Función para ejecutar comandos de Git
function updateGitRepo() {
  // Configurar la identidad del usuario
  exec('git config --global user.email "Soy_ManuelPerez@outlook.com" && git config --global user.name "SoyManuelPerez"', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error configurando el usuario de Git: ${err.message}`);
      return;
    }
    console.log(`Configuración de usuario de Git: ${stdout}`);
    // Configurar el repositorio remoto
    exec('git remote add origin https://github.com/SoyManuelPerez/AnfoMotos', (err, stdout, stderr) => {
      if (err && !stderr.includes("remote origin already exists")) {
        console.error(`Error configurando el repositorio remoto: ${err.message}`);
        return;
      }
      console.log(`Configuración del repositorio remoto: ${stdout}`);
      // Comandos de Git para agregar, hacer commit y empujar los cambios
      const gitCommands = `
        git add .
        git commit -m "Actualización automática: nuevo producto agregado"
        git push origin main
      `;

      exec(gitCommands, (err, stdout, stderr) => {
        if (err) {
          console.error(`Error al ejecutar comandos de Git: ${err.message}`);
          return;
        }
        console.log(`Git output: ${stdout}`);
        console.error(`Git error: ${stderr}`);
      });
    });
  });
}
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
  const Cart = req.cookies.Anfomotos;
  Promise.all([
    Productos.find({Tipo: 'Llantas'}).then(result => result || []),
    Productos.find({Tipo: 'Aceites'}).then(result => result || []),
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Productos.find({Tipo: 'Repuestos'}).then(result => result || []),
    Carrito.find({Cart: Cart}).then(result => result || [])
  ])
  .then(([Llantas,Aceites, Herramientas,  Repuestos,Cart]) => {
    res.render('catalogo', {
      Llantas: Llantas,
      Aceites: Aceites,
      Herramientas: Herramientas,
      Repuestos: Repuestos,
      Cart:Cart
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
};
module.exports.mostrarllantas = (req, res) => {
  const Cart = req.cookies.Anfomotos;
  Promise.all([
    Productos.find({Tipo: 'Llantas'}).then(result => result || []),
    Carrito.find({Cart: Cart}).then(result => result || [])
  ])
  .then(([Llantas,Cart]) => {
    res.render('llantas', {
      Llantas: Llantas,
      Cart:Cart
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
};
module.exports.mostrarAceite = (req, res) => {
  const Cart = req.cookies.Anfomotos;
  Promise.all([
    Productos.find({Tipo: 'Aceites'}).then(result => result || []),
    Carrito.find({Cart: Cart}).then(result => result || [])
  ])
.then(([Aceites,Cart]) => {
  res.render('aceites', {
    Aceites: Aceites,
    Cart:Cart
  });
})
.catch(err => {
  console.error('Error mostrando datos', err);
  res.status(500).send('Error mostrando datos');
});
};
module.exports.mostrarRepuestos = (req, res) => {
  const Cart = req.cookies.Anfomotos;
  Promise.all([
    Productos.find({Tipo: 'Repuestos'}).then(result => result || []),
    Carrito.find({Cart: Cart}).then(result => result || [])
  ])
  .then(([Repuestos,Cart]) => {
    res.render('repuestos', {
      Repuestos: Repuestos,
      Cart:Cart
    });
  })
  .catch(err => {
    console.error('Error mostrando datos', err);
    res.status(500).send('Error mostrando datos');
  });
};
module.exports.mostrarHeramientas = (req, res) => {
  const Cart = req.cookies.Anfomotos;
  Promise.all([
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Carrito.find({Cart: Cart}).then(result => result || [])
  ])
  .then(([Herramientas, Cart]) => {
    res.render('herramientas', {
      Herramientas: Herramientas,
      Cart:Cart
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
    Productos.find({Tipo: 'Aceites'}).then(result => result || []),
    Productos.find({Tipo: 'Herramientas'}).then(result => result || []),
    Productos.find({Tipo: 'Repuestos'}).then(result => result || [])
  ])
  .then(([Llantas,Aceites, Herramientas,  Repuestos]) => {
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
