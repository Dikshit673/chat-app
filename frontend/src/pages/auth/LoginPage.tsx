import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useAppDispatch } from '@/app/hooks';
import { Button, Heading, Input } from '@/components/ui';
import { login } from '@/features/auth/authThunks';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: 'test1234',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { email, password } = formData;
      if (!email || !password) {
        toast.error('Please enter email and password');
        return;
      }

      dispatch(login(formData)).then(() => {
        toast.success('login successfully');
        navigate('/');
      });
    },
    [dispatch, navigate, formData]
  );

  return (
    <form onSubmit={handleSubmit} className='space-y-2 rounded-lg'>
      <Heading.H2 className='text-center capitalize'>Sign In</Heading.H2>
      {/* <h2 className='flex items-center justify-center text-center text-4xl font-semibold capitalize'>
        Sign in
      </h2> */}
      <Input
        id='login-email'
        label={'Email'}
        type='email'
        name='email'
        value={formData.email}
        onChange={handleInputChange}
      />
      <Input
        id='login-password'
        label={'Password'}
        type='password'
        name='password'
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button type='submit' className='mt-2'>
        Sign in
      </Button>
    </form>
  );
}
