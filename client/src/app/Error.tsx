import { isRouteErrorResponse, useRouteError } from 'react-router';

// 🔹 Base reusable error element component
type ErrorElementProps = {
  heading: string;
  description: string;
  message: string;
};

const ErrorElement = ({ heading, description, message }: ErrorElementProps) => (
  <div className="p-4 text-red-600">
    <h1 className="text-xl font-bold">{heading}</h1>
    <p>{description}</p>
    <pre className="mt-2 text-sm text-gray-700">{message}</pre>
  </div>
);

// 🔹 Generic hook for fetching and formatting route errors
const useFormattedError = () => {
  const error = useRouteError();
  if (!error) return 'Unknown error';

  return isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : (error as Error)?.message || 'Unexpected error';
};

// 🔹 Factory for creating specialized error boundaries
const createErrorBoundary = (heading: string, description: string) => () => {
  const message = useFormattedError();
  return (
    <ErrorElement
      heading={heading}
      description={description}
      message={message}
    />
  );
};

// 🔹 Specific error components (compact + descriptive)
export const Error = createErrorBoundary(
  '🚀 Oops!',
  'Something went wrong while loading this page.'
);

export const AuthError = createErrorBoundary(
  '🔒 Auth Error Boundary!',
  'Something went wrong while authenticating.'
);

// export const MessageError = createErrorBoundary(
//   '📜 Message Error Boundary!',
//   'Something went wrong while loading messages.'
// );

export const ProfileError = createErrorBoundary(
  '🤦‍♂️ Profile Error Boundary!',
  'Something went wrong while loading your profile.'
);

export const RootError = createErrorBoundary(
  '⚠️ Root Error Boundary!',
  'Something went wrong while loading the app.'
);

export const ChatError = createErrorBoundary(
  '📡 Chat Error Boundary!',
  'Something went wrong while loading the chat.'
);
