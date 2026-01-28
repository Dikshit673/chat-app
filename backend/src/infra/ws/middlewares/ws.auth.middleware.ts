import cookie from 'cookie';
import { type ExtendedError, Socket } from 'socket.io';

import { COOKIE_NAMES } from '@/features/auth/auth.constant.js';
import { V1Services } from '@/infra/app/app.container.js';

export function buildSocketAuth(services: V1Services) {
  return (socket: Socket, next: (err?: ExtendedError) => void) => {
    console.log(socket.request);
    const cookies = cookie.parse(socket.request.headers.cookie || '');
    console.log(cookies);

    const accessToken = cookies[COOKIE_NAMES.ACCESS];
    if (!accessToken) {
      return next(new Error('Unauthorized'));
    }

    console.log(accessToken);
    // const token = socket.handshake.auth?.token;
    // if (!token) return next(new Error('Auth token required'));
    try {
      socket.user = services.tokenIssuer.getAccessPayload(accessToken);
      next();
    } catch (err) {
      next(new Error('Unauthorized'));
    }
  };
}
