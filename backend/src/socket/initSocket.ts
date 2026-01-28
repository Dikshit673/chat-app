import { type Server } from 'socket.io';

import { AppServices } from '@/infra/app/app.container.js';

import registerMessageHandlers from './listeners/message.js';
import registerPresenceHandlers from './listeners/presence.js';
import registerTypingHandlers from './listeners/typing.js';
import { buildSocketAuth } from './socket.auth.js';

type SocketAppConfig = {
  services: AppServices;
};

export default function initSocket(io: Server, config: SocketAppConfig) {
  // socket auth middleware
  io.use(buildSocketAuth(config.services.v1));

  // shared in-memory store
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    const user = socket.user;
    if (!user) return;
    const userId = user.id.toString();

    // join personal room
    socket.join(userId);
    socket.emit('connected', { onlineUsers });
    console.log('User connected 🗼 userId: ', userId);

    // register presence + messages
    registerPresenceHandlers(io, socket, onlineUsers);
    registerMessageHandlers(io, socket, onlineUsers);
    registerTypingHandlers(io, socket, onlineUsers);
  });
}
