import { CustomError, errorDictionary } from './customErrors.js';

function handleError(res, error) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: errorDictionary[error.message] || error.message });
  } else {
    console.error('Error desconocido:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

export default handleError;