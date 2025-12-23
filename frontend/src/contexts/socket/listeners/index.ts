import type { AppDispatch } from '@/app/store';
import type { Socket } from 'socket.io-client';
import { registerMessageListeners } from './message.listeners';
import { registerPresenceListeners } from './presence.listeners';
import { registerTypingListeners } from './typing.listeners';

export const registerAllListeners = (socket: Socket, dispatch: AppDispatch) => {
  const cleanups = [
    registerMessageListeners(socket, dispatch),
    registerTypingListeners(socket, dispatch),
    registerPresenceListeners(socket, dispatch),
  ];
  console.log(cleanups);

  return () => {
    cleanups.forEach((cleanup) => cleanup?.());
  };
};
