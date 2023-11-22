export const sendPasswordResetEmail = (email, resetToken) => {
    // Implementa aquí la lógica para enviar el correo con el enlace de restablecimiento
    console.log(`Correo enviado a ${email} con el enlace: /reset-password/${resetToken}`);
  };