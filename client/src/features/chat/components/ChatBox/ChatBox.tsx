import { Card } from '@/components/ui';
import ChatHeader from './components/ChatHeader';
import { userDummyData } from '@/assets/assets';
import ChatBody from './components/ChatBody';
import ChatForm from './components/ChatForm';

const ChatBox = () => {
  return (
    <section className="size-full overflow-hidden">
      <Card className="size-full gap-0 p-0">
        <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr_auto]">
          <ChatHeader user={userDummyData[0]} />
          <ChatBody />
          <ChatForm />
        </div>
      </Card>
    </section>
  );
};

export default ChatBox;
