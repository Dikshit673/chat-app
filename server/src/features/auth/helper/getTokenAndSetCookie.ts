import { IuserNoPass } from '@/features/user/types/user.js';
import { Response } from 'express';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js';
import { handleRefreshCookie } from '../utils/cookies.js';

export const getTokenAndSetCookie = (res: Response, user: IuserNoPass) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  handleRefreshCookie(res, refreshToken);
  return accessToken;
};
