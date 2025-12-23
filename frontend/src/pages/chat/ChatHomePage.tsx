// import ChatList from '@/components/chat/ChatList';

import { MessageSquare } from 'lucide-react';

export default function ChatHomePage() {
  return (
    <div className='flex h-full flex-col items-center justify-center text-center'>
      <h2 className='flex flex-col items-center py-2'>
        <MessageSquare className='size-18 stroke-current stroke-3' />
        <span className='ml-2 text-2xl font-bold'>ChatApp for Browser</span>
      </h2>
      <p className='text-base'>Send and receive messages in real-time.</p>
    </div>
  );
}
