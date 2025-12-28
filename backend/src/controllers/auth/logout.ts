import { UserToken } from '@/models/userToken.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import {
  clearAccessCookies,
  clearAuthStateCookies,
  clearCsrfCookies,
  clearRefreshCookies,
} from '@/utils/auth/cookies.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';

export const logout = asyncHandler(async (req, res) => {
  // get device id and user
  const { deviceId, user } = req;
  if (!deviceId) return throwApiError(400, 'Device id is required.');
  if (!user) return throwApiError(400, 'User not found.');

  // delete refresh token
  await UserToken.findOneAndDelete({ userId: user._id, deviceId });

  // clear cookies
  clearAccessCookies(res);
  clearRefreshCookies(res);
  clearCsrfCookies(res);
  clearAuthStateCookies(res);

  // send response
  return sendApiResponse(res, 200, 'Logged out successfully');
});

export const logoutAll = asyncHandler(async (req, res) => {
  // get device id and user
  const { deviceId, user } = req;
  if (!deviceId) return throwApiError(400, 'Device id is required.');
  if (!user) return throwApiError(400, 'User not found.');

  // delete all refresh token
  await UserToken.deleteMany({ userId: user._id });

  // clear cookies
  clearAccessCookies(res);
  clearRefreshCookies(res);
  clearCsrfCookies(res);
  clearAuthStateCookies(res);

  // send response
  return sendApiResponse(res, 200, 'Logged out from all devices successfully');
});
