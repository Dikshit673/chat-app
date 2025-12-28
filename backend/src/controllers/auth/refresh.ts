import { REF_COOKIE_NAME, REFRESH_EXPIRY_MS } from '@/constants.js';
import { UserToken } from '@/models/userToken.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { issueAuthState } from '@/utils/auth/authState.js';
import {
  setAccessCookie,
  setAuthStateCookie,
  setCsrfCookie,
  setRefreshCookie,
} from '@/utils/auth/cookies.js';
import { getCsrfToken } from '@/utils/auth/csrfToken.js';
import {
  getRefreshTokenUser,
  issueAccessToken,
  issueRefreshToken,
} from '@/utils/auth/tokens.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';

export const refresh = asyncHandler(async (req, res) => {
  // get device id
  const deviceId = req.deviceId;
  if (!deviceId) return throwApiError(403, 'Device id is required.');

  // get refresh token
  const cookieToken = req.cookies[REF_COOKIE_NAME] as string | undefined;
  if (!cookieToken) return throwApiError(403, 'Forbidden');

  // validate refresh token
  const { success, data } = getRefreshTokenUser(cookieToken);
  if (!success) return throwApiError(403, 'Refresh token is invalid.');

  // get user
  const { user } = data;
  const foundToken = await UserToken.findOne({ userId: user._id, deviceId });
  if (!foundToken) return throwApiError(403, 'Refresh token is invalid.');

  // issue tokens
  const accessToken = issueAccessToken(user);
  const refreshToken = issueRefreshToken(user);
  const authState = issueAuthState(true);
  const csrfToken = getCsrfToken();

  // update refresh token
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_MS);
  foundToken.token = refreshToken;
  foundToken.expiresAt = expiresAt;
  await foundToken.save();

  // set cookies
  setAccessCookie(res, accessToken);
  setRefreshCookie(res, refreshToken);
  setAuthStateCookie(res, authState);
  setCsrfCookie(res, csrfToken);

  // send response
  return sendApiResponse(res, 200, 'refreshed auth token successfully');
});
