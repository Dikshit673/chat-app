import { Card } from '@/components/ui';

import AllContacts from './components/AllContacts';
import OnlineContacts from './components/OnlineContacts';
import SearchContacts from './components/SearchContacts';

export const Sidebar = () => {
  return (
    <Card className='h-full w-60 overflow-hidden transition-transform duration-300 ease-in-out md:w-75'>
      <aside className='grid size-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-2 py-4 *:not-last:px-4 *:last:*:px-4'>
        <OnlineContacts />
        <SearchContacts />
        <AllContacts />
      </aside>
    </Card>
  );
};
