import { UserToken } from '@/models/userToken.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { clearRefreshCookies } from '@/utils/auth/cookies.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';

export const logout = asyncHandler(async (req, res) => {
  const { deviceId, user } = req;
  if (!deviceId) return throwApiError(400, 'Device id is required.');
  if (!user) return throwApiError(400, 'User not found.');

  await UserToken.findOneAndDelete({ userId: user._id, deviceId });
  clearRefreshCookies(res);
  return sendApiResponse(res, 200, 'Logged out successfully');
});

export const logoutAll = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) return throwApiError(400, 'User not found.');

  await UserToken.deleteMany({ userId: user._id });
  clearRefreshCookies(res);
  return sendApiResponse(res, 200, 'Logged out successfully');
});
