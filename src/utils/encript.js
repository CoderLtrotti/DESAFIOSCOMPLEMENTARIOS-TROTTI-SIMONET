import bcrypt from 'bcrypt';

export const hashPassword = password => {
return bcrypt.hashSync(password, bcrypt.genSaltSync(10));

};







export const comparePassword = async (userPassword, inputPassword) => {
  try {
    const userPasswordString = userPassword.toString(); // Asegúrate de que sea una cadena de texto
    const inputPasswordString = inputPassword.toString(); // Asegúrate de que sea una cadena de texto

    // Compara la contraseña proporcionada con la contraseña almacenada
    const match = await bcrypt.compare(inputPasswordString, userPasswordString);

    return match;
  } catch (error) {
    throw error;
  }
}
export default { hashPassword, comparePassword };