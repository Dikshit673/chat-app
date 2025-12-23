import type { AppDispatch } from '@/app/store';
import type { Socket } from 'socket.io-client';
import { bindListeners } from '../helpers/bindListeners';
import type { CleanupFn } from '../types/socket.type';

export const old_registerTypingListeners = (
  socket: Socket,
  _dispatch: AppDispatch
) => {
  socket.on('typing:start', ({ from }: { from: unknown }) => {
    console.log('typing:start', from);
    // dispatch(setTyping({ userId: from, typing: true }));
  });

  socket.on('typing:stop', ({ from }: { from: unknown }) => {
    console.log('typing:stop', from);
    // dispatch(setTyping({ userId: from, typing: false }));
  });

  return () => {
    socket.off('typing:start');
    socket.off('typing:stop');
  };
};

const startTypingListener = () => console.log('typing:start');
const stopTypingListener = () => console.log('typing:stop');

export const registerTypingListeners = (
  socket: Socket,
  _dispatch: AppDispatch
): CleanupFn => {
  return bindListeners(socket, {
    'typing:start': startTypingListener,
    'typing:stop': stopTypingListener,
  });
};
