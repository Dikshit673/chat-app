import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';

export const checkAuth = asyncHandler(async (req, res) => {
  const { user } = req;
  if (!user) return throwApiError(400, 'User not found.');
  return sendApiResponse(res, 200, 'Authenticated successfully', { user });
});
