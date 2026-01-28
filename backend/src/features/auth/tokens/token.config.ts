import { AppEnvs } from '@/configs/AppEnvs.js';

import { EXPIRY } from '../auth.constant.js';
import { tokenUserSchema } from './token.schema.js';
import { JwtConfig } from './utils/jwt.util.js';

export function createTokenConfigs() {
  return Object.freeze({
    accessToken: new JwtConfig({
      schema: tokenUserSchema,
      secret: AppEnvs.ACC_JWT_SECRET,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: EXPIRY.ACCESS,
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    }),
    refreshToken: new JwtConfig({
      schema: tokenUserSchema,
      secret: AppEnvs.REF_JWT_SECRET,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: EXPIRY.REFRESH,
      },
      verifyOptions: {
        algorithms: ['HS256'],
      },
    }),
  });
}
