import { Card } from '@/components/ui';
import OnlineContacts from './components/OnlineContacts';
import SearchContacts from './components/SearchContacts';

const Sidebar = () => {
  return (
    <aside className="size-full">
      <Card className="size-full">
        <div className="h-full space-y-2">
          <OnlineContacts />
          <SearchContacts />
        </div>
      </Card>
    </aside>
  );
};

export default Sidebar;
