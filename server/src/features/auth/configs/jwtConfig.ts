import { EnvVars } from '@/utils/EnvVarConfig.js';
import { SignOptions } from 'jsonwebtoken';
import { ExpiresIn } from '../utils/jwtExpiryToCookieAge.js';

const { ACC_JWT_SECRET, REF_JWT_SECRET, IS_DEV } = EnvVars;

type JWTConfig = {
  secret: string;
  options: SignOptions;
};

const ACC_JWT_AGE: ExpiresIn = IS_DEV ? '5m' : '15m';
const REF_JWT_AGE: ExpiresIn = IS_DEV ? '15m' : '7d';

export const ACC_JWT_CONFIG = {
  secret: ACC_JWT_SECRET,
  options: {
    expiresIn: ACC_JWT_AGE,
  },
} satisfies JWTConfig;

export const REF_JWT_CONFIG = {
  secret: REF_JWT_SECRET,
  options: {
    expiresIn: REF_JWT_AGE,
  },
} satisfies JWTConfig;
