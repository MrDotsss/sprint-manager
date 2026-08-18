import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error.js';

export const errorHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Unhandled Error: ', err);

  const errorPayload = {
    code: 5500,
    message: 'Internal Server Error',
  };

  if (err instanceof AppError) {
    errorPayload.code = err.statusCode;
    errorPayload.message = err.message;
  }

  res.status(errorPayload.code).json(errorPayload.message);
};
