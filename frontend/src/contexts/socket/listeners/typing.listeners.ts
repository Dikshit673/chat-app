import type { Socket } from 'socket.io-client';

import type { AppDispatch } from '@/app/store';

import { bindListeners } from '../helpers/bindListeners';
import type { CleanupFn } from '../types/socket.type';

type TypingSocketEvents = {
  'typing:start': [];
  'typing:stop': [];
};

const startTypingListener = () => console.log('typing:start');
const stopTypingListener = () => console.log('typing:stop');

export const registerTypingListeners = (
  socket: Socket,
  _dispatch: AppDispatch
): CleanupFn => {
  return bindListeners<TypingSocketEvents>(socket, {
    'typing:start': startTypingListener,
    'typing:stop': stopTypingListener,
  });
};
