import express from 'express';
import passport from 'passport';
import UsersController from '../controllers/UserControllers.js';

const usersRouter = express.Router();

// Rutas
usersRouter.post('/', UsersController.createUser);
usersRouter.post('/auth', UsersController.loginUser);
usersRouter.post('/logout', UsersController.logoutUser);
usersRouter.get('/:id', UsersController.getUserById); // Nueva ruta para obtener un usuario por ID
usersRouter.delete('/:id', UsersController.deleteUserById); // Nueva ruta para

export default usersRouter;