import cookie from 'cookie';
import { type ExtendedError, Socket } from 'socket.io';

import { AUTH_COOKIES } from '@/features/auth/auth-cookies/auth.cookie.constants.js';
import { authTokenService } from '@/features/auth/auth-tokens/auth.token.provider.js';

export function buildSocketAuth() {
  const tokenService = authTokenService();
  return (socket: Socket, next: (err?: ExtendedError) => void) => {
    console.log(socket.request);
    const cookies = cookie.parse(socket.request.headers.cookie || '');
    console.log(cookies);

    const accessToken = cookies[AUTH_COOKIES.ACCESS];
    if (!accessToken) {
      return next(new Error('Unauthorized'));
    }

    console.log(accessToken);
    // const token = socket.handshake.auth?.token;
    // if (!token) return next(new Error('Auth token required'));
    try {
      socket.user = tokenService.getAccessPayload(accessToken);
      next();
    } catch (err) {
      next(new Error('Unauthorized'));
    }
  };
}
