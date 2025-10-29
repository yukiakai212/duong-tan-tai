import { Request, Response, NextFunction } from 'express';

export const ErrorHandlers = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const message = err.message || 'Internal Server Error';
  console.error(err); // for log, debug,....

  // response message error for client
  // Don't respond in too much detail, it may contain sensitive information
  res.fail(message, 500);
};
