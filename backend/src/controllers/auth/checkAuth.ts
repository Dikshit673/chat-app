import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

export const checkAuth = asyncHandler(async (req, res) => {
  // get user
  const { user } = req;
  if (!user)
    return sendApiResponse(res, 200, 'Unsuccessful authentication.', {
      isAuth: false,
      user: null,
    });

  // send response
  return sendApiResponse(res, 200, 'Authenticated successfully', {
    isAuth: true,
    user,
  });
});
