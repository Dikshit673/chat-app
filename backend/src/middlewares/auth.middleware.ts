import { COOKIE_NAMES, HEADER_NAMES } from '@/constants.js';
import { getAccessTokenUser } from '@/utils/auth/tokens.js';
import { reqHandler } from '@/utils/functionHandlers.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

export const protectRoute = reqHandler((req, res, next) => {
  // read access token from http only cookies
  const accessToken = req.cookies[COOKIE_NAMES.access] as string | undefined;
  if (!accessToken) return sendApiResponse(res, 401, 'Unauthorized');

  // validate access token
  const { success, data } = getAccessTokenUser(accessToken);
  if (!success) return sendApiResponse(res, 401, 'Unauthorized');

  // attach user to request and pass it to next middleware
  req.user = data;
  next();
});

export const optionalAuth = reqHandler((req, _, next) => {
  console.log(req.headers[HEADER_NAMES.csrf]);
  const accessToken = req.cookies[COOKIE_NAMES.access] as string | undefined;
  if (!accessToken) return next();

  const { success, data } = getAccessTokenUser(accessToken);
  if (!success) return next();

  req.user = data;
  next();
});
