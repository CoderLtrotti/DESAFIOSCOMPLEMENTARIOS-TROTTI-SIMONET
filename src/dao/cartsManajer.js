import Cart from './models/cart.js';
import Product from './models/product.js';

class CartManager {
  async createCart(products) {
    try {
      const newCart = new Cart({
        products,
      });

      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error(`Could not create cart: ${error.message}`);
    }
  }
  async getCart(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate('products'); // Aquí se utiliza .populate()
      return cart;
    } catch (error) {
      throw new Error(`Could not get cart: ${error.message}`);
    }
  }

  // Puedes implementar métodos para agregar, eliminar productos del carrito y más si es necesario
}

export default CartManager;