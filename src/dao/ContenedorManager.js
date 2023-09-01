import mongoose from 'mongoose';
import Product from './models/product.js'; // Ruta correcta a tu modelo Product

class ContenedorManager {
  constructor() {
    this.Product = Product;

    // Agregar algunos productos de prueba al crear una instancia
    this.addTestProducts();
  }

  async addProduct(name, price, description) {
    try {
      const newProduct = new this.Product({ name, price, description });
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error(`Could not add product: ${error.message}`);
    }
  }

  async getProductById(productId) {
    try {
      const product = await this.Product.findById(productId);
      return product;
    } catch (error) {
      throw new Error(`Could not get product: ${error.message}`);
    }
  }

  async getAllProducts() {
    try {
      const products = await this.Product.find({});
      return products;
    } catch (error) {
      throw new Error(`Could not get products: ${error.message}`);
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await this.Product.findByIdAndDelete(productId);
      return deletedProduct;
    } catch (error) {
      throw new Error(`Could not delete product: ${error.message}`);
    }
  }

  async addTestProducts() {
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
      {
        name: "Producto de prueba 3",
        price: 24.99,
        description: "Este es el tercer producto de prueba.",
      },
      // Agrega más productos de prueba si es necesario
    ];

    try {
      for (const productData of testProducts) {
        const newProduct = new this.Product(productData);
        await newProduct.save();
      }
      console.log("Productos de prueba agregados automáticamente.");
    } catch (error) {
      console.error("Error al agregar productos de prueba:", error.message);
    }
  }
}

export default ContenedorManager;