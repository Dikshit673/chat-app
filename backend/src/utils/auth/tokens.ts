import jwt, { type JwtPayload, SignOptions } from 'jsonwebtoken';

import { ACC_JWT_EXPIRY, REF_JWT_EXPIRY } from '@/constants.js';
import { AppEnv } from '@/lib/AppEnv.js';
import { SafeUserObject } from '@/models/user.model.js';

const { ACC_JWT_SECRET, REF_JWT_SECRET } = AppEnv;

// ============================== Configs ==============================
const ACC_JWT_OPTIONS: SignOptions = {
  expiresIn: ACC_JWT_EXPIRY,
};
const REF_JWT_OPTIONS: SignOptions = {
  expiresIn: REF_JWT_EXPIRY,
};

const ACC_JWT_CONFIG = {
  secret: ACC_JWT_SECRET,
  options: ACC_JWT_OPTIONS,
};
const REF_JWT_CONFIG = {
  secret: REF_JWT_SECRET,
  options: REF_JWT_OPTIONS,
};

type JwtUserPayload = JwtPayload & SafeUserObject;

const extractUser = (decodedPayload: JwtUserPayload): SafeUserObject => {
  const { iat, exp, nbf, jti, aud, iss, sub, ...userPayload } = decodedPayload;
  return userPayload;
};

// ============================== Functions ==============================
export const issueAccessToken = (payload: SafeUserObject): string => {
  const { secret, options } = ACC_JWT_CONFIG;
  return jwt.sign(payload, secret, options);
};

export const issueRefreshToken = (payload: SafeUserObject): string => {
  const { secret, options } = REF_JWT_CONFIG;
  return jwt.sign(payload, secret, options);
};

const verifyAccessToken = (token: string): JwtUserPayload => {
  const { secret } = ACC_JWT_CONFIG;
  return jwt.verify(token, secret) as JwtUserPayload;
};

const verifyRefreshToken = (token: string): JwtUserPayload => {
  const { secret } = REF_JWT_CONFIG;
  return jwt.verify(token, secret) as JwtUserPayload;
};

export const getAccessTokenUser = (token: string) => {
  try {
    const payload = verifyAccessToken(token);
    const user = extractUser(payload);
    return { success: true, data: { user } } as const;
  } catch (error) {
    const err = error as Error;
    const message = err.message || 'something wrong with access token.';
    return { success: false, error: { ...err, message } } as const;
  }
};

export const getRefreshTokenUser = (token: string) => {
  try {
    const payload = verifyRefreshToken(token);
    const user = extractUser(payload);
    return { success: true, data: { user } } as const;
  } catch (error) {
    const err = error as Error;
    const message = err.message || 'something wrong with access token.';
    return { success: false, error: { ...err, message } } as const;
  }
};
