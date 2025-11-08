import type { Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { ACC_JWT_CONFIG, REF_JWT_CONFIG } from '../configs/jwtConfig.js';
import { sendError } from '@/utils/sendResponse.js';
import { IuserNoPass } from '@/features/user/types/user.js';

type UserVerifiedPayload = JwtPayload & IuserNoPass;

const extractUser = (decodedPayload: UserVerifiedPayload): IuserNoPass => {
  const { iat, exp, nbf, jti, aud, iss, sub, ...userPayload } = decodedPayload;
  return userPayload;
};

export const generateAccessToken = (payload: IuserNoPass): string => {
  return jwt.sign(payload, ACC_JWT_CONFIG.secret, ACC_JWT_CONFIG.options);
};

export const generateRefreshToken = (payload: IuserNoPass): string => {
  return jwt.sign(payload, REF_JWT_CONFIG.secret, REF_JWT_CONFIG.options);
};

const verifyAccessToken = (token: string): UserVerifiedPayload => {
  return jwt.verify(token, ACC_JWT_CONFIG.secret) as UserVerifiedPayload;
};

const verifyRefreshToken = (token: string): UserVerifiedPayload => {
  return jwt.verify(token, REF_JWT_CONFIG.secret) as UserVerifiedPayload;
};

export const handleAccessToken = (res: Response, token: string) => {
  try {
    const payload = verifyAccessToken(token);
    const user = extractUser(payload);
    return user;
  } catch (error) {
    const errMsg =
      (error as Error).message || 'something wrong with access token.';
    sendError(res, 401, errMsg);
    return null;
  }
};

export const handleRefreshToken = (res: Response, token: string) => {
  try {
    const payload = verifyRefreshToken(token);
    const user = extractUser(payload);
    return user;
  } catch (error) {
    const errMsg =
      (error as Error).message || 'something wrong with access token.';
    sendError(res, 403, errMsg);
    return null;
  }
};
