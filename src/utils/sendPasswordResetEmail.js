import nodemailer from 'nodemailer';
import config from '../config/config.js';



export const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Restablecimiento de contraseña',
    text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', info.response);
    return info; // Puedes devolver información adicional si lo necesitas
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error; // Lanza el error para que pueda ser manejado en el contexto superior
  }
};

