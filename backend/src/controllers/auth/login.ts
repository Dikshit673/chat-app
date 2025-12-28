import { REFRESH_EXPIRY_MS } from '@/constants.js';
import { User } from '@/models/user.model.js';
import { UserToken } from '@/models/userToken.model.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { issueAuthState } from '@/utils/auth/authState.js';
import {
  setAccessCookie,
  setAuthStateCookie,
  setCsrfCookie,
  setRefreshCookie,
} from '@/utils/auth/cookies.js';
import { getCsrfToken } from '@/utils/auth/csrfToken.js';
import { issueAccessToken, issueRefreshToken } from '@/utils/auth/tokens.js';
import { sendApiResponse, throwApiError } from '@/utils/sendResponse.js';
import { loginUserSchema } from '@/validations/user.validation.js';

export const login = asyncHandler(async (req, res) => {
  // get device id
  const { body, deviceId } = req;
  if (!deviceId) return throwApiError(400, 'Device id is required.');

  // validate credentials
  const { success, data, error } = loginUserSchema.safeParse(body);
  if (!success) {
    // Todo: Add better error message
    const errorMsg = error.issues[0].message || 'invalid credentials';
    return throwApiError(400, errorMsg);
  }

  // get user
  const user = await User.findByEmail(data.email);
  if (!user) return throwApiError(400, 'User not found.');

  // validate password
  const isMatch = await user.isPasswordMatch(data.password);
  if (!isMatch) return throwApiError(400, 'Invalid credentials.');

  // make user safe to send
  const safeUser = user.toSafeObject();

  // issue tokens
  const accessToken = issueAccessToken(safeUser);
  const refreshToken = issueRefreshToken(safeUser);
  const authState = issueAuthState(true);
  const csrfToken = getCsrfToken();

  // update refresh token
  const refreshTokenExpiresAt = new Date(Date.now() + REFRESH_EXPIRY_MS);
  await UserToken.findOneAndUpdate(
    { userId: safeUser._id, deviceId },
    { token: refreshToken, expiresAt: refreshTokenExpiresAt },
    { upsert: true, new: true }
  );

  // set cookies
  setAccessCookie(res, accessToken);
  setRefreshCookie(res, refreshToken);
  setAuthStateCookie(res, authState);
  setCsrfCookie(res, csrfToken);

  // send response
  return sendApiResponse(res, 200, 'Login successful.', {
    user: safeUser,
  });
});
