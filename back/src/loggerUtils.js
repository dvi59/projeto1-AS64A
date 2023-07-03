const winston = require('winston');
const morgan = require('morgan');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
    ],
  });

  const morganMiddleware = morgan('combined', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  });

module.exports = {
    morganMiddleware
}