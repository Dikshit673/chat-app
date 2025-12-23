import { type ExtendedError, Socket } from 'socket.io';

import { getAccessTokenUser } from '@/utils/auth/tokens.js';

export default function socketAuth(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error('Auth token required'));
  try {
    const parsed = getAccessTokenUser(token);
    if (!parsed.success) return next(new Error('Invalid token'));
    socket.user = parsed.data.user;
    next();
  } catch (err) {
    next(new Error('Invalid token'));
  }
}
