import {
  type IMessageDocument,
  MessageModel,
} from '@/application/db/mongo/models/message.model.js';
import { type ConversationId } from '@/features/conversation/domain/conversation.types.js';
import { parseAsConversationId } from '@/features/conversation/infra/mongo/pasreAsConversationId.js';
import { type UserId } from '@/features/user/domain/user.types.js';
import { parseAsUserId } from '@/features/user/infra/mongo/parseAsUserId.js';

import { type Message, type MessageId } from '../../domain/message.types.js';
import { type MessageRepo } from '../interface/message.repo.js';
import { parseAsMessageId } from './parseAsMessageId.js';

export class MessageRepoMongo implements MessageRepo {
  async create(message: Message): Promise<Message> {
    const doc = await MessageModel.create({
      conversationId: message.conversationId,
      senderId: message.senderId,
      text: message.text,
      seenBy: [message.senderId],
    });

    return this.mapMessageDoc(doc);
  }

  async findByConversationId(
    conversationId: ConversationId,
    limit: number,
    cursor?: Date
  ): Promise<Message[]> {
    const query: { conversationId: ConversationId; createdAt?: { $lt: Date } } =
      {
        conversationId,
      };
    if (cursor) query.createdAt = { $lt: cursor };

    const docs = await MessageModel.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);
    return docs.map((doc) => this.mapMessageDoc(doc));
  }

  async markAsSeen(messageId: MessageId, userId: UserId): Promise<void> {
    await MessageModel.findByIdAndUpdate(messageId, {
      $addToSet: { seenBy: userId },
    });
  }

  private mapMessageDoc(doc: IMessageDocument): Message {
    return Object.freeze({
      id: parseAsMessageId(doc._id),
      conversationId: parseAsConversationId(doc.conversationId),
      senderId: parseAsUserId(doc.senderId),
      text: doc.text || '',
      seenBy: doc.seenBy.map(String),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
