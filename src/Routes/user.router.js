import { Router } from 'express';
import passport from 'passport'; // Importa Passport
import { hashPassword, comparePassword } from '../utils/encript.js'; // Importa la función para generar tokens JWT
import userService from '../dao/user.service.js';
import CartManager from '../dao/cartsManajer.js';

const usersRouter = Router();
const cartManager = new CartManager();


usersRouter.post('/', async (req, res) => {
  console.log('Solicitud recibida en /usuarios');
  const userData = { ...req.body, password: hashPassword(req.body.password) };
  console.log(userData)

  try {
    // Crear un nuevo usuario
    const newUser = await userService.createUser(userData);

    // Crear un nuevo carrito utilizando la función en cartManager
    const newCart = await cartManager.createCart();

    // Agregar el ID del carrito al objeto userData
    newUser.cart = newCart._id;

    // Guardar el usuario con el ID del carrito asociado
    await newUser.save();

    // Eliminar la contraseña antes de enviar la respuesta
    delete newUser.password;

    // Devolver el usuario creado en la respuesta
    console.log('Nuevo usuario creado:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ error: error.message });
  }
});
  
usersRouter.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getByEmail(email);

    // Chequeo de datos
    if (!user) throw new Error('Invalid data');
    if (!comparePassword(user, password)) throw new Error('Invalid data');

    // Obtener los carritos del usuario usando userService y userModel directamente
    const userWithCarts = await userService.model
      .findById(user._id)
      .populate('cart') // Asegúrate de que 'carts' sea la referencia correcta en tu modelo de usuario
      .exec();

    // Incluye la información del usuario y sus carritos en la respuesta
    const responseData = {
      _id: userWithCarts._id,
      firstName: userWithCarts.firstName,
      lastName: userWithCarts.lastName,
      email: userWithCarts.email,
      // ... otras propiedades del usuario ...
      carts: userWithCarts.carts,
    };

    // Guardar el usuario con los carritos en la sesión
    req.session.user = userWithCarts;

    // Redirigir al usuario a la página 'index' después de iniciar sesión
    res.redirect('/index');

    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




usersRouter.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logged Out'});
    

});

 

export default usersRouter;