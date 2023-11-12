import express from 'express';
import logger from '../Logger/logger.js';

const Logger = express.Router();

Logger.get('/loggertest', (req, res) => {
  logger.error('Prueba de log en error.log');
  logger.info('Prueba de log en consola');
  logger.debug('Prueba para otro propósito');
  res.send('Logs probados');
});

export default Logger;