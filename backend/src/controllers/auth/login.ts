import { REFRESH_EXPIRY_MS } from '@/constants.js';
import { User } from '@/models/user.model.js';
import { UserToken } from '@/models/userToken.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { setRefreshCookie } from '@/utils/auth/cookies.js';
import { issueAccessToken, issueRefreshToken } from '@/utils/auth/tokens.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';
import { loginSchema } from '@/validations/zod.js';

export const login = asyncHandler(async (req, res) => {
  const deviceId = req.deviceId;
  if (!deviceId) return throwApiError(400, 'Device id is required.');

  const { success, data, error } = loginSchema.safeParse(req.body);
  if (!success) {
    const errorMsg = error.issues[0].message || 'invalid credentials';
    return throwApiError(400, errorMsg);
  }

  const user = await User.findByEmail(data.email);
  if (!user) return throwApiError(400, 'User not found.');

  const isMatch = await user.isPasswordMatch(data.password);
  if (!isMatch) return throwApiError(400, 'Invalid credentials.');

  const safeUser = user.toSafeObject();

  const accessToken = issueAccessToken(safeUser);
  const refreshToken = issueRefreshToken(safeUser);
  const expiresAt = new Date(Date.now() + REFRESH_EXPIRY_MS);

  await UserToken.findOneAndUpdate(
    { userId: safeUser._id, deviceId },
    { token: refreshToken, expiresAt },
    { upsert: true, new: true }
  );

  setRefreshCookie(res, refreshToken);
  return sendApiResponse(res, 200, 'Login successful.', {
    user: safeUser,
    jwtToken: accessToken,
  });
});
