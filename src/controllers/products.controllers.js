import ContenedorManager from '../dao/ContenedorManager.js';
import { CustomError, BadRequestError, NotFoundError, errorDictionary } from '../utils/customErrors.js';
import handleError from '../utils/errorHandler.js';

// Inicializa el administrador del contenedor
const contenedorManager = new ContenedorManager();

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const products = await contenedorManager.getAllProducts(req.query);
      res.json(products);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProductById(req, res) {
    try {
      const product = await contenedorManager.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      handleError(res, error);
    }
  }

  async createProduct(req, res) {
    try {
      const productData = req.body;

      if (!productData.name || !productData.price || !productData.category) {
        throw new BadRequestError('Los datos del producto son incompletos.');
      }

      const savedProduct = await contenedorManager.createProduct(productData);
      res.status(201).json({ message: 'Producto guardado con éxito', product: savedProduct });
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updates = req.body;
      const updatedProduct = await contenedorManager.updateProduct(productId, updates);
      res.json(updatedProduct);
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await contenedorManager.deleteProduct(productId);
      res.json(deletedProduct);
    } catch (error) {
      handleError(res, error);
    }
  }
}

export default new ProductsController();