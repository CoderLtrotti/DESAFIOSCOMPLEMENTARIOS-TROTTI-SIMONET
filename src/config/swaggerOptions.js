import path from 'path';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080', // Cambia la URL según tu configuración
        description: 'Servidor local',
      },
    ],
  },
  apis: [path.resolve(__dirname, '../routes/*.js')], // Ajusta la ruta según tu estructura
};

export default swaggerOptions;