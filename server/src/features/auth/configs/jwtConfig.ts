import { EnvVars } from '@/utils/EnvVarConfig.js';
import { SignOptions } from 'jsonwebtoken';
import { ExpiresIn } from '../utils/jwtExpiryToCookieAge.js';

const { ACC_JWT_SECRET, REF_JWT_SECRET, IS_DEV } = EnvVars;

type JWTConfig = {
  secret: string;
  options: SignOptions;
};

const createConfig = (
  secret: string = '',
  options: SignOptions,
  issuer = 'server'
): JWTConfig => ({
  secret,
  options: { ...options, issuer },
});

const ACC_JWT_AGE: ExpiresIn = IS_DEV ? '5m' : '15m';
const REF_JWT_AGE: ExpiresIn = IS_DEV ? '15m' : '7d';

export const ACC_JWT_CONFIG = createConfig(ACC_JWT_SECRET, {
  expiresIn: ACC_JWT_AGE,
});

export const REF_JWT_CONFIG = createConfig(REF_JWT_SECRET, {
  expiresIn: REF_JWT_AGE,
});
