import { type Server } from 'socket.io';

import registerMessageHandlers from './listeners/message.js';
import registerPresenceHandlers from './listeners/presence.js';
import registerTypingHandlers from './listeners/typing.js';
import socketAuth from './socket.auth.js';

export default function initSocket(io: Server) {
  // socket auth middleware
  io.use(socketAuth);

  // shared in-memory store
  const onlineUsers = new Map();

  io.on('connection', (socket) => {
    const user = socket.user;
    if (!user) return;
    const userId = user._id.toString();

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
