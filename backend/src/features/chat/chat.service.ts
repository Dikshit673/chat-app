import { Brand } from '@/types/brand.js';

import { ConversationId } from '../conversation/conversation.types.js';
import { UserId } from '../user/user.types.js';
import { ChatRepo } from './chat.repo.js';

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
