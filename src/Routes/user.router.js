import express from 'express';
import passport from 'passport';
import UsersController from '../controllers/UserControllers.js';
import { getUsers, saveUser } from '../controllers/UserControllers.js'

const usersRouter = express.Router();

// Rutas
usersRouter.post('/', UsersController.createUser);
usersRouter.post('/auth', UsersController.loginUser);
usersRouter.post('/logout', UsersController.logoutUser);
usersRouter.get('/:id', UsersController.getsUserById); // Nueva ruta para obtener un usuario por ID
usersRouter.delete('/:id', UsersController.deleteUserById); // Nueva ruta para
usersRouter.post("/", saveUser)
usersRouter.get("/", getUsers)
usersRouter.get("/:uid", UsersController.getsUserById)
usersRouter.put('/:id/upgrade-to-premium', UsersController.upgradeToPremium);
usersRouter.post('/reset-password/:token', UsersController.requestPasswordReset);

usersRouter.get('/password-reset/:token', UsersController.requestPasswordReset);
usersRouter.post('/:id/upgrade-to-premium', UsersController.upgradeToPremium);

// Rutas relacionadas con el restablecimiento de contraseña
usersRouter.get('/reset-password', UsersController.renderResetPasswordForm); // Página del formulario
usersRouter.post('/reset-password/:token', UsersController.handlePasswordReset); // Manejo de restablecimiento
usersRouter.get('/reset-password-invalid', UsersController.renderResetPasswordInvalid); // Token inválido
usersRouter.get('/reset-confirmation', UsersController.renderResetConfirmation); // Confirmación
usersRouter.put('/:id/upgrade-to-premium', UsersController.upgradeToPremium);
usersRouter.post('/:uid/documents', UsersController.uploadDocuments);
export default usersRouter;

/*import { Router } from 'express'
import { getUsers, getUserById, saveUser } from '../controllers/users.controller.js'

const router = Router()

router.get("/", getUsers)
router.get("/:uid", getUserById)
router.post("/", saveUser)

export default router */