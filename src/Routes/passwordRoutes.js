import { requestPasswordReset } from '../controllers/password.controllers.js';
import { Router } from 'express';

const passwordRoutes = Router();

passwordRoutes.post('/reset-request', requestPasswordReset);

export default passwordRoutes;