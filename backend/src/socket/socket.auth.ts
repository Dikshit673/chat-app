import cookie from 'cookie';
import { type ExtendedError, Socket } from 'socket.io';

import { ACC_COOKIE_NAME } from '@/constants.js';
import { getAccessTokenUser } from '@/utils/auth/tokens.js';

export default function socketAuth(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  console.log(socket.request);
  const cookies = cookie.parse(socket.request.headers.cookie || '');
  console.log(cookies);

  const accessToken = cookies[ACC_COOKIE_NAME];
  if (!accessToken) {
    return next(new Error('Unauthorized'));
  }

  console.log(accessToken);
  // const token = socket.handshake.auth?.token;
  // if (!token) return next(new Error('Auth token required'));
  try {
    // const parsed = getAccessTokenUser(token);
    const parsed = getAccessTokenUser(accessToken);
    if (!parsed.success) return next(new Error('Invalid token'));
    socket.user = parsed.data.user;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
}
