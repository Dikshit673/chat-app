import { isRouteErrorResponse, useRouteError } from 'react-router';

function ProfileError() {
  const error = useRouteError();

  return (
    <div className="p-4 text-red-600">
      <h1 className="text-xl font-bold">🤦‍♂️ Profile Error Boundary!</h1>
      <p>Something went wrong while loading your profile.</p>
      <pre className="mt-2 text-sm text-gray-700">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : (error as Error)?.message}
      </pre>
    </div>
  );
}

export default ProfileError;
