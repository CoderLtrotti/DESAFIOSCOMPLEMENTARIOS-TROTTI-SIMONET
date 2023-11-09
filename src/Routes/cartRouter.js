import { Router } from 'express';
import CartController from '../controllers/cart.controllers.js';
import { checkRoles } from '../middleware/checkroles.middleware.js';
import { isAuth } from '../middleware/auth.middleware.js';



const router = Router();
const cartController = new CartController();

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


