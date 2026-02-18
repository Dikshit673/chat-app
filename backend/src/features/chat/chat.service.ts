import { type Brand } from '@/types/brand.js';

import { type ConversationId } from '../conversation/domain/conversation.types.js';
import { type UserId } from '../user/domain/user.types.js';
import { type ChatRepo } from './chat.repo.js';

export type RoomId = Brand<string, 'RoomId'>;

export class ChatService {
  constructor(private readonly chatRepo: ChatRepo) {}
  async sendMessage(payload: {
    senderId: UserId;
    conversationId: ConversationId;
    content: string;
  }) {
    return this.chatRepo.create();
  }

  async joinConversation(userId: UserId, roomId: RoomId) {
    return this.chatRepo.create();
  }
}
