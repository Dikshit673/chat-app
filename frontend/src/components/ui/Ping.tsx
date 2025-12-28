import type { ComponentProps } from 'react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const pingTV = tv({
  slots: {
    dot: 'relative size-3 inline-flex rounded-full',
    pulse: 'absolute inline-flex size-3.5 rounded-full opacity-75 animate-ping',
    text: 'sr-only font-medium capitalize',
  },
  variants: {
    status: {
      online: {
        dot: 'bg-green-600',
        pulse: 'bg-green-400',
        text: 'text-green-700',
      },
      offline: { dot: 'bg-red-500', pulse: 'hidden', text: 'text-red-700' },
    },
  },
  defaultVariants: {
    status: 'offline',
  },
});

const { dot, pulse, text } = pingTV();

export type PingStatusType = VariantProps<typeof pingTV>;

type PingProps = ComponentProps<'div'> & PingStatusType;

export const Ping = ({ className = '', status, ...props }: PingProps) => {
  if (status === 'offline') return null;
  return (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      <div className='relative flex items-center justify-center'>
        <span className={pulse({ status })}></span>
        <span className={dot({ status })}></span>
      </div>
      <span className={text({ status })}>{status}</span>
    </div>
  );
};
