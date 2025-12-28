import { type ComponentProps } from 'react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

import { Ping, type PingStatusType } from './Ping';

const avatarTV = tv({
  slots: {
    wrapper:
      'relative aspect-square flex select-none shrink-0 rounded-full bg-primary/10  active:scale-95 shadow-md border border-border items-center justify-center transition-all ease-in-out duration-300',
    image: 'size-full rounded-full object-cover ',
    fallback: 'inline-flex items-center justify-center uppercase text-primary',
    status: 'absolute right-0 bottom-0',
  },

  variants: {
    size: {
      xs: { wrapper: 'size-6', fallback: 'size-6' },
      sm: { wrapper: 'size-8', fallback: 'size-8' },
      md: { wrapper: 'size-10', fallback: 'size-10' },
      lg: { wrapper: 'size-12', fallback: 'size-12' },
      xl: { wrapper: 'size-14', fallback: 'size-14' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const { wrapper, image, fallback, status } = avatarTV();

type AvatarVariantProps = VariantProps<typeof avatarTV>;

type AvatarWrapperProps = ComponentProps<'div'> & AvatarVariantProps;

const AvatarWrapper = ({ className, size, ...props }: AvatarWrapperProps) => (
  <figure className={cn(wrapper({ size }), className)} {...props} />
);

type AvatarImageProps = ComponentProps<'img'> & AvatarVariantProps;

const AvatarImage = ({ className, size, ...props }: AvatarImageProps) => (
  <img className={cn(image({ size }), className)} {...props} />
);

type AvatarIndicatorProps = ComponentProps<'div'> & PingStatusType;

const AvatarStatusIndicator = ({
  className,
  status: st,
  ...props
}: AvatarIndicatorProps) => (
  <Ping className={cn(status(), className)} status={st} {...props} />
);

type AvatarFallbackProps = ComponentProps<'div'> &
  AvatarVariantProps & { fallback: string };

const AvatarFallback = ({
  fallback: fb,
  className,
  size,
  ...props
}: AvatarFallbackProps) => {
  const fallbackValue = fb
    .split(' ')
    .map((word) => word[0])
    .join('');

  return (
    <div className={cn(fallback({ size }), className)} {...props}>
      {fallbackValue}
    </div>
  );
};

type AvatarProps = ComponentProps<'div'> &
  AvatarVariantProps &
  PingStatusType & {
    src?: string;
    alt?: string;
    fallback: string;
    showStatus?: boolean;
  };

const AvatarPresenter = ({
  src,
  alt = '',
  size,
  fallback,
  status,
  showStatus = false,
  ...props
}: AvatarProps) => {
  return (
    <AvatarWrapper {...props}>
      {src ? (
        <AvatarImage src={src} alt={alt} size={size} />
      ) : (
        <AvatarFallback fallback={fallback} size={size} />
      )}
      {showStatus && <AvatarStatusIndicator status={status} />}
    </AvatarWrapper>
  );
};

export { AvatarPresenter };
