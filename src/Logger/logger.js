import winston from 'winston';

const level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

const transports = [
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
];

if (process.env.NODE_ENV !== 'production') {
  transports.push(new winston.transports.Console({ level }));
}

const logger = winston.createLogger({
  level,
  format: winston.format.json(),
  transports,
});

export default logger;