import { MessageModel } from '@/models/message.model.js';
import type { ConversationId } from '@/modules/conversation/conversation.types.js';
import { conversationIdSchema } from '@/modules/conversation/conversation.validation.schema.js';
import type { UserId } from '@/modules/user/user.types.js';
import { userIdSchema } from '@/modules/user/user.validation.schema.js';

import type { MessageRepository } from './message.repository.js';
import type { Message, MessageId } from './message.types.js';
import { messageIdSchema } from './message.validation.schema.js';

export class MessageRepositoryMongo implements MessageRepository {
  async create(message: Message): Promise<Message> {
    const doc = await MessageModel.create({
      conversationId: message.conversationId,
      senderId: message.senderId,
      text: message.text,
      seenBy: [message.senderId],
    });

    const id = messageIdSchema.parse(doc._id.toString());
    const conversationId = conversationIdSchema.parse(
      doc.conversationId!.toString()
    );
    const senderId = userIdSchema.parse(doc.senderId!.toString());

    return {
      id,
      conversationId,
      senderId,
      text: doc.text || '',
      seenBy: doc.seenBy.map(String),
      createdAt: doc.createdAt,
    };
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
      .limit(limit)
      .lean();
    return docs.map((doc) => {
      const id = messageIdSchema.parse(doc._id.toString());
      const conversationId = conversationIdSchema.parse(
        doc.conversationId!.toString()
      );
      const senderId = userIdSchema.parse(doc.senderId!.toString());
      return {
        id,
        conversationId,
        senderId,
        text: doc.text || '',
        seenBy: doc.seenBy.map(String),
        createdAt: doc.createdAt,
      };
    });
  }

  async markAsSeen(messageId: MessageId, userId: UserId): Promise<void> {
    await MessageModel.findByIdAndUpdate(messageId, {
      $addToSet: { seenBy: userId },
    });
  }
}
