import { Router } from 'express';
import CartController from '../controllers/cart.controllers.js';
import { checkRoles } from '../middleware/checkroles.middleware.js';
import { isAuth } from '../middleware/auth.middleware.js';


const router = Router();
const cartController = new CartController();
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operaciones relacionadas con el carrito de compras
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Crear un nuevo carrito.
 *     description: Crea un nuevo carrito para un usuario.
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Carrito creado con éxito.
 *         content:
 *           application/json:
 *             example:
 *               message: Carrito creado con éxito.
 *               data:
 *                 cart: {...}
 */

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Obtener un carrito por ID.
 *     description: Retorna un carrito según su ID.
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del carrito.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operación exitosa.
 *         content:
 *           application/json:
 *             example:
 *               message: Carrito obtenido con éxito.
 *               data:
 *                 cart: {...}
 *       404:
 *         description: Carrito no encontrado.
 *         content:
 *           application/json:
 *             example:
 *               error: Carrito no encontrado.
 */

// ... (Agrega comentarios para otras rutas según sea necesario)
// DELETE /api/carts/:cid/products/:pid - Remove a product from the cart
// DELETE /api/carts/:cid/products/:pid - Remove a product from the cart
router.delete('/:cid/:productId/:pid', (req, res) => {
    cartController.removeProduct(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // PUT /api/carts/:cid - Update the cart with an array of products
  router.put('/:cid', (req, res) => {
    cartController.updateCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // PUT /api/carts/:cid/products/:pid - Update the quantity of a product in the cart
  router.put('/:cid/:productId/:pid', (req, res) => {
    cartController.updateProductQuantity(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // DELETE /api/carts/:cid - Remove all products from the cart
  router.delete('/:cid', (req, res) => {
    cartController.clearCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // GET CART
  router.get('/:cid', (req, res) => {
    cartController.getCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // POST /api/carts/:cid/:productId - Add a product to the cart
  router.post('/:cid/:productId', (req, res) => {
    cartController.addProduct(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // CREATE CART
  router.post('/', (req, res) => {
    cartController.createCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // DELETE /api/carts/:cid - Remove all products from the cart
  router.delete('/:cid', (req, res) => {
    cartController.clearCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // POST /api/carts/:cid/purchase - Purchase the cart
  router.post('/:cid/purchase', (req, res) => {
    cartController.purchaseCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // POST /api/carts/:cid/:productId - Add a product to the cart with authentication and role check
  router.post('/:cid/:productId', isAuth, (req, res) => {
    cartController.addProduct(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  // PUT /api/carts/:cid - Update the cart with authentication and role check
  router.put('/:cid', isAuth, checkRoles(['admin']), (req, res) => {
    cartController.updateCart(req, res).catch((error) => cartController.handleError(res, error));
  });
  
  export default router;


