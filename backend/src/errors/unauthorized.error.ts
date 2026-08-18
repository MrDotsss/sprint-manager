import { AppError } from './app.error.js';

export class Unauthorized extends AppError {
  constructor(
    message: string = 'Unauthorized please login to correct user',
    statusCode: number = 401
  ) {
    super(statusCode, message, true);
  }
}
