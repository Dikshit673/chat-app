import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

import { MS_EXPIRY } from '@/constants.js';
import { SafeJwtUserPayload } from '@/modules/auth/auth.types.js';
import { decodedTokenUserSchema } from '@/modules/auth/token/token.service.js';
import { AppEnvs } from '@/shared/configs/AppEnvs.js';

const { ACC_JWT_SECRET, REF_JWT_SECRET } = AppEnvs;

// ============================== Access Token Functions ==============================

type AccessTokenPayload = {
  id: string;
};

export const issueAccessToken = (
  payload: object extends AccessTokenPayload ? object : AccessTokenPayload
): string => {
  const tokenPayload = {
    id: payload.id,
  } satisfies AccessTokenPayload;

  return jwt.sign(tokenPayload, ACC_JWT_SECRET, {
    expiresIn: MS_EXPIRY.access,
  });
};

const verifyAccessToken = (token: string): SafeJwtUserPayload => {
  return jwt.verify(token, ACC_JWT_SECRET) as SafeJwtUserPayload;
};

export const getAccessTokenUser = (token: string) => {
  const payload = verifyAccessToken(token);
  return decodedTokenUserSchema.safeParse(payload);
};

// ============================== Refresh Token Functions ==============================

type RefreshTokenPayload = {
  id: string;
};

export const issueRefreshToken = (
  payload: object extends AccessTokenPayload ? object : AccessTokenPayload
): string => {
  const tokenPayload = { id: payload.id } satisfies RefreshTokenPayload;
  return jwt.sign(tokenPayload, REF_JWT_SECRET, {
    expiresIn: MS_EXPIRY.refresh,
  });
};

const verifyRefreshToken = (token: string): SafeJwtUserPayload => {
  return jwt.verify(token, REF_JWT_SECRET) as SafeJwtUserPayload;
};

export const getRefreshTokenUser = (token: string) => {
  const payload = verifyRefreshToken(token);
  return decodedTokenUserSchema.safeParse(payload);
};

// ============================== CSRF Token Functions ==============================

export const issueCsrfToken = () => {
  const csrfToken = randomBytes(32).toString('hex');
  return csrfToken;
};
