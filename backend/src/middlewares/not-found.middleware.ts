import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error.js';

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  throw new AppError(404, 'Resource Not Found.');
};
