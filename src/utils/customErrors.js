class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
      super(message, 400);
    }
  }
  
  class NotFoundError extends CustomError {
    constructor(message = 'Not Found') {
      super(message, 404);
    }
  }
  
  const errorDictionary = {
    'Bad Request': 'Los datos proporcionados son incorrectos.',
    'Not Found': 'No se encontró el recurso solicitado.',
    // Agrega más mensajes de error según sea necesario
  };
  
  export { CustomError, BadRequestError, NotFoundError, errorDictionary };