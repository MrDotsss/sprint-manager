// src/errors/AppError.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean; // Helps distinguish operational errors from system bugs

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Restore the correct prototype chain (Crucial in TypeScript when extending native classes)
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture the stack trace, excluding this constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}
