import { onlineUsersDummyData, userDummyData } from '@/assets/assets';
import { AvatarPresenter, Heading } from '@/components/ui';
import type { ComponentProps } from 'react';
import { useNavigate } from 'react-router';

type ContactItemProps = ComponentProps<'li'> & {
  user: (typeof userDummyData)[0];
};

const ContactItem = ({ user, className, ...props }: ContactItemProps) => {
  const isOnline = onlineUsersDummyData.includes(user._id);
  return (
    <li data-id={user._id} {...props}>
      <button
        type='button'
        className='flex w-full gap-2 rounded-lg p-2 hover:bg-gray-400/20'
      >
        <AvatarPresenter
          key={user._id}
          src={user.profilePic}
          alt={user.fullName}
          fallback={user.fullName}
          status={isOnline ? 'online' : 'offline'}
          showStatus
        />
        <div>
          <p>{user.fullName}</p>
          <p className='text-xs text-gray-500'>{user.email}</p>
        </div>
      </button>
    </li>
  );
};

const ContactsPresenter = () => {
  const navigate = useNavigate();

  const handleListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const liElement = target.closest('li');
    if (!liElement) return;

    const id = liElement.getAttribute('data-id');
    if (!id) return;

    navigate(`/chats/${id}`);
  };
  return (
    <div className='slide-thin h-full overflow-y-auto'>
      <ul className='h-max' onClick={handleListClick}>
        {userDummyData.map((user) => {
          return <ContactItem key={user._id} user={user} />;
        })}
      </ul>
    </div>
  );
};

const AllContacts = () => {
  return (
    <div className='grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-2 overflow-hidden'>
      <Heading.H6>All contacts</Heading.H6>
      <ContactsPresenter />
    </div>
  );
};

export default AllContacts;
