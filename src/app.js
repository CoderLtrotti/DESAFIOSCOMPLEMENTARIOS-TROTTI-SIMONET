import express from 'express';
import Contenedor from './Contenedor.js';
import productsRouter from './Routes/productsRouter.js';
import carritosRouter from './Routes/carritosRouter.js';
import Carrito from './carrito.js';
import { Router } from 'express';
import handlerbars from 'express-handlebars';
import { create } from 'express-handlebars';
import { Server } from 'socket.io';
import viewsRouter from './Routes/viewsRouter.js';
import __dirname from './utils.js';import mongoose from 'mongoose';
import ContenedorManager from './dao/ContenedorManager.js';
import CartManager from './dao/cartsManajer.js';
import MessageManager from './dao/messajeManager.js';
/*import CartManager from './dao/cartsmanager.js';
import MessageManager from './dao/messageManager.js';*/





const app = express();
const contenedor = new Contenedor('productos.json');
const productosContenedor = new Contenedor('productos.json');
const carritosContenedor = new Carrito('carritos.json');
const contenedorManager = new ContenedorManager('productos.json');
const cartManager = new CartManager('carritos.json');
const messageManager = new MessageManager();

 


app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  const products = await contenedor.getAll();
  res.json(products);
});

app.get('/productoRandom', async (req, res) => {
  const products = await contenedor.getAll();
  const randomIndex = Math.floor(Math.random() * products.length);
  res.json(products[randomIndex]);
});

app.post('/productos', async (req, res) => {
  const newProduct = req.body;
  const productId = await contenedor.save(newProduct);
  res.json({ id: productId });
});

app.delete('/productos/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const deleteResult = await contenedor.deleteById(productId);
  if (deleteResult === "Producto eliminado") {
    res.json({ message: "Producto eliminado" });
  } else {
    res.status(404).json({ error: "Error al eliminar el producto" });
  }
});



mongoose.connect('mongodb+srv://CoderLtrotti:TGtIEtoEcViniEQZ@codercluster.lbz1fl7.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });



// Ruta para obtener todos los productos utilizando ContenedorManager
app.get('/product', async (req, res) => {
  try {
    const products = await contenedorManager.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para agregar un producto utilizando ContenedorManager
app.post('/product', async (req, res) => {
  try {
    const testProducts = [
      {
        name: "Producto de prueba 1",
        price: 9.99,
        description: "Este es el primer producto de prueba.",
      },
      {
        name: "Producto de prueba 2",
        price: 14.99,
        description: "Este es el segundo producto de prueba.",
      },
      // Agrega más productos de prueba si es necesario
    ];

    for (const productData of testProducts) {
      await contenedorManager.addProduct(productData.name, productData.price, productData.description);
    }

    res.json({ message: 'Productos de prueba agregados exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para eliminar un producto utilizando ContenedorManager
app.delete('/product/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await contenedorManager.deleteProduct(productId);
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para crear un carrito 
app.post('/cart', async (req, res) => {
  const { productIds } = req.body; // Array de IDs de productos

  try {
    // Obtén los productos desde la base de datos usando el modelo Product
    const products = await Product.find({ _id: { $in: productIds } });

    // Crea un nuevo carrito con los productos
    const newCart = await cartManager.createCart(products);
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/cart/:id', async (req, res) => {
  const cartId = req.params.id;

  try {
    const cart = await cartManager.getCart(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.use('/api/productos', productsRouter);

// Rutas para los carritos
app.use('/api/carts', carritosRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de productos y carritos!');
});


app.get('/home', async (req, res) => {
  try {
    const products = await contenedor.getAll(); // Obtener todos los productos
    res.render('home', { products }); // Renderizar la vista y pasar los datos de los productos
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});




// Configurar la carpeta de vistas y el motor de plantillas
app.engine('handlebars', handlerbars.engine());
app.set('views', 'views/');
/*app.set('views', '../views/');*/ //ruta alternativa para utilizar con node app.js
app.set('view engine', 'handlebars');
const hbs = create({
defaultLayout: '',
runtimeOptions: {
  allowProtoPropertiesByDefault: true,
  allowProtoMethodsByDefault: true,
}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

  
messageManager.createMessage('Hola, este es un mensaje');
const allMessages = messageManager.getAllMessages();
console.log(allMessages);

//vistas 
app.get('/realtimeproducts', async (req, res) => {
  const products = await contenedor.getAll(); // Obtener los productos desde el contenedor
  res.render('realtimeproducts', { products }); // Pasar los productos a la vista
});

  app.get('/home', (req, res) => {
    res.render('home'); 
  });
//ruta para obtener las vistas del chat con metodo post y get 
  app.get('/chat', (req, res) => {
    res.render('chat'); //
  });
//metodo get del chat 
  app.get('/chat', async (req, res) => {
    try {
      const messages = await messageManager.getAllMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  //metodo post del chat 
  app.post('/chat', async (req, res) => {
    const { user, message } = req.body;
    
    try {
      const newMessage = await messageManager.createMessage(user, message);
      res.json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
// Usar el enrutador de vistas
app.use('/', viewsRouter);

const webServer = app.listen(8080, () => {
  console.log('Escuchando 8080');
});

// Inicialización de socket.io
const io = new Server(webServer);

io.on('connection', (socket) => {
  console.log('A user connected');


// Lógica para manejar mensajes de chat
socket.on('sendMessage', async (message) => {
  try {
    const { user, messageContent } = message; // Asegúrate de que estás recibiendo los valores correctamente
    const newMessage = await messageManager.createMessage(user, messageContent);
    io.emit('newMessage', newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
  }
});




  // Handle 'addProduct' event
  socket.on('addProduct', async (product) => {
    try {
      const productId = await contenedor.save(product);
      const newProduct = await contenedor.getById(productId);

      io.emit('newProduct', newProduct);
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      const deletedProduct = await productosContenedor.deleteById(productId);
      if (deletedProduct) {
        io.emit('productDeleted', productId);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  socket.on('deleteProduct', async (productId) => {
    try {
      const deletedProduct = await productosContenedor.deleteById(productId);
      if (deletedProduct) {
        io.emit('productDeleted', productId); // Emite el evento de eliminación
      }
    } catch (error) {
      console.error('Error:', error);
    }
  })
  // Ruta para eliminar productos


  // Handle 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

