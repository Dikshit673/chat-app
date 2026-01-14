import { COOKIE_NAMES, HEADER_NAMES } from '@/constants.js';
import { reqHandler } from '@/utils/functionHandlers.js';
import { sendApiResponse } from '@/utils/sendResponse.js';

export const csrfProtection = reqHandler((req, res, next) => {
  // get csrf token
  const csrfCookie = req.cookies[COOKIE_NAMES.csrf] as string | undefined;
  const csrfHeader = req.headers[HEADER_NAMES.csrf];

  // check if csrf token is present
  if (!csrfCookie || !csrfHeader)
    return sendApiResponse(res, 403, 'CSRF token missing');

  // check if csrf token is valid
  if (csrfCookie !== csrfHeader)
    return sendApiResponse(res, 403, 'Invalid CSRF token');

  // csrf token is valid
  next();
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
