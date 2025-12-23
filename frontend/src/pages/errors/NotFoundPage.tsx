import { Button, Card, Heading } from '@/components/ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className='flex items-center justify-center gap-2 text-center'>
      <Card className='flex h-[min(100%,20em)] w-[min(100%,20rem)] flex-col items-center justify-center gap-2 p-8'>
        <Heading.H1>404</Heading.H1>
        <p className='text-muted-fg text-2xl'>not found</p>
        <p className='text-muted-fg'>
          The page you are looking for does not exist.
        </p>
        <Button type='button' onClick={handleGoBack}>
          Back to home
        </Button>
      </Card>
    </div>
  );
};

export default NotFoundPage;
