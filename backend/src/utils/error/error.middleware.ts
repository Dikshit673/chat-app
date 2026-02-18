import { ApiError } from '@/utils/error/error.js';
import { errorHandler } from '@/utils/handler/reqHandlers.js';
import { sendApiResponse } from '@/utils/response/index.js';

export const globalError = errorHandler((err, _req, res, _next) => {
  // Default to 500 internal server error
  let statusCode = 500;
  let message = 'unidentified error';

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  } else {
    message = 'Something went wrong';
  }

  return sendApiResponse(res, statusCode, message);
});
