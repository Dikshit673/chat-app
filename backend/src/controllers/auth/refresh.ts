import { REF_COOKIE_NAME, REFRESH_EXPIRY_MS } from '@/constants.js';
import { UserToken } from '@/models/userToken.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { setRefreshCookie } from '@/utils/auth/cookies.js';
import {
  getRefreshTokenUser,
  issueAccessToken,
  issueRefreshToken,
} from '@/utils/auth/tokens.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';

export const refresh = asyncHandler(async (req, res) => {
  const deviceId = req.deviceId;
  if (!deviceId) return throwApiError(403, 'Device id is required.');

  const cookieToken = req.cookies[REF_COOKIE_NAME] as string | undefined;
  if (!cookieToken) return throwApiError(403, 'Forbidden');

  const { success, data } = getRefreshTokenUser(cookieToken);
  if (!success) return throwApiError(403, 'Refresh token is invalid.');

  const { user } = data;
  const foundToken = await UserToken.findOne({ userId: user._id, deviceId });
  if (!foundToken) return throwApiError(403, 'Refresh token is invalid.');

  const accessToken = issueAccessToken(user);
  const refreshToken = issueRefreshToken(user);
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_MS);

  foundToken.token = refreshToken;
  foundToken.expiresAt = expiresAt;
  await foundToken.save();

  setRefreshCookie(res, refreshToken);
  return sendApiResponse(res, 200, 'refreshed auth token successfully', {
    jwtToken: accessToken,
  });
});
