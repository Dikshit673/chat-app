import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter, Heading } from '@/components/ui';

const ContactItem = ({ user }: { user: (typeof userDummyData)[0] }) => {
  const isOnline = onlineUsersDummyData.includes(user._id);
  return (
    <div className="flex gap-2 rounded-lg p-2 hover:bg-gray-400/20">
      <AvatarPresenter
        key={user._id}
        src={user.profilePic}
        alt={user.fullName}
        fallback={user.fullName}
        status={isOnline ? 'online' : 'offline'}
      />
      <div>
        <p>{user.fullName}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};

const ContactsPresenter = () => {
  return (
    <div className="slide-thin overflow-y-auto px-4">
      {userDummyData.map((user) => {
        return <ContactItem key={user._id} user={user} />;
      })}
    </div>
  );
};

const AllContacts = () => {
  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2 space-y-1 overflow-hidden">
      <Heading.H6 title="all contacts" className="px-4" />
      <ContactsPresenter />
    </div>
  );
};

export default AllContacts;
