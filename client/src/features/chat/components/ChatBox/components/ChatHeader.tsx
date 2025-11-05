import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';
import { useMemo } from 'react';

const ChatHeader = ({ user }: { user: (typeof userDummyData)[0] }) => {
  const isOnline = useMemo(() => {
    return onlineUsersDummyData.includes(user._id);
  }, [user._id]);
  const status = useMemo(() => {
    return isOnline ? 'online' : 'offline';
  }, [isOnline]);
  return (
    <div className="flex items-center justify-between gap-2 px-6 py-4">
      <div>
        <li
          className={cn(
            'flex cursor-pointer items-center justify-start gap-2 rounded-lg'
          )}
        >
          <AvatarPresenter
            src={user.profilePic}
            alt={user.fullName}
            fallback={user.fullName}
            size="lg"
            status={status}
          />

          <div className="flex flex-col">
            <span className="font-serif text-[0.875rem] font-medium capitalize">
              {user.fullName}
            </span>
            <span className="text-[0.75rem] font-normal text-gray-500">
              {status}
            </span>
          </div>
        </li>
      </div>
      <div>
        <Ellipsis />
      </div>
    </div>
  );
};

export default ChatHeader;
