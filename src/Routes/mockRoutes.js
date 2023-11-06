import { Router } from 'express';
import { generateMockProducts, getMockProducts } from '../controllers/mock.controllers.js';

const mockRoutes = Router();

// Ruta para obtener productos ficticios como respuesta JSON
mockRoutes .get('/mockingproducts', getMockProducts);

export default mockRoutes ;