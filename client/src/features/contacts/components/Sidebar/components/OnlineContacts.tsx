import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter, Heading } from '@/components/ui';

const OnlineContacts = () => {
  const onlineUsers = userDummyData.filter((user) =>
    onlineUsersDummyData.includes(user._id)
  );
  return (
    <div className="space-y-1 px-4">
      <Heading.H6 title="online" />
      <div className="slide-hidden overflow-x-auto p-1.5">
        <div className="flex items-center gap-2">
          {onlineUsers.map((user) => {
            return (
              <AvatarPresenter
                key={user._id}
                src={user.profilePic}
                alt={user.fullName}
                fallback={user.fullName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnlineContacts;
