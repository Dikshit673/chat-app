import { useParams } from 'react-router';
import { AvatarPresenter } from '../ui';
import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { Ellipsis } from 'lucide-react';

const ChatHeader = () => {
  const { chatId } = useParams();

  if (!chatId) return null;

  const user = userDummyData.find((user) => user._id === chatId);
  if (!user) return null;
  const isOnline = onlineUsersDummyData.includes(user._id);
  return (
    <div className='bg-card flex items-center justify-between gap-2 p-4 shadow-md'>
      <div className='flex cursor-pointer items-center justify-start gap-2 rounded-lg'>
        <AvatarPresenter
          src={user.profilePic}
          fallback={user.fullName}
          size='md'
        />

        <div className='flex flex-col'>
          <span className='font-serif text-[0.875rem] font-medium capitalize'>
            {user.fullName}
          </span>
          <span className='text-[0.75rem] font-normal text-gray-500'>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      <div>
        <Ellipsis />
      </div>
    </div>
  );
};

export default ChatHeader;
