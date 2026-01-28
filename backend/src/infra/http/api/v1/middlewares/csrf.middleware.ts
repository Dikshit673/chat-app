import { Request } from 'express';

import { HEADER_NAMES } from '@/features/auth/auth.constant.js';
import { V1Services } from '@/infra/app/app.container.js';
import { sendApiResponse } from '@/utils/api/response.util.js';
import { reqHandler } from '@/utils/funcHandlers.js';

function getTokenByHeader(req: Request, headerName: string): string | null {
  const rawToken = req.headers[headerName];
  const headerToken =
    typeof rawToken === 'string'
      ? rawToken
      : Array.isArray(rawToken)
        ? rawToken[0]
        : null;
  return headerToken;
}

export function csrfMiddleware(services: V1Services) {
  const { cookieIssuer } = services;

  return {
    csrfProtection: reqHandler((req, res, next) => {
      const cookieToken = cookieIssuer.getCsrfCookies(req);
      const headerToken = getTokenByHeader(req, HEADER_NAMES.CSRF);

      // check if csrf token is present
      if (!cookieToken || !headerToken)
        return sendApiResponse(res, 403, 'CSRF token missing');

      // check if csrf token is valid
      if (cookieToken !== headerToken)
        return sendApiResponse(res, 403, 'Invalid CSRF token');

      // csrf token is valid
      next();
    }),
  };
}

// export const csrfProtection = reqHandler((req, res, next) => {
//   // get csrf token
//   const csrfCookie = req.cookies[COOKIE_NAMES.CSRF] as string | undefined;
//   const csrfHeader = req.headers[HEADER_NAMES.CSRF];

//   // check if csrf token is present
//   if (!csrfCookie || !csrfHeader)
//     return sendApiResponse(res, 403, 'CSRF token missing');

//   // check if csrf token is valid
//   if (csrfCookie !== csrfHeader)
//     return sendApiResponse(res, 403, 'Invalid CSRF token');

//   // csrf token is valid
//   next();
// });

// 1️⃣ Authenticate user (cookies)
// router.use(protectRoute);

// 2️⃣ CSRF only for non-GET requests
// router.use((req, res, next) => {
//   if (req.method !== "GET") {
//     return csrfProtection(req, res, next);
//   }
//   next();
// });
