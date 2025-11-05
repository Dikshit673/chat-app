import { cva, type VariantProps } from 'class-variance-authority';
import { createComponent } from '../helper/createComponent';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

const pingCVA = cva('relative size-3 inline-flex rounded-full', {
  variants: {
    status: {
      online: 'bg-green-600',
      offline: 'bg-red-500',
    },
  },
  defaultVariants: {
    status: 'offline',
  },
});

const pulseCVA = cva(
  'absolute inline-flex size-3.5 rounded-full opacity-75 animate-ping',
  {
    variants: {
      status: {
        online: 'bg-green-400',
        offline: 'hidden',
      },
    },
  }
);

const textCVA = cva('sr-only font-medium capitalize', {
  variants: {
    status: {
      online: 'text-green-700',
      offline: 'text-red-700',
    },
  },
});

export type PingStatusType = VariantProps<typeof pingCVA>;

type PingProps = ComponentProps<'div'> & PingStatusType;

export const Ping = createComponent({
  render: ({ className = '', status, ...props }: PingProps) => (
    <div className={cn('inline-flex items-center gap-2', className)} {...props}>
      <span className="relative flex items-center justify-center">
        <span className={cn(pulseCVA({ status }))}></span>
        <span className={cn(pingCVA({ status }))}></span>
      </span>
      <span className={cn(textCVA({ status }))}>{status}</span>
    </div>
  ),
  displayName: 'Ping',
});
