import { asyncHandler } from '@/utils/asyncHandler.js';
import { getAccessTokenUser } from '@/utils/auth/tokens.js';
import { throwApiError } from '@/utils/sendResponse.js';

export const protectRoute = asyncHandler(async (req, _res, next) => {
  // read access token from headers
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return throwApiError(401, 'Unauthorized');

  const accessToken = auth.slice(7);
  const { success, data } = getAccessTokenUser(accessToken);
  if (!success) return throwApiError(401, 'Access token is invalid.');

  // attach user to request and pass it to next middleware
  req.user = data.user;
  return next();
});
