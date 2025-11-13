import { sendError, sendSuccess } from '@/utils/sendResponse.js';
import { Request, Response } from 'express';
import { IUserObject } from '@/features/user/types/user.js';
import { issueAccessToken, issueRefreshToken } from '../utils/tokens.js';
import { setRefreshCookie } from '../utils/cookies.js';
import { User } from '@/models/user.model.js';
import { comparePassword } from '@/lib/bcrypt.js';
import { loginSchema } from '@/lib/zod.js';
import { REF_COOKIE_CONFIG } from '../configs/cookieConfig.js';
import { UserToken } from '@/models/userToken.model.js';

export const login = async (req: Request, res: Response) => {
  const deviceId = req.deviceId;
  if (!deviceId) {
    return sendError(res, 400, 'Device id is required.');
  }
  const loginData = loginSchema.safeParse(req.body);
  if (!loginData.success) {
    const errorMsg = loginData.error.issues[0].message || 'invalid credentials';
    return sendSuccess(res, 400, errorMsg);
  }
  const { email, password } = loginData.data;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return sendError(res, 400, 'User not found.');
    }
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return sendError(res, 400, 'Invalid credentials.');
    }

    const { password: _removePassField, ...userData } =
      user.toObject<IUserObject>();

    const accessToken = issueAccessToken(userData);
    const refreshToken = issueRefreshToken(userData);

    const expirationTime = REF_COOKIE_CONFIG.options.maxAge;

    const expiresAt = new Date(
      Date.now() + (expirationTime || 7 * 24 * 60 * 60) * 1000
    );

    await UserToken.findOneAndUpdate(
      { userId: user._id, deviceId },
      { token: refreshToken, expiresAt },
      { upsert: true, new: true }
    );

    setRefreshCookie(res, refreshToken);
    return sendSuccess(res, 200, 'Login successful.', {
      authUser: userData,
      jwtToken: accessToken,
    });
  } catch (error) {
    const errorMsg = (error as Error).message || 'Something went wrong.';
    return sendError(res, 500, errorMsg);
  }
};
