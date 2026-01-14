import { ApiError } from '@/utils/ApiError.js';
import { errorHandler } from '@/utils/functionHandlers.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

export const globalErrorMiddleware = errorHandler((err, _req, res, _next) => {
  // Default to 500 internal server error
  let statusCode = 500;
  let message = 'Something went wrong';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  return sendApiResponse(res, statusCode, message);
});
