import express from 'express';
import cors from 'cors';
import requestIp from 'request-ip';
import helmet from 'helmet';
import compression from 'compression';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import {morganMiddleware} from './config/index.js';
import {ApiError} from './api/common/utils/ApiError.js';

const app = express();

const corsOptions = {
  origin:
    process.env.CORS_ORIGIN === '*' ? '*' : process.env.CORS_ORIGIN?.split(','),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100, // Limit each IP to 100 requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req, res) => {
    return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests. You are only allowed ${
        options.max
      } requests per ${options.windowMs / 60000} minutes`
    );
  },
});

// global middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(hpp());
app.use(requestIp.mw());
app.use('/api/', limiter);
app.use(express.json({limit: '16kb'}));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
); // required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(morganMiddleware);

// api routes
import {healthCheckRouter} from './api/common/routes/index.js';
import {errorHandler} from './api/common/middlewares/index.js';

// healthcheck
app.use('/api/healthcheck', healthCheckRouter);

// api v1 routes
import {
  authRouter,
  userRouter,
  walletRouter,
  transactionRouter,
} from './api/v1/routes/index.js';

// v1 apis
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/wallet', walletRouter);
app.use('/api/v1/transactions', transactionRouter);

// error handling middleware
app.use(errorHandler);

export default app;
