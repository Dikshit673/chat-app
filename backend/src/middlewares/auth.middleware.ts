import { ACC_COOKIE_NAME } from '@/constants.js';
import { getAccessTokenUser } from '@/utils/auth/tokens.js';
import { sendApiResponse } from '@/utils/sendResponse.js';
import { syncHandler } from '@/utils/syncHandler.js';

export const protectRoute = syncHandler((req, res, next) => {
  // read access token from http only cookies
  const accessToken = req.cookies[ACC_COOKIE_NAME] as string | undefined;
  if (!accessToken) return sendApiResponse(res, 401, 'Unauthorized');

  // validate access token
  const { success, data } = getAccessTokenUser(accessToken);
  if (!success) return sendApiResponse(res, 401, 'Unauthorized');

  // attach user to request and pass it to next middleware
  req.user = data.user;
  return next();
});

export const optionalAuth = syncHandler((req, _, next) => {
  const accessToken = req.cookies[ACC_COOKIE_NAME] as string | undefined;
  if (!accessToken) return next();

  const { success, data } = getAccessTokenUser(accessToken);
  if (!success) return next();

  req.user = data.user;
  next();
});
