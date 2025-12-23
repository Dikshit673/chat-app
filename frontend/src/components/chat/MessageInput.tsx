import { useState } from 'react';
import { Button, Input } from '../ui';

type Props = {
  onSend: (text: string) => void;
};
export default function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('');
  const send = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };
  return (
    <div className='flex gap-2'>
      <Input
        label=''
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        placeholder='Write a message...'
        className='flex-1'
      />
      <Button onClick={send} style={{ padding: '8px 12px', borderRadius: 8 }}>
        Send
      </Button>
    </div>
  );
}
