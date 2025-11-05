import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter, Heading } from '@/components/ui';

const OnlineContactsPresenter = () => {
  const onlineUsers = userDummyData.filter((user) =>
    onlineUsersDummyData.includes(user._id)
  );
  return (
    <div className="slide-hidden overflow-x-auto p-1.5">
      <div className="flex items-center gap-2">
        {onlineUsers.map((user) => {
          const isOnline = onlineUsersDummyData.includes(user._id);
          return (
            <AvatarPresenter
              key={user._id}
              src={user.profilePic}
              alt={user.fullName}
              fallback={user.fullName}
              status={isOnline ? 'online' : 'offline'}
            />
          );
        })}
      </div>
    </div>
  );
};

const OnlineContacts = () => {
  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2 px-4">
      <Heading.H6 title="online" />
      <OnlineContactsPresenter />
    </div>
  );
};

export default OnlineContacts;
