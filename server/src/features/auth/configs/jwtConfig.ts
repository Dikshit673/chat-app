// jwtConfig.ts
import { EnvVars } from '@/utils/EnvVarConfig.js';
import { SignOptions } from 'jsonwebtoken';

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

const ACC_JWT_AGE = IS_DEV ? ('5m' as const) : ('15m' as const);
const REF_JWT_AGE = IS_DEV ? ('15m' as const) : ('7d' as const);

export const ACC_JWT_CONFIG = createConfig(ACC_JWT_SECRET, {
  expiresIn: ACC_JWT_AGE,
});

export const REF_JWT_CONFIG = createConfig(REF_JWT_SECRET, {
  expiresIn: REF_JWT_AGE,
});
