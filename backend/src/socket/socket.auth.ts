import cookie from 'cookie';
import { type ExtendedError, Socket } from 'socket.io';

import { COOKIE_NAMES } from '@/constants.js';
import { getAccessTokenUser } from '@/utils/auth/tokens.js';

export default function socketAuth(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  console.log(socket.request);
  const cookies = cookie.parse(socket.request.headers.cookie || '');
  console.log(cookies);

  const accessToken = cookies[COOKIE_NAMES.access];
  if (!accessToken) {
    return next(new Error('Unauthorized'));
  }

  console.log(accessToken);
  // const token = socket.handshake.auth?.token;
  // if (!token) return next(new Error('Auth token required'));
  try {
    const { success, data } = getAccessTokenUser(accessToken);
    if (!success) return next(new Error('Unauthorized'));
    socket.user = data;
    next();
  } catch (err) {
    next(new Error('Unauthorized'));
  }
}
