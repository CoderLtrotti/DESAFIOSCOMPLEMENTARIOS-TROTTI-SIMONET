import CartManager from '../dao/cartsManajer.js'; // Asegúrate de que la ruta sea correcta
import { CustomError, BadRequestError, NotFoundError, errorDictionary } from '../utils/customErrors.js';
import handleError from '../utils/errorHandler.js';

const cartManager = new CartManager();

class CartController {
  async getCart(req, res) {
    try {
      const { cid } = req.params;
      const cart = await cartManager.getCart(cid);
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }
      console.log('Carrito recuperado:', cart);
      res.render('cart-details', { cartItems: cart.products });
    } catch (error) {
      handleError(res, error);
    }
  }

  async createCart(req, res) {
    try {
      const cart = await cartManager.createCart();
      console.log('Nuevo carrito creado:', cart);
      res.json({ status: 'success', message: 'Cart created successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async addProduct(req, res) {
    try {
      const { cid } = req.params;
      const { product } = req.body;
      await cartManager.addProduct(cid, product);
      res.json({ status: 'success', message: 'Product added to cart successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async removeProduct(req, res) {
    try {
      const { cid, pid } = req.params;
      await cartManager.removeProduct(cid, pid);
      res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateCart(req, res) {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      await cartManager.updateCart(cid, products);
      res.json({ status: 'success', message: 'Cart updated successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProductQuantity(req, res) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      await cartManager.updateProductQuantity(cid, pid, quantity);
      res.json({ status: 'success', message: 'Product quantity updated successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async clearCart(req, res) {
    try {
      const { cid } = req.params;
      await cartManager.clearCart(cid);
      res.json({ status: 'success', message: 'Cart cleared successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }

  async purchaseCart(req, res) {
    try {
      const { cid } = req.params;
      const productsNotPurchased = await cartManager.purchaseCart(cid, req.user.email);
      res.json({
        status: 'success',
        message: 'Purchase completed successfully',
        productsNotPurchased,
      });
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default CartController;