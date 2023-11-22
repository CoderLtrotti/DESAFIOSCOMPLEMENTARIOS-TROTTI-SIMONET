import { requestPasswordReset } from '../controllers/password.controllers.js';

const passwordRoutes = express.Router();

passwordRoutes.post('/reset-request', requestPasswordReset);

export default passwordRoutes;