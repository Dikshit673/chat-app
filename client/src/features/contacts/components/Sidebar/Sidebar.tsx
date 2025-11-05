import { Card } from '@/components/ui';
import OnlineContacts from './components/OnlineContacts';
import SearchContacts from './components/SearchContacts';
import AllContacts from './components/AllContacts';

const Sidebar = () => {
  return (
    <aside className="size-full overflow-hidden">
      <Card className="size-full">
        <div className="grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-2">
          <OnlineContacts />
          <SearchContacts />
          <AllContacts />
        </div>
      </Card>
    </aside>
  );
};

export default Sidebar;
