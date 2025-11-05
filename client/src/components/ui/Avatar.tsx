import { type ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { createComponent } from '../helper/createComponent';
import { Ping, type PingStatusType } from './Ping';

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

type SizeTypes = VariantProps<typeof sizeCVA>;

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
  render: ({
    className,
    status,
    ...props
  }: ComponentProps<'div'> & PingStatusType) => (
    <Ping
      className={cn('absolute right-0 bottom-0', className)}
      status={status}
      {...props}
    />
  ),
  displayName: 'AvatarStatusIndicator',
});

const AvatarFallback = createComponent({
  render: ({
    className,
    fallback,
    size,
    ...props
  }: ComponentProps<'div'> & SizeTypes & { fallback: string }) => {
    const fallbackValue = fallback
      .split(' ')
      .map((word) => word[0])
      .join('');

    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-indigo-100 text-center uppercase',
          sizeCVA({ size }),
          className
        )}
        {...props}
      >
        {fallbackValue}
      </div>
    );
  },
  displayName: 'AvatarFallback',
});

type AvatarProps = ComponentProps<'div'> &
  SizeTypes &
  PingStatusType & {
    src?: string;
    alt?: string;
    fallback: string;
  };

const AvatarPresenter = createComponent({
  render: ({
    src,
    alt = '',
    size,
    fallback,
    status,
    ...props
  }: AvatarProps) => {
    return (
      <AvatarWrapper {...props}>
        {/* <div className={cn('relative inline-block', sizeCVA({ size }))}> */}
        {src ? (
          <AvatarImage src={src} alt={alt} size={size} />
        ) : (
          <AvatarFallback
            fallback={fallback}
            size={size}
            className="text-indigo-500"
          />
        )}
        <AvatarStatusIndicator status={status} />
        {/* </div> */}
      </AvatarWrapper>
    );
  },
  displayName: 'AvatarPresenter',
});

export { AvatarPresenter };
