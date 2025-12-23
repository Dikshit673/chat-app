import { Server, Socket } from 'socket.io';

import { OnlineUsersMap } from '../socket.types.js';

type TypingPayload = {
  recieverId: string;
};

export default function registerTypingHandlers(
  io: Server,
  socket: Socket,
  onlineUsers: OnlineUsersMap
) {
  const user = socket.user;
  if (!user) return;
  // user._id.toString();

  socket.on('typing:start', ({ recieverId }: TypingPayload) => {
    const onlineUser = onlineUsers.get(recieverId);
    if (!onlineUser) return;
    io.to(onlineUser).emit('typing:start', {
      senderId: socket.user?._id.toString(),
    });
  });

  socket.on('typing:stop', ({ recieverId }: TypingPayload) => {
    const onlineUser = onlineUsers.get(recieverId);
    if (!onlineUser) return;
    io.to(onlineUser).emit('typing:stop', {
      senderId: socket.user?._id,
    });
  });
}
