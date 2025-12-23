import { formatTime } from '@/utils/formatter';
import { cn } from 'tailwind-variants';

type Props = {
  text: string;
  mine?: boolean;
  time?: string;
};

export default function MessageBubble({ text, mine, time }: Props) {
  return (
    <li
      className={cn('my-2 flex flex-col', mine ? 'items-end' : 'items-start')}
    >
      <div
        className={cn(
          'border-border w-fit max-w-100 min-w-12.5 rounded-xl border px-4 py-2 text-wrap shadow-md',
          mine ? 'bg-message-sent text-card' : 'bg-message-recieved text-text'
        )}
      >
        <p className='text-base'>{text}</p>
      </div>
      {time && (
        <div className={'mt-1.5 text-right text-xs opacity-70'}>
          {formatTime(time)}
        </div>
      )}
    </li>
  );
}
