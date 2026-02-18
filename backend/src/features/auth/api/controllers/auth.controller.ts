import { ApiError } from '@/utils/error/error.js';
import { asyncHandler } from '@/utils/handler/reqHandlers.js';
import { sendApiResponse } from '@/utils/response/index.js';

import { AuthUseCase } from '../../application/auth.usecase.js';
import type { AuthCookieService } from '../../auth-cookies/index.js';
import { AuthValidation } from '../../validation/auth.validation.js';

export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly authCookieService: AuthCookieService,
    private readonly authValidations: AuthValidation
  ) {}

  register = asyncHandler(async (req, res) => {
    const { email, password, name } = this.authValidations.register(req.body);
    const { tokens } = await this.authUseCase.register(email, password, name);

    this.authCookieService.setAuth(res, tokens);
    sendApiResponse(res, 201, 'User created successfully.');
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = this.authValidations.login(req.body);
    const { user, tokens } = await this.authUseCase.login(email, password);

    this.authCookieService.setAuth(res, tokens);
    sendApiResponse(res, 200, 'Logged in successfully.', { user });
  });

  logout = asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user) throw new ApiError(400, 'User not found.');
    // await this.authUseCase.logout(user.id);
    this.authCookieService.clearAuth(res);
    sendApiResponse(res, 200, 'Logged out successfully');
  });

  logoutAll = asyncHandler(async (req, res) => {
    const { user } = req;
    if (!user) throw new ApiError(400, 'User not found.');
    // await this.authUseCase.logout(user.id);
    this.authCookieService.clearAuth(res);
    sendApiResponse(res, 200, 'Logged out from all devices successfully');
  });

  refresh = asyncHandler(async (req, res) => {
    const cookieToken = this.authCookieService.getRefresh(req);
    const { user, tokens } = await this.authUseCase.refresh(cookieToken);
    this.authCookieService.setAuth(res, tokens);
    sendApiResponse(res, 200, 'Refreshed successfully.', { user });
  });

  checkAuth = asyncHandler(async (req, res) => {
    const inReqUser = req.user;
    if (!inReqUser) throw new ApiError(401, 'Unauthorized');
    const { user, tokens } = await this.authUseCase.checkMe(inReqUser.id);
    this.authCookieService.setAuth(res, tokens);
    sendApiResponse(res, 200, 'Authenticated successfully', { user });
  });
}
