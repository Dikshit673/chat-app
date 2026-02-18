import { Socket } from 'socket.io';

import { type ChatService, type RoomId } from '@/features/chat/chat.service.js';
import { type ConversationId } from '@/features/conversation/domain/conversation.types.js';
import { type UserId } from '@/features/user/domain/user.types.js';

export class ChatWsAdapter {
  constructor(private readonly chatService: ChatService) {}

  register(socket: Socket) {
    socket.on('JOIN_ROOM', this.joinRoom(socket));
    socket.on('SEND_MESSAGE', this.sendMessage(socket));
  }

  private joinRoom(socket: Socket) {
    return async (roomId: string) => {
      if (!socket.user) return;
      await this.chatService.joinConversation(
        socket.user?.id,
        roomId as RoomId
      );

      socket.join(roomId);
    };
  }

  private sendMessage(socket: Socket) {
    return async (payload: {
      conversationId: ConversationId;
      content: string;
    }) => {
      const result = await this.chatService.sendMessage({
        senderId: socket.user?.id.toString() as UserId,
        conversationId: payload.conversationId,
        content: payload.content,
      });

      socket.to(payload.conversationId).emit('MESSAGE_CREATED', result);
    };
  }
}
