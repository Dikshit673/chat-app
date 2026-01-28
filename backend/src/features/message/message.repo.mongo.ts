import type { ConversationId } from '@/features/conversation/conversation.types.js';
import type { UserId } from '@/features/user/user.types.js';
import {
  IMessageDocument,
  MessageModel,
} from '@/infra/db/models/message.model.js';

import { objectIdParser } from '../shared/utils/objectId.parser.js';
import type { MessageRepo } from './message.repo.js';
import type { Message, MessageId } from './message.types.js';

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
      id: objectIdParser.asMessageId(doc._id),
      conversationId: objectIdParser.asConversationId(doc.conversationId),
      senderId: objectIdParser.asUserId(doc.senderId),
      text: doc.text || '',
      seenBy: doc.seenBy.map(String),
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}
