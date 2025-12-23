import { MessageSquare } from 'lucide-react';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

export const NavLogo = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'text-text flex cursor-pointer items-center gap-2',
        className
      )}
      {...props}
    >
      <MessageSquare className='size-6 stroke-current stroke-3' />
      <span className='ml-2 text-xl font-bold'>ChatApp</span>
    </div>
  );
};
