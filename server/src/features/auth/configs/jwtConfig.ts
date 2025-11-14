import { EnvVars } from '@/utils/EnvVarConfig.js';
import { SignOptions } from 'jsonwebtoken';

type ExpiresIn = SignOptions['expiresIn'];

const { ACC_JWT_SECRET, REF_JWT_SECRET, IS_DEV } = EnvVars;

export const ACC_JWT_EXPIRY: ExpiresIn = IS_DEV ? '5m' : '15m';
export const REF_JWT_EXPIRY: ExpiresIn = IS_DEV ? '15m' : '7d';

const ACC_JWT_OPTIONS: SignOptions = {
  expiresIn: ACC_JWT_EXPIRY,
};
const REF_JWT_OPTIONS: SignOptions = {
  expiresIn: REF_JWT_EXPIRY,
};

export const ACC_JWT_CONFIG = {
  secret: ACC_JWT_SECRET,
  options: ACC_JWT_OPTIONS,
};
export const REF_JWT_CONFIG = {
  secret: REF_JWT_SECRET,
  options: REF_JWT_OPTIONS,
};
