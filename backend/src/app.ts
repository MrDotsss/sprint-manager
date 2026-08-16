import express, { type Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsOptions } from './config/cors.config.js';

const app: Express = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.status(200).json('Ticketee Backend Service');
});

export default app;
