import { isRouteErrorResponse, useRouteError } from 'react-router';

function MessageError() {
  const error = useRouteError();

  return (
    <div className="p-4 text-red-600">
      <h1 className="text-xl font-bold">📜 Message Error Boundary</h1>
      <p>Something went wrong while loading messages.</p>
      <pre className="mt-2 text-sm text-gray-700">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : (error as Error)?.message}
      </pre>
    </div>
  );
}

export default MessageError;
