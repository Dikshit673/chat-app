// import { SessionService } from '@/modules/auth/session/session.service.js';
import { AuthService } from '@/modules/auth/auth.service.js';
import { TokenService } from '@/modules/auth/token/token.service.js';

export type RequiredServices = {
  authService: AuthService;
  tokenService: TokenService;
  //   sessionService: SessionService;
};
