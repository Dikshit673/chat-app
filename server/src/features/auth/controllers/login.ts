import { sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';
import { IuserNoPass } from '@/features/user/types/user.js';
import { issueAccessToken, issueRefreshToken } from '../utils/tokens.js';
import { setRefreshCookie } from '../utils/cookies.js';

const user = {
  _id: '123',
  name: 'test',
  email: 'test@gmail.com',
  role: 'user',
  profilePic: '',
  createdAt: new Date(),
  updatedAt: new Date(),
} satisfies IuserNoPass;

export const login = async (_req: Request, res: Response) => {
  const accessToken = issueAccessToken(user);
  const refreshToken = issueRefreshToken(user);
  setRefreshCookie(res, refreshToken);
  return sendSuccess(res, 200, 'login route', { jwt: accessToken });
};
