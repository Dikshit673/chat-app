import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ACC_JWT_CONFIG, REF_JWT_CONFIG } from '../configs/jwtConfig.js';
import { IUserPayload } from '@/features/user/types/user.js';

type JwtUserPayload = JwtPayload & IUserPayload;

const extractUser = (decodedPayload: JwtUserPayload): IUserPayload => {
  const { iat, exp, nbf, jti, aud, iss, sub, ...userPayload } = decodedPayload;
  return userPayload;
};

export const issueAccessToken = (payload: IUserPayload): string => {
  const { secret, options } = ACC_JWT_CONFIG;
  return jwt.sign(payload, secret, options);
};

export const issueRefreshToken = (payload: IUserPayload): string => {
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
    const success = true as const;
    const payload = verifyAccessToken(token);
    const user = extractUser(payload);
    return { success, data: { user } };
  } catch (error) {
    const success = false as const;
    const err = error as Error;
    const message = err.message || 'something wrong with access token.';
    return { success, error: { ...err, message } };
  }
};

export const getRefreshTokenUser = (token: string) => {
  try {
    const success = true as const;
    const payload = verifyRefreshToken(token);
    const user = extractUser(payload);
    return { success, data: { user } };
  } catch (error) {
    const success = false as const;
    const err = error as Error;
    const message = err.message || 'something wrong with access token.';
    return { success, error: { ...err, message } };
  }
};
