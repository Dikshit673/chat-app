import { messagesDummyData, userDummyData } from '@/assets/assets';
import { cn } from '@/lib/utils';
import { formatTime } from '@/utils/formatDateAndTime';
import { cva } from 'class-variance-authority';
import { useMemo } from 'react';

const chatWrapperCVA = cva('flex items-end rounded-xl p-2', {
  variants: {
    isOwnerMessage: {
      true: 'bg-prime-100 justify-self-end rounded-br-none',
      false: 'justify-self-start rounded-bl-none bg-indigo-700/20',
    },
  },
});

type ChatItemProps = {
  chat: (typeof messagesDummyData)[0];
};

const ChatItem = ({ chat }: ChatItemProps) => {
  const { _id, senderId, image, text, createdAt } = chat;
  const authUser = userDummyData[0];
  const isOwnerMessage = useMemo(
    () => senderId === authUser._id,
    [senderId, authUser._id]
  );
  const formatedTime = useMemo(() => formatTime(createdAt), [createdAt]);
  console.log({ id: authUser._id, sender: senderId, isOwnerMessage });
  return (
    <div className={cn(chatWrapperCVA({ isOwnerMessage }))}>
      <div className="inline-flex flex-col gap-2">
        {image && (
          <img src={image} alt={_id} className="w-50 rounded-lg object-cover" />
        )}
        {text && <p>{text}</p>}
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
      <div className="slide-thin h-full space-y-2 overflow-y-auto px-5 py-4">
        {/* <div className="flex flex-col gap-2"> */}
        {messagesDummyData.map((chat) => {
          return <ChatItem key={chat._id} chat={chat} />;
        })}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ChatBody;
