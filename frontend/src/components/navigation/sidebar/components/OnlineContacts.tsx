import { useNavigate } from 'react-router';

import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter, Heading } from '@/components/ui';

const OnlineContactsPresenter = () => {
  const navigate = useNavigate();
  const onlineUsers = userDummyData.filter((user) =>
    onlineUsersDummyData.includes(user._id)
  );

  const handleAvatarClick = (id: string) => {
    navigate(`/chats/${id}`);
  };

  return (
    <div className='slide-hidden overflow-x-auto p-1'>
      <div className='flex items-center gap-2'>
        {onlineUsers.map((user) => {
          return (
            <AvatarPresenter
              key={user._id}
              src={user.profilePic}
              alt={user.fullName}
              fallback={user.fullName}
              onClick={() => handleAvatarClick(user._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

const OnlineContacts = () => {
  return (
    <div className='grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2 px-4'>
      <Heading.H6>Online</Heading.H6>
      <OnlineContactsPresenter />
    </div>
  );
};

export default OnlineContacts;
