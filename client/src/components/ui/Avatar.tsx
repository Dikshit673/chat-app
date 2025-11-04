import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { UserCircle2 } from 'lucide-react';
import { Ping } from './Ping';
import type { ComponentProps } from 'react';
import { createComponent } from '../helper/createComponent';

const avatarImageCVA = cva(
  'inline-block shrink-0 rounded-full object-cover text-indigo-500'
);

const sizeCVA = cva('', {
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
});

const AvatarWrapper = createComponent({
  render: ({ className, ...props }: ComponentProps<'div'>) => (
    <div
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center',
        className
      )}
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
  }: ComponentProps<'img'> & VariantProps<typeof sizeCVA>) => (
    <img
      className={cn(
        avatarImageCVA(),
        sizeCVA({ size }),
        'ring-2 ring-gray-500',
        className
      )}
      {...props}
    />
  ),
  displayName: 'AvatarImage',
});

const AvatarStatusIndicator = createComponent({
  render: ({ className, ...props }: ComponentProps<'div'>) => (
    <Ping className={cn('absolute right-0 bottom-0', className)} {...props} />
  ),
  displayName: 'AvatarStatusIndicator',
});

const AvatarFallback = createComponent({
  render: ({
    className,
    fallback,
    size,
    ...props
  }: ComponentProps<'div'> & { fallback?: string } & VariantProps<
      typeof sizeCVA
    >) => (
    <div
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {fallback ? (
        <div className={cn(sizeCVA({ size }))}>{fallback}</div>
      ) : (
        <div className={cn('relative inline-block', sizeCVA({ size }))}>
          <UserCircle2 className="size-full" />
          <AvatarStatusIndicator />
        </div>
      )}
    </div>
  ),
  displayName: 'AvatarFallback',
});

type AvatarProps = ComponentProps<'div'> &
  VariantProps<typeof sizeCVA> & {
    url?: string;
    alt?: string;
    fallback?: string;
  };

const AvatarPresenter = createComponent({
  render: ({ url, alt = '', size, fallback, ...props }: AvatarProps) => {
    return (
      <AvatarWrapper {...props}>
        {url ? (
          <AvatarImage src={url} alt={alt} size={size} />
        ) : (
          <AvatarFallback
            fallback={fallback}
            size={size}
            className="text-indigo-500"
          />
        )}
      </AvatarWrapper>
    );
  },
  displayName: 'AvatarPresenter',
});

export { AvatarPresenter };
