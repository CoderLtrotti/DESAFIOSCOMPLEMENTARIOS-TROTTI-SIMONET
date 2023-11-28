import nodemailer from 'nodemailer';
import config from '../config/config.js';



export const sendPasswordResetEmail = (email, resetToken) => {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      // Puedes lanzar el error o manejarlo de alguna otra manera
    } else {
      console.log('Correo electrónico enviado:', info.response);
    }
  });
};

