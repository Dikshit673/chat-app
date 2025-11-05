import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter, Heading } from '@/components/ui';

const OnlineContacts = () => {
  const onlineUsers = userDummyData.filter((user) =>
    onlineUsersDummyData.includes(user._id)
  );
  return (
    <div className="p-4">
      <Heading.H6 title="online" />
      <div className="slide-hidden overflow-x-auto px-1">
        <div className="flex gap-2 py-4">
          {onlineUsers.map((user) => {
            return (
              <div key={user._id} className="shrink-0">
                <AvatarPresenter
                  src={user.profilePic}
                  alt={user.fullName}
                  fallback={user.fullName}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnlineContacts;
