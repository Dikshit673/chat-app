import type { AppDispatch } from '@/app/store';
import type { Socket } from 'socket.io-client';
import { bindListeners } from '../helpers/bindListeners';
import type { CleanupFn } from '../types/socket.type';

// export const old_registerPresenceListeners = (
//   socket: Socket,
//   _dispatch: AppDispatch
// ) => {
//   socket.on('user:online', (userId: unknown) => {
//     console.log('user online', userId);
//     // dispatch(userOnline(userId));
//   });

//   socket.on('user:offline', (userId: unknown) => {
//     console.log('user offline', userId);
//     // dispatch(userOffline(userId));
//   });

//   return () => {
//     socket.off('user:online');
//     socket.off('user:offline');
//   };
// };

const onlineUserListener = (userId: unknown) =>
  console.log('user online', userId);
const offlineUserListener = (userId: unknown) =>
  console.log('user offline', userId);

export const registerPresenceListeners = (
  socket: Socket,
  _dispatch: AppDispatch
): CleanupFn => {
  return bindListeners(socket, {
    'user:online': onlineUserListener,
    'user:offline': offlineUserListener,
  });
};
