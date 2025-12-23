import { REF_COOKIE_Expiry } from '@/constants.js';
import { comparePassword } from '@/lib/bcrypt.js';
import { User } from '@/models/user.model.js';
import { UserToken } from '@/models/userToken.model.js';
import { setRefreshCookie } from '@/utils/auth/cookies.js';
import { issueAccessToken, issueRefreshToken } from '@/utils/auth/tokens.js';
import { asyncHandler } from '@/utils/helpers/asyncHandler.js';
import {
  sendApiResponse,
  throwApiError,
} from '@/utils/helpers/sendResponse.js';
import { loginSchema } from '@/validations/zod.js';

export const login = asyncHandler(async (req, res) => {
  const deviceId = req.deviceId;
  if (!deviceId) {
    return throwApiError(400, 'Device id is required.');
  }

  const loginData = loginSchema.safeParse(req.body);
  if (!loginData.success) {
    const errorMsg = loginData.error.issues[0].message || 'invalid credentials';
    return throwApiError(400, errorMsg);
  }

  const { email, password } = loginData.data;

  const user = await User.findByEmail(email);
  if (!user) {
    return throwApiError(400, 'User not found.');
  }

  const isPasswordMatch = comparePassword(password, user.password);
  if (!isPasswordMatch) {
    return throwApiError(400, 'Invalid credentials.');
  }

  const userData = user.toSafeObject();

  const accessToken = issueAccessToken(userData);
  const refreshToken = issueRefreshToken(userData);

  const expiresAt = new Date(
    Date.now() + (REF_COOKIE_Expiry || 7 * 24 * 60 * 60) * 1000
  );

  await UserToken.findOneAndUpdate(
    { userId: user._id, deviceId },
    { token: refreshToken, expiresAt },
    { upsert: true, new: true }
  );

  setRefreshCookie(res, refreshToken);
  return sendApiResponse(res, 200, 'Login successful.', {
    user: userData,
    jwtToken: accessToken,
  });
});
