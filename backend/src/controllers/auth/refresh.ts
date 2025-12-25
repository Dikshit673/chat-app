import z from 'zod';

import { AppEnv } from '@/lib/AppEnv.js';
import { getRefreshTokenUser, issueAccessToken } from '@/utils/auth/tokens.js';
import { asyncHandler } from '@/utils/helpers/asyncHandler.js';
import {
  sendApiResponse,
  throwApiError,
} from '@/utils/helpers/sendResponse.js';

const refreshCookieSchema = z
  .string()
  .refine((val) => !val || val.length > 0, 'Invalid refresh cookie format');

export const refresh = asyncHandler(async (req, res) => {
  const cookieToken = req.cookies[AppEnv.REF_COOKIE_NAME];
  const parsedCookies = refreshCookieSchema.safeParse(cookieToken);

  if (!parsedCookies.success) {
    const err = parsedCookies.error.issues[0];
    const message = AppEnv.IS_DEV ? err.message : 'Forbidden';
    return throwApiError(403, message);
  }
  const refreshToken = parsedCookies.data;

  const refreshData = getRefreshTokenUser(refreshToken);
  if (!refreshData.success) {
    const errorMsg = refreshData.error.message || 'Refresh token is invalid.';
    return throwApiError(403, errorMsg);
  }

  const refreshUserPayload = refreshData.data.user;
  const renewedAccessToken = issueAccessToken(refreshUserPayload);

  return sendApiResponse(res, 200, 'refreshed auth token successfully', {
    jwtToken: renewedAccessToken,
  });
});
