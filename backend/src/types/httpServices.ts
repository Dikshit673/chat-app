// import { SessionService } from '@/modules/auth/session/session.service.js';
import { AuthService } from '@/features/auth/auth.service.js';
import { TokenService } from '@/features/auth/token/token.service.js';

export type RequiredServices = {
  authService: AuthService;
  tokenService: TokenService;
  //   sessionService: SessionService;
};
