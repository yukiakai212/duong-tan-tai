import { Request, Response, NextFunction } from 'express';

export const ResponseMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.success = (
    data: any = null,
    message: string = 'Request successful',
    statusCode: number = 200,
  ): void => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.fail = (
    message: string = 'Something went wrong',
    statusCode: number = 500,
    error: any = null,
  ): void => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };
  next();
};
