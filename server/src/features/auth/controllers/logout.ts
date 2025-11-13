import { sendError, sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';
import { clearRefreshCookies } from '../utils/cookies.js';
import { UserToken } from '@/models/userToken.model.js';
import { EnvVars } from '@/utils/EnvVarConfig.js';
import { refreshTokenCookieSchema } from '@/lib/zod.js';
import { getRefreshTokenUser } from '../utils/tokens.js';

export const logout = async (req: Request, res: Response) => {
  const deviceId = req.deviceId;
  if (!deviceId) {
    return sendError(res, 400, 'Device id is required.');
  }

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

    await UserToken.findOneAndDelete({
      userId: refreshUserPayload._id,
      deviceId,
    });

    clearRefreshCookies(res);
    return sendSuccess(res, 200, 'Logged out successfully');
  } catch (error) {
    const errorMsg = (error as Error).message || 'Something went wrong.';
    return sendError(res, 500, errorMsg);
  }
};
