import morgan from 'morgan';
import {logger} from './index.js';

const stream = {
  write: message => logger.verbose(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan(
  ':method :url :status - :response-time ms',
  {stream, skip}
);

export default morganMiddleware;
