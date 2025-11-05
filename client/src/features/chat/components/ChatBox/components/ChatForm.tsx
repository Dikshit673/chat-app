import { Button } from '@/components/ui';

const ChatForm = () => {
  return (
    <div className="bg-prime-200 px-5 py-4">
      <form action="">
        <div className="flex items-center gap-2">
          <input
            id="chat-message-input"
            name="message"
            type="text"
            placeholder="Type a message"
            className="bg-prime-100 w-full rounded-lg px-4 py-2"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
