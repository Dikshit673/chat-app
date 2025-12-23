// middlewares/error.middleware.ts
import { NextFunction, Request, Response } from 'express';

import { ApiError } from '@/utils/helpers/ApiError.js';
import { sendApiResponse } from '@/utils/helpers/sendResponse.js';

export const errorHandler = (
  _err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = 404;
  const message = "This Route doesn't exists";

  return sendApiResponse(res, statusCode, message);
};
