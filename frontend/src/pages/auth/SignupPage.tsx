import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Input } from '@/components/ui/Input';
import { register } from '@/features/auth/authThunks';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.error('Please enter name, email and password');
    }
    console.log(formData);
    dispatch(register(formData)).then(() => {
      toast.success('Signed up successfully');
      navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-2 rounded-lg'>
      <Heading.H2 className='text-center capitalize'>Sign up</Heading.H2>
      <Input
        id='signup-name'
        label={'Name'}
        type='text'
        name='name'
        value={formData.name}
        onChange={handleInputChange}
      />
      <Input
        id='signup-email'
        label={'Email'}
        type='email'
        name='email'
        value={formData.email}
        onChange={handleInputChange}
      />
      <Input
        id='signup-password'
        label={'Password'}
        type='password'
        name='password'
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button type='submit' className='mt-2'>
        Sign up
      </Button>
    </form>
  );
};

export default SignupPage;
