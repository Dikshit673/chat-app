import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { UserCircle2 } from 'lucide-react';
import { Ping } from './Ping';
import type { ComponentProps } from 'react';
import { createComponent } from '../helper/createComponent';

const avatarCVA = cva(
  'inline-block shrink-0 rounded-full object-cover text-indigo-500',
  {
    variants: {
      size: {
        xs: 'size-6',
        sm: 'size-8',
        md: 'size-10',
        lg: 'size-12',
        xl: 'size-14',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

type AvatarProps = {
  url?: string;
  alt?: string;
  size?: VariantProps<typeof avatarCVA>['size'];
};

const AvatarWrapper = createComponent({
  render: ({ className, ...props }: ComponentProps<'div'>) => (
    <div
      className={cn('relative inline-block shrink-0', className)}
      {...props}
    />
  ),
  displayName: 'AvatarWrapper',
});

const AvatarImage = createComponent({
  render: ({
    size,
    className,
    ...props
  }: ComponentProps<'img'> & VariantProps<typeof avatarCVA>) => (
    <img
      className={cn(avatarCVA({ size }), 'ring-2 ring-gray-500', className)}
      {...props}
    />
  ),
  displayName: 'AvatarImage',
});

const AvatarFallback = createComponent({
  render: ({ className, ...props }: ComponentProps<'svg'>) => (
    <UserCircle2 className={cn(avatarCVA(), className)} {...props} />
  ),
  displayName: 'AvatarFallback',
});

const AvatarStatusIndicator = createComponent({
  render: ({ className, ...props }: ComponentProps<'div'>) => (
    <Ping className={cn('absolute right-0 bottom-0', className)} {...props} />
  ),
  displayName: 'AvatarStatusIndicator',
});

const AvatarPresenter = createComponent({
  render: ({ url, alt = '', size }: AvatarProps) => {
    return (
      <AvatarWrapper>
        {url ? (
          <AvatarImage src={url} alt={alt} size={size} />
        ) : (
          <AvatarFallback />
        )}
        <AvatarStatusIndicator />
      </AvatarWrapper>
    );
  },
  displayName: 'AvatarPresenter',
});

export { AvatarPresenter };
