import type { NextFunction, Request, Response } from 'express';
import z from 'zod';
import { sendError } from '@/utils/sendResponse.js';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import {
  handleAccessToken,
  handleRefreshToken,
} from '@/features/auth/utils/tokens.js';

const headersSchema = z
  .string()
  .refine(
    (val) => !val || /^Bearer\s+[\w-]+\.[\w-]+\.[\w-]+$/.test(val),
    'Invalid Authorization header format'
  );
const cookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid refresh cookie format');

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // handle access token
    const authorizationHeader = req.headers.authorization;

    const parsedAuthorization = headersSchema.safeParse(authorizationHeader);

    if (!parsedAuthorization.success) {
      const err = parsedAuthorization.error.issues[0];
      const message = EnvVars.IS_DEV ? err.message : 'Unauthorized';
      return sendError(res, 401, message);
    }

    const accessToken = parsedAuthorization.data.split(' ')[1];

    const accessPayload = handleAccessToken(res, accessToken);

    if (!accessPayload) return; // error response already sent just return here

    // handle cookies
    const cookieToken = req.cookies[EnvVars.REF_COOKIE_NAME];

    const parsedCookies = cookieSchema.safeParse(cookieToken);

    if (!parsedCookies.success) {
      const err = parsedCookies.error.issues[0];
      const message = EnvVars.IS_DEV ? err.message : 'Forbidden';
      return sendError(res, 403, message);
    }

    const refreshToken = parsedCookies.data;

    const refreshPayload = handleRefreshToken(res, refreshToken);

    if (!refreshPayload) return; // error response already sent just return here

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
