import { Server, Socket } from 'socket.io';

import { OnlineUsersMap } from '../socket.types.js';

export default function registerPresenceHandlers(
  _io: Server,
  socket: Socket,
  onlineUsers: OnlineUsersMap
) {
  const user = socket.user;
  if (!user) return;
  const userId = user._id.toString();

  onlineUsers.set(userId, socket.id);
  socket.broadcast.emit('user:online', { userId });

  socket.on('disconnect', () => {
    onlineUsers.delete(userId);
    socket.broadcast.emit('user:offline', { userId });
  });
}
