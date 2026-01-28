import { Server, Socket } from 'socket.io';

import registerMessageHandlers from './listeners/message.js';
import registerPresenceHandlers from './listeners/presence.js';
import registerTypingHandlers from './listeners/typing.js';

export function buildSocketFactory(
  io: Server,
  socket: Socket,
  onlineUsers: Map<string, string>
) {
  return {
    presence: () => registerPresenceHandlers(io, socket, onlineUsers),
    message: () => registerMessageHandlers(io, socket, onlineUsers),
    typing: () => registerTypingHandlers(io, socket, onlineUsers),
  };
}

export type SocketFactoryType = ReturnType<typeof buildSocketFactory>;
