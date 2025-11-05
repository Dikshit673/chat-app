import { messagesDummyData, userDummyData } from '@/assets/assets';
import { cn } from '@/lib/utils';
import { formatTime } from '@/utils/formatDateAndTime';
import { cva } from 'class-variance-authority';
import { useMemo } from 'react';

const messageWrapperCVA = cva('flex items-end rounded-xl p-2', {
  variants: {
    isOwnerMessage: {
      true: 'bg-prime-100 justify-self-end rounded-br-none',
      false: 'justify-self-start rounded-bl-none bg-indigo-700/20',
    },
  },
});

type MessageItemProps = {
  message: (typeof messagesDummyData)[0];
};

const MessageItem = ({ message }: MessageItemProps) => {
  const authUser = userDummyData[0];
  const isOwnerMessage = useMemo(
    () => message.senderId === authUser._id,
    [message.senderId, authUser._id]
  );
  const formatedTime = useMemo(
    () => formatTime(message.createdAt),
    [message.createdAt]
  );
  console.log({ id: authUser._id, sender: message.senderId, isOwnerMessage });
  return (
    <div className={cn(messageWrapperCVA({ isOwnerMessage }))}>
      <div className="inline-flex flex-col gap-2">
        {message.image && (
          <img
            src={message.image}
            alt={message._id}
            className="w-50 rounded-lg object-cover"
          />
        )}
        {message.text && <p>{message.text}</p>}
        <span className="text-end text-[0.75rem] font-normal text-gray-500">
          {formatedTime}
        </span>
      </div>
    </div>
  );
};

const ChatBody = () => {
  return (
    <div className="bg-prime-200 grid h-full grid-cols-1 gap-4 overflow-hidden">
      <div className="slide-thin h-full space-y-2 overflow-y-auto px-5 py-5">
        {/* <div className="flex flex-col gap-2"> */}
        {messagesDummyData.map((message) => {
          return <MessageItem key={message._id} message={message} />;
        })}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ChatBody;
