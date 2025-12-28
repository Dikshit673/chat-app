import { CSRF_COOKIE_NAME, CSRF_HEADER_NAME } from '@/constants.js';
import { sendApiResponse } from '@/utils/sendResponse.js';
import { syncHandler } from '@/utils/syncHandler.js';

export const csrfProtection = syncHandler((req, res, next) => {
  // get csrf token
  const csrfCookie = req.cookies[CSRF_COOKIE_NAME] as string | undefined;
  const csrfHeader = req.headers[CSRF_HEADER_NAME];

  // check if csrf token is present
  if (!csrfCookie || !csrfHeader)
    return sendApiResponse(res, 403, 'CSRF token missing');

  // check if csrf token is valid
  if (csrfCookie !== csrfHeader)
    return sendApiResponse(res, 403, 'Invalid CSRF token');

  // csrf token is valid
  return next();
});

// 1️⃣ Authenticate user (cookies)
// router.use(protectRoute);

// 2️⃣ CSRF only for non-GET requests
// router.use((req, res, next) => {
//   if (req.method !== "GET") {
//     return csrfProtection(req, res, next);
//   }
//   next();
// });
