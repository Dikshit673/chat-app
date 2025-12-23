import { Server, Socket } from 'socket.io';

import { Message } from '@/models/message.model.js';

import {
  DeleteMessagePayload,
  OnlineUsersMap,
  ReadMessagePayload,
  SendMessagePayload,
  UpdateMessagePayload,
} from '../socket.types.js';

export default function registerMessageHandlers(
  io: Server,
  socket: Socket,
  onlineUsers: OnlineUsersMap
) {
  const user = socket.user;
  if (!user) return;
  const userId = user._id.toString();

  // 📦 deliver pending messages
  (async () => {
    const pending = await Message.find({
      recieverId: userId,
      status: 'sent',
    });

    for (const msg of pending) {
      socket.emit('message:receive', msg);
      msg.status = 'delivered';
      await msg.save();
    }
  })();

  // ✉️ send
  socket.on('message:send', async (payload: SendMessagePayload) => {
    const { recieverId, text } = payload;
    const receiverSocketId = onlineUsers.get(recieverId.toString());
    if (!receiverSocketId) return;
    const msg = await Message.create({
      senderId: userId,
      recieverId: receiverSocketId,
      text: text,
      status: 'sent',
    });

    io.to(receiverSocketId).emit('message:receive', msg);
    msg.status = 'delivered';
    await msg.save();

    socket.emit('message:sent', msg);
  });

  // 👁️ read
  socket.on('message:read', async ({ messageIds }: ReadMessagePayload) => {
    await Message.updateMany(
      { _id: { $in: messageIds }, recieverId: userId },
      { status: 'read' }
    );
  });

  // ✏️ update
  socket.on(
    'message:update',
    async ({ messageId, text }: UpdateMessagePayload) => {
      const msg = await Message.findOne({ _id: messageId, senderId: userId });
      if (!msg) return;

      msg.text = text;
      msg.edited = true;
      await msg.save();

      io.to(msg.recieverId.toString()).emit('message:update', msg);
      socket.emit('message:update', msg);
    }
  );

  // 🗑️ delete
  socket.on('message:delete', async ({ messageId }: DeleteMessagePayload) => {
    const msg = await Message.findOne({ _id: messageId, senderId: userId });
    if (!msg) return;

    await msg.deleteOne();
    io.to(msg.recieverId.toString()).emit('message:delete', { messageId });
    socket.emit('message:delete', { messageId });
  });
}
