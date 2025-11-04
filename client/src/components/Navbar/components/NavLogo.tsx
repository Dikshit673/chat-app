import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import type { ComponentProps } from 'react';

export const NavLogo = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn('flex cursor-pointer items-center gap-2', className)}
      {...props}
    >
      <MessageSquare className="size-6 stroke-current stroke-3" />
      <span className="ml-2 text-xl font-bold">ChatApp</span>
    </div>
  );
};
