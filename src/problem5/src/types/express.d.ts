import { Response } from 'express';
declare global {
  namespace Express {
    interface Response {
      success(data?: any, message?: string, statusCode?: number): void;
      fail(message?: string, statusCode?: number, error?: any): void;
    }
  }
}
