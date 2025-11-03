import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { createComponent } from '../helper/createComponent';

const messageCVA = cva('px-4 py-2 rounded-md font-medium', {
  variants: {
    type: {
      success: 'bg-green-500/20 text-green-800',
      error: 'bg-red-500/20 text-red-800',
      warning: 'bg-yellow-500/20 text-yellow-800',
      info: 'bg-blue-500/20 text-blue-800',
      none: '',
    },
  },
  defaultVariants: {
    type: 'none',
  },
});

type MessageType = VariantProps<typeof messageCVA>['type'];

type MessageProps = ComponentProps<'p'> & {
  message: string;
  type: MessageType;
};

export const Message = ({
  message,
  type,
  className = '',
  ...props
}: MessageProps) => (
  <p {...props} className={cn(messageCVA({ type }), className)}>
    {message}
  </p>
);

type ResponseKeyType = Capitalize<NonNullable<MessageType>>;

type ResponseElementProps = ComponentProps<'p'> & {
  message: string;
};

const createResponseElement = (type: MessageType, displayName: string) =>
  createComponent<ResponseElementProps>({
    render: (props) => <Message {...props} type={type} />,
    displayName,
  });

type ResponseType = {
  [key in ResponseKeyType]: ReturnType<typeof createResponseElement>;
};

const Response = {
  Success: createResponseElement('success', 'Success'),
  Error: createResponseElement('error', 'Error'),
  Warning: createResponseElement('warning', 'Warning'),
  Info: createResponseElement('info', 'Info'),
  None: createResponseElement('none', 'None'),
} satisfies ResponseType;

export { Response };
