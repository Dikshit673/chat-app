import type { AppDispatch } from '@/app/store';
import type { Message } from '@/features/messages/message.types';
import type { Socket } from 'socket.io-client';
import { bindListeners } from '../helpers/bindListeners';
import type { CleanupFn } from '../types/socket.type';

// export const old_registerMessageListeners = (
//   socket: Socket,
//   _dispatch: AppDispatch
// ) => {
//   socket.on('message:new', (msg) => {
//     console.log('new message ', msg);
//     // dispatch(addMessage(msg));
//   });

//   socket.on('message:sync', (msgs) => {
//     console.log('sync messages ', msgs);
//     // dispatch(addManyMessages(msgs));
//   });

//   return () => {
//     socket.off('message:new');
//     socket.off('message:sync');
//   };
// };

const newMessageListener = (msg: Message) => console.log('new message ', msg);

const syncMessagesListener = (msgs: Message[]) =>
  console.log('sync messages ', msgs);

export const registerMessageListeners = (
  socket: Socket,
  _dispatch: AppDispatch
): CleanupFn => {
  return bindListeners(socket, {
    'message:new': newMessageListener,
    'message:sync': syncMessagesListener,
  });
};
