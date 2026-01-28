import type { ChatRepo } from './chat.repo.js';
import { Chat } from './chat.types.js';

export class ChatRepoMongo implements ChatRepo {
  async create(): Promise<Chat> {
    throw new Error('Method not implemented.');
  }

  async findByConversationId(): Promise<Chat[]> {
    throw new Error('Method not implemented.');
  }

  async markAsSeen(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
