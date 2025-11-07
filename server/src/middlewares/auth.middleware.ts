import type { NextFunction, Request, Response } from 'express';
import { sendError } from '@/utils/sendResponse.js';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import {
  handleAccessToken,
  handleRefreshToken,
} from '@/features/auth/utils/tokens.js';

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // handle access token
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) return sendError(res, 401, 'Unauthorized');

    const token = authorizationHeader.split(' ')[1];

    if (!token) return sendError(res, 401, 'Unauthorized');

    const accessPayload = handleAccessToken(res, token);

    if (!accessPayload) return; // error response already sent just return here

    // handle refresh token
    const refreshToken = req.cookies[EnvVars.REF_COOKIE_NAME];

    if (!refreshToken) return sendError(res, 403, 'Forbidden');

    const refreshPayload = handleRefreshToken(res, refreshToken);

    if (!refreshPayload) return; // error response already sent just return here

    if (accessPayload._id !== refreshPayload._id) {
      return sendError(res, 403, 'Forbidden');
    }
    req.user = accessPayload;
    next();
  } catch (error) {
    const err = error as Error;
    const ErrorMessage = err.message || 'Server Error';

    return sendError(res, 500, ErrorMessage);
  }
};
