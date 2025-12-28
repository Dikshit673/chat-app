import type { Socket } from 'socket.io-client';

import type { AppDispatch } from '@/app/store';
import type { Message } from '@/features/messages/message.types';

import { bindListeners } from '../helpers/bindListeners';
import type { CleanupFn } from '../types/socket.type';

type MessageSocketEvents = {
  'message:new': [Message];
  'message:sync': [Message[]];
};

const newMessageListener = (msg: Message) => console.log('new message ', msg);

const syncMessagesListener = (msgs: Message[]) =>
  console.log('sync messages ', msgs);

export const registerMessageListeners = (
  socket: Socket,
  _dispatch: AppDispatch
): CleanupFn => {
  return bindListeners<MessageSocketEvents>(socket, {
    'message:new': newMessageListener,
    'message:sync': syncMessagesListener,
  });
};
