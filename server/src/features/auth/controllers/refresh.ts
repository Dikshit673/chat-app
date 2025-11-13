import { refreshTokenCookieSchema } from '@/lib/zod.js';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import { sendError, sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';
import { getRefreshTokenUser, issueAccessToken } from '../utils/tokens.js';

export const refresh = async (req: Request, res: Response) => {
  const cookieToken = req.cookies[EnvVars.REF_COOKIE_NAME];
  const parsedCookies = refreshTokenCookieSchema.safeParse(cookieToken);

  if (!parsedCookies.success) {
    const err = parsedCookies.error.issues[0];
    const message = EnvVars.IS_DEV ? err.message : 'Forbidden';
    return sendError(res, 403, message);
  }
  const refreshToken = parsedCookies.data;
  try {
    const refreshData = getRefreshTokenUser(refreshToken);
    if (!refreshData.success) {
      const errorMsg = refreshData.error.message || 'Refresh token is invalid.';
      return sendError(res, 403, errorMsg);
    }

    const refreshUserPayload = refreshData.data.user;
    const renewedAccessToken = issueAccessToken(refreshUserPayload);

    return sendSuccess(res, 200, 'refreshed auth token successfully', {
      jwtToken: renewedAccessToken,
    });
  } catch (error) {
    const errorMsg = (error as Error).message || 'Something went wrong.';
    return sendError(res, 500, errorMsg);
  }
};
