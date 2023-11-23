import { hashPassword, comparePassword } from '../utils/encript.js';
import userService from '../services/user.service.js';
import CartManager from '../dao/cartsManajer.js';
import User from "../dao/classes/user.dao.js"
import { Router } from 'express';

const cartManager = new CartManager();
const usersService = new User(); 

class UsersController {
  async createUser(req, res) {
    console.log('Solicitud recibida en /usuarios');
    const userData = { ...req.body, password: hashPassword(req.body.password) };

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
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userService.getByEmail(email);

      // Chequeo de datos
      if (!user) throw new Error('Invalid data');
      if (!comparePassword(password, user.password)) throw new Error('Invalid data');

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
  }

  logoutUser(req, res) {
    req.session.destroy();
    res.status(200).json({ message: 'Logged Out' });
  }


async getsUserById(req, res) {
    const userId = req.params.id;

    try {
      const user = await userService.model.findById(userId);

      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Eliminar la contraseña antes de enviar la respuesta
      const userWithoutPassword = { ...user.toObject(), password: undefined };

      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async deleteUserById(req, res) {
    const userId = req.params.id;

    try {
      const user = await userService.model.findByIdAndDelete(userId);

      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }


async upgradeToPremium(req, res) {
  const userId = req.params.id;

  try {
    const updatedUser = await userService.upgradeUserToPremium(userId);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado a premium', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async requestPasswordReset(req, res) {
  const { email } = req.body;

  try {
    const user = await userService.getByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const resetToken = generateToken({ email }, '1h');
    // Almacena resetToken y su expiración en la base de datos para el usuario

    // Envía el correo electrónico con el token de restablecimiento
    sendPasswordResetEmail(user.email, resetToken);

    res.json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

async handlePasswordReset(req, res) {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await userService.getByResetToken(token);

    if (!user || user.resetTokenExpiration < new Date()) {
      return res.status(400).json({ error: 'Enlace de restablecimiento no válido o expirado.' });
    }

    if (comparePassword(newPassword, user.password)) {
      return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la actual.' });
    }

    user.password = hashPassword(newPassword);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    // Redirige a la página de confirmación después de restablecer la contraseña
    res.redirect('/reset-confirmation');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// Ruta para renderizar la página cuando el token ha expirado
renderResetPasswordExpired(req, res) {
  res.render('resetPasswordExpired'); // Ajusta el nombre de la vista según tus archivos
}

// Ruta para renderizar la página cuando el token es inválido
renderResetPasswordInvalid(req, res) {
  res.render('resetPasswordInvalid'); // Ajusta el nombre de la vista según tus archivos
}

// Ruta para renderizar la página de confirmación de restablecimiento de contraseña
renderResetConfirmation(req, res) {
  res.render('resetConfirmation'); // Ajusta el nombre de la vista según tus archivos
}

// Ruta para renderizar el formulario de solicitud de restablecimiento de contraseña
renderResetPasswordForm(req, res) {
  res.render('resetPasswordForm'); // Ajusta el nombre de la vista según tus archivos
}
}



export const getUsers = async (req, res) => {
    try {
        let result = await usersService.getUsers()
        res.status(200).json({ status: "success", result: result });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const saveUser = async (req, res) => {
    const userData = { ...req.body, password: hashPassword(req.body.password) };

    try {
        let result = await usersService.saveUser(userData);
        res.status(201).json({ status: "success", result: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





export default new UsersController();