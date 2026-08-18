import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors.config.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { notFoundHandler } from './middlewares/not-found.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app: Express = express();

// PROTECTION
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// AUTHENTICATION
app.all('/api/auth/*splat', toNodeHandler(auth));

// PARSERS
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.get('/api', (_req, res) => {
  res.status(200).json('Ticketee Backend Service');
});

// ERROR HANDLERS
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
