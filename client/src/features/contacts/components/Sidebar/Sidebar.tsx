import { Card } from '@/components/ui';
import OnlineContacts from './components/OnlineContacts';

const Sidebar = () => {
  return (
    <aside className="size-full">
      <Card className="size-full py-2">
        <OnlineContacts />
      </Card>
    </aside>
  );
};

export default Sidebar;
