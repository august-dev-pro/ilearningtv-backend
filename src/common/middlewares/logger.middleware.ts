import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`[Request] ${req.method} ${req.originalUrl} - ${res.statusCode}`);
  next();
}
