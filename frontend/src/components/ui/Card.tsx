import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

type Props = ComponentProps<'div'>;

const Wrapper = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'bg-card text-text border-border shadow-shadow-200 rounded-lg border',
        className
      )}
    >
      {children}
    </div>
  );
};

// const Wrapper = ({ className, ...props }: Props) => {
//   return (
//     <div
//       data-slot="card"
//       className={cn(
//         'bg-card text-card-foreground shadow-secondary inline-flex flex-col gap-6 rounded-xl border border-gray-300 py-6',
//         className
//       )}
//       {...props}
//     />
//   );
// };

const Header = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  );
};

const Title = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
};

const Description = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='card-description'
      className={cn('text-muted-fg text-sm', className)}
      {...props}
    />
  );
};

const Action = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  );
};

const Content = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  );
};

const Footer = ({ className, ...props }: Props) => {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
};

Wrapper.displayName = 'Card';
Header.displayName = 'Card.Header';
Title.displayName = 'Card.Title';
Description.displayName = 'Card.Description';
Action.displayName = 'Card.Action';
Content.displayName = 'Card.Content';
Footer.displayName = 'Card.Footer';

export const Card = Object.assign(Wrapper, {
  Header,
  Title,
  Description,
  Action,
  Content,
  Footer,
});
