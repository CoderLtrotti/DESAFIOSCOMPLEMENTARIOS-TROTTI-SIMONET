import userModel from '../models/userModel.js';
import { generateToken } from '../middleware/jwt.middleware.js';
import { sendPasswordResetEmail } from '../utils/sendPasswordResetEmail.js';

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const resetToken = generateToken({ email }, '1h');
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hora de expiración
    await user.save();

    sendPasswordResetEmail(user.email, resetToken); // Implementa la función sendPasswordResetEmail

    res.json({ message: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};