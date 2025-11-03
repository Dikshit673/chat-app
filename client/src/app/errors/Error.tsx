import { isRouteErrorResponse, useRouteError } from 'react-router';

function Error() {
  const error = useRouteError();

  return (
    <div className="p-4 text-red-600">
      <h1 className="text-xl font-bold">🚀Oops!</h1>
      <p>Something went wrong while loading this page.</p>
      <pre className="mt-2 text-sm text-gray-700">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : (error as Error)?.message}
      </pre>
    </div>
  );
}

export default Error;
