import { AuthService } from '@/features/auth/auth.service.js';
import { createCookies } from '@/features/auth/cookies/cookie.factory.js';
import { CookieIssuer } from '@/features/auth/cookies/cookie.issuer.js';
import { CookieService } from '@/features/auth/cookies/cookie.service.js';
import { SessionRepoMongo } from '@/features/auth/session/session.repo.mongo.js';
import { SessionService } from '@/features/auth/session/session.service.js';
import { createTokens } from '@/features/auth/tokens/token.factory.js';
import { TokenIssuer } from '@/features/auth/tokens/token.issuer.js';
import { TokenService } from '@/features/auth/tokens/token.service.js';
import { UserRepoMongo } from '@/features/user/user.repo.mongo.js';

// app/container.ts
export function buildAppServices() {
  // repositories
  const userRepo = new UserRepoMongo();
  const sessionRepo = new SessionRepoMongo();

  // singleton services
  const tokenService = new TokenService(createTokens());
  const cookieService = new CookieService(createCookies());
  const sessionService = new SessionService(sessionRepo);

  // business services
  const tokenIssuer = new TokenIssuer(tokenService);
  const cookieIssuer = new CookieIssuer(cookieService);
  const authService = new AuthService(userRepo, tokenIssuer, sessionService);

  const v1 = { authService, cookieIssuer, tokenIssuer };

  return { v1 };
}

export type AppServices = ReturnType<typeof buildAppServices>;
export type V1Services = AppServices['v1'];
