import z from 'zod';

import { AppEnv } from '@/utils/AppEnv.js';
import {
  getAccessTokenUser,
  getRefreshTokenUser,
} from '@/utils/auth/tokens.js';
import { asyncHandler } from '@/utils/helpers/asyncHandler.js';
import { throwApiError } from '@/utils/helpers/sendResponse.js';

const authheadersSchema = z
  .string()
  .refine(
    (val) => !val || /^Bearer\s+[\w-]+\.[\w-]+\.[\w-]+$/.test(val),
    'Invalid Authorization header format'
  );

const refreshCookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid refresh cookie format');

const { IS_DEV } = AppEnv;

export const protectRoute = asyncHandler(async (req, _res, next) => {
  // handle access token
  const header = req.headers.authorization;
  const authHeader = authheadersSchema.safeParse(header);

  if (!authHeader.success) {
    const err = authHeader.error.issues[0];
    const message = IS_DEV ? err.message : 'Unauthorized';
    return throwApiError(401, message);
  }

  const accessToken = authHeader.data.split(' ')[1];
  const verifiedAccess = getAccessTokenUser(accessToken);

  if (!verifiedAccess.success) {
    const errorMsg = verifiedAccess.error.message || 'Access token is invalid.';
    return throwApiError(401, errorMsg);
  }

  const accessPayload = verifiedAccess.data.user;

  // handle cookies
  const cookieToken = req.cookies[AppEnv.REF_COOKIE_NAME];
  const parsedCookies = refreshCookieSchema.safeParse(cookieToken);

  if (!parsedCookies.success) {
    const err = parsedCookies.error.issues[0];
    const message = IS_DEV ? err.message : 'Forbidden';
    return throwApiError(403, message);
  }

  const refreshData = getRefreshTokenUser(parsedCookies.data);

  if (!refreshData.success) {
    const errorMsg = refreshData.error.message || 'Refresh token is invalid.';
    return throwApiError(403, errorMsg);
  }

  const refreshPayload = refreshData.data.user;

  // check if access token and refresh token belong to the same user
  if (accessPayload._id !== refreshPayload._id) {
    return throwApiError(403, 'Forbidden');
  }

  // attach user to request and pass it to next middleware
  req.user = accessPayload;
  return next();
});
