import type { Socket } from 'socket.io-client';

import type { AppDispatch } from '@/app/store';

import { bindListeners } from '../helpers/bindListeners';
import type { CleanupFn } from '../types/socket.type';

type PresenceSocketEvents = {
  'user:online': [string];
  'user:offline': [string];
};

const onlineUserListener = (userId: string) =>
  console.log('user online', userId);
const offlineUserListener = (userId: string) =>
  console.log('user offline', userId);

export const registerPresenceListeners = (
  socket: Socket,
  _dispatch: AppDispatch
): CleanupFn => {
  return bindListeners<PresenceSocketEvents>(socket, {
    'user:online': onlineUserListener,
    'user:offline': offlineUserListener,
  });
};
