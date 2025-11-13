import type { NextFunction, Request, Response } from 'express';
import { sendError } from '@/utils/sendResponse.js';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import {
  getAccessTokenUser,
  getRefreshTokenUser,
} from '@/features/auth/utils/tokens.js';
import {
  refreshTokenCookieSchema,
  accessTokenheadersSchema,
} from '@/lib/zod.js';

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // handle access token
    const header = req.headers.authorization;
    const authHeader = accessTokenheadersSchema.safeParse(header);

    if (!authHeader.success) {
      const err = authHeader.error.issues[0];
      const message = EnvVars.IS_DEV ? err.message : 'Unauthorized';
      return sendError(res, 401, message);
    }

    const accessToken = authHeader.data.split(' ')[1];
    const verifiedAccess = getAccessTokenUser(accessToken);

    if (!verifiedAccess.success) {
      const errorMsg =
        verifiedAccess.error.message || 'Access token is invalid.';
      return sendError(res, 401, errorMsg);
    }

    const accessPayload = verifiedAccess.data.user;

    // handle cookies
    const cookieToken = req.cookies[EnvVars.REF_COOKIE_NAME];
    const parsedCookies = refreshTokenCookieSchema.safeParse(cookieToken);

    if (!parsedCookies.success) {
      const err = parsedCookies.error.issues[0];
      const message = EnvVars.IS_DEV ? err.message : 'Forbidden';
      return sendError(res, 403, message);
    }

    const refreshData = getRefreshTokenUser(parsedCookies.data);

    if (!refreshData.success) {
      const errorMsg = refreshData.error.message || 'Refresh token is invalid.';
      return sendError(res, 401, errorMsg);
    }

    const refreshPayload = refreshData.data.user;

    // check if access token and refresh token belong to the same user
    if (accessPayload._id !== refreshPayload._id) {
      return sendError(res, 403, 'Forbidden');
    }

    // attach user to request and pass it to next middleware
    req.user = accessPayload;
    next();
  } catch (error) {
    // handle errors
    const err = error as Error;
    const ErrorMessage = err.message || 'Server Error';
    return sendError(res, 500, ErrorMessage);
  }
};
