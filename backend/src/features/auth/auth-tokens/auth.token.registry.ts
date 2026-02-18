import { ENV, IS_PROD } from '@/configs/env/index.js';

import { EXPIRY } from '../domain/auth.constant.js';
import { accessTokenSchema, refreshTokenSchema } from './auth.token.schema.js';
import { CsrfToken } from './csrf/index.js';
import { JwtToken } from './jwt/index.js';

export const createAuthTokenRegistry = () => {
  const MS_EXPIRY = EXPIRY[IS_PROD ? 'PROD' : 'DEV'];
  return {
    ACCESS: new JwtToken(
      accessTokenSchema,
      ENV.ACCESS_JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: MS_EXPIRY.ACCESS,
        header: { typ: 'JWT', alg: 'HS256' },
      },
      {
        algorithms: ['HS256'],
      }
    ),
    REFRESH: new JwtToken(
      refreshTokenSchema,
      ENV.REFRESH_JWT_SECRET,
      {
        algorithm: 'HS256',
        expiresIn: MS_EXPIRY.REFRESH,
        header: { typ: 'JWT', alg: 'HS256' },
      },
      {
        algorithms: ['HS256'],
      }
    ),
    CSRF: new CsrfToken(32),
  };
};

export type AuthTokenRegistry = ReturnType<typeof createAuthTokenRegistry>;
