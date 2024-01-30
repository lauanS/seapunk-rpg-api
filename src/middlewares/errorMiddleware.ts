import { NextFunction, Request, Response } from 'express';
import { ElegantError } from '@/utils/ErrorHandler';

export const errorMiddleware = (error: Error & Partial<ElegantError>, req: Request, res: Response, _next: NextFunction) => {
  const isElegantError = error instanceof ElegantError;
  const statusCode = isElegantError ? error.statusCode : 500;
  const message = isElegantError ? error.message : 'Erro inesperado';

  res.status(statusCode).json({
    success: false,
    result: message
  });
};
