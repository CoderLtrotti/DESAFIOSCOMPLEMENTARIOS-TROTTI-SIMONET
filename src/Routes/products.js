import { Router } from 'express';
import ProductsController from '../controllers/products.controllers.js';
import getProducts from '../dao/productspaginacion.js';

const Productrouter = Router();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operaciones relacionadas con productos
 */

/**
 * @swagger
 * /api1/products:
 *   get:
 *     summary: Obtener todos los productos.
 *     description: Retorna todos los productos disponibles.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             example:
 *               message: Lista de productos obtenida con éxito.
 *               data:
 *                 products: [...]
 */

/**
 * @swagger
 * /api1/products/{id}:
 *   get:
 *     summary: Obtener un producto por ID.
 *     description: Retorna un producto según su ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             example:
 *               message: Producto obtenido con éxito.
 *               data:
 *                 product: {...}
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Producto no encontrado.
 */

/**
 * @swagger
 * /api1/products:
 *   post:
 *     summary: Crear un nuevo producto.
 *     description: Crea un nuevo producto.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "Nuevo Producto"
 *             price: 10.99
 *     responses:
 *       201:
 *         description: Producto creado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Producto creado con éxito.
 *               data:
 *                 product: {...}
 *       400:
 *         description: Datos de producto no válidos.
 *         content:
 *           application/json:
 *             example:
 *               error: Datos de producto no válidos.
 */

// Define las rutas utilizando las funciones de la clase ProductsController
Productrouter.get('/', async (req, res) => {
  await ProductsController.getAllProducts(req, res).catch((error) => ProductsController.handleError(res, error));
});

Productrouter.get('/:id', async (req, res) => {
  await ProductsController.getProductById(req, res).catch((error) => ProductsController.handleError(res, error));
});

Productrouter.post('/', async (req, res) => {
  await ProductsController.createProduct(req, res).catch((error) => ProductsController.handleError(res, error));
});

Productrouter.put('/:id', async (req, res) => {
  await ProductsController.updateProduct(req, res).catch((error) => ProductsController.handleError(res, error));
});

Productrouter.delete('/:id', async (req, res) => {
  await ProductsController.deleteProduct(req, res).catch((error) => ProductsController.handleError(res, error));
});

Productrouter.get('/', getProducts);

export default Productrouter;

/*import ContenedorManager from '../dao/ContenedorManager.js';
import { Router } from 'express';


const Productrouter = Router();

// Initialize the product manager
const contenedorManager = new ContenedorManager();

// Define the routes
Productrouter.get('/', async (req, res) => {
  try {
    const products = await contenedorManager.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving products.' });
  }
});



Productrouter.get('/:id', async (req, res) => {
  try {
    const product = await contenedorManager.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product.' });
  }
});

Productrouter.post('/', async (req, res) => {
  try {
    const productData = req.body;

    if (!productData.name || !productData.price || !productData.category) {
      return res.status(400).json({ error: 'Los datos del producto son incompletos.' });
    }

    const savedProduct = await contenedorManager.createProduct(productData);
    res.status(201).json({ message: 'Producto guardado con éxito', product: savedProduct });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'No se pudo crear el producto. Detalles: ' + error.message });
  }
});

  

Productrouter.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;
    const updatedProduct = await contenedorManager.updateProduct(productId, updates);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product.' });
  }
});

Productrouter.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await contenedorManager.deleteProduct(productId);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product.' });
  }
});

export default Productrouter;*/