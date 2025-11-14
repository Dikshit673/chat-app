import { NextFunction, Request, Response } from 'express';
import { sendError } from './sendResponse.js';

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler =
  (requestHandler: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      requestHandler(req, res, next);
    } catch (error) {
      const errorMsg = (error as Error).message || 'Something went wrong.';
      return sendError(res, 500, errorMsg);
    }
  };
