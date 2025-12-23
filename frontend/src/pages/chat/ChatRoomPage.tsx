import { useEffect } from 'react';
import { useParams } from 'react-router';

import {
  selectMessagesByChat,
  useAppDispatch,
  useAppSelector,
} from '@/app/hooks';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageBubble from '@/components/chat/MessageBubble';
import MessageInput from '@/components/chat/MessageInput';
import { useSocket } from '@/contexts/socket/useSocket';
import type { Message } from '@/features/messages/message.types';
import { addMessage, setMessages } from '@/features/messages/messageSlice';

export default function ChatRoomPage() {
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const msgs = useAppSelector((s) => selectMessagesByChat(s, chatId));
  const allchat = useAppSelector((s) => s.messages.byChat);
  const { socket } = useSocket();

  useEffect(() => {
    console.log(allchat);
  }, [allchat]);

  useEffect(() => {
    // stub load
    if (chatId) {
      dispatch(
        setMessages({
          chatId,
          messages: [
            {
              id: 'm1',
              from: chatId,
              to: 'me',
              text: 'Hello',
              createdAt: new Date().toISOString(),
            },
          ],
        })
      );
    }
  }, [chatId, dispatch]);

  useEffect(() => {
    if (!socket) return;
    const handler = (m: Message) => dispatch(addMessage(m));
    socket.on('message', handler);
    return () => {
      socket.off('message', handler);
    };
  }, [socket, dispatch]);

  const onSend = (text: string) => {
    if (!chatId) return;
    const msg = {
      id: Date.now().toString(),
      from: 'me',
      to: chatId,
      text,
      createdAt: new Date().toISOString(),
    };
    // emit
    socket?.emit('message', msg);
    dispatch(addMessage(msg));
  };

  return (
    <div className='bg-chatbody grid h-full grid-cols-1 grid-rows-[auto_1fr]'>
      <ChatHeader />

      <div className='grid grid-rows-[1fr_auto] gap-2 overflow-hidden pt-2 pb-4 *:px-4'>
        <ul className='slide-thin overflow-y-auto'>
          {msgs.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              mine={msg.from === 'me'}
              time={msg.createdAt}
            />
          ))}
        </ul>

        <MessageInput onSend={onSend} />
      </div>
    </div>
  );
}
