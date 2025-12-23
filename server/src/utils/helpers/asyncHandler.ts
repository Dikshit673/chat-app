import { NextFunction, Request, Response } from 'express';

import { ApiError } from './ApiError.js';
import { sendApiResponse } from './sendResponse.js';

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler =
  (requestHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('async handler try');
      await requestHandler(req, res, next);
    } catch (error) {
      // console.log('async handler catch');
      const err = error as ApiError;
      const errorMsg = err.message || 'Something went wrong.';
      const statusCode = err.statusCode || 500;
      return sendApiResponse(res, statusCode, errorMsg);
    }
  };
