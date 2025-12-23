import { asyncHandler } from '@/utils/helpers/asyncHandler.js';
import {
  sendApiResponse,
  throwApiError,
} from '@/utils/helpers/sendResponse.js';

export const checkAuth = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return throwApiError(400, 'User not found.');
  }
  return sendApiResponse(res, 200, 'Authenticated successfully', {
    user,
  });
});
