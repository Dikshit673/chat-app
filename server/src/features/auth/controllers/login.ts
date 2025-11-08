import { sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';
import { IuserNoPass } from '@/features/user/types/user.js';
import { getTokenAndSetCookie } from '../helper/getTokenAndSetCookie.js';

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
  const accessToken = getTokenAndSetCookie(res, user);
  return sendSuccess(res, 200, 'login route', { jwt: accessToken });
};
