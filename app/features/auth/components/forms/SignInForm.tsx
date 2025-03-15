import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '../../schemas/auth.schema';
import { Loader2 } from 'lucide-react';
import { Form } from '@/shared/components/ui/form';
import { FormInputItem } from '@/shared/components/ui/form-input-item';
import { Button } from '@/shared/components/ui/button';
import { login } from '../../api/authActions';
import { useMutation } from '@tanstack/react-query';

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const {
  //   mutateAsync: loginMutation,
  //   isPending,
  //   isError: mutationError,
  // } = useMutation({
  //   mutationFn: ({ data }: { data: LoginSchema }) => login({ data }),
  //   onSuccess: (data) => {
  //     if (data?.status === 'success') {
  //       router.navigate({ to: '/' });
  //     } else {
  //       form.setError('root', { message: data?.context?.message });
  //     }
  //   },
  //   onError: (error) => {
  //     form.setError('root', { message: 'There was error logging in' });
  //   },
  // });

  const disabled = form.formState.isSubmitting;
  const rootError = form.formState.errors.root?.message;
  const isError = !!rootError;

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await login({ data });

      if (result?.status === 'success') {
        router.navigate({ to: '/' });
      } else {
        form.setError('root', { message: result?.context?.message });
      }
    } catch (error) {
      console.error(error);
      form.setError('root', { message: 'There was error logging in' });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <h1 className='text-2xl font-bold'>Login</h1>
        <FormInputItem<typeof loginSchema>
          control={form.control}
          label='Email'
          name='email'
          placeholder='Enter your email'
        />
        <FormInputItem<typeof loginSchema>
          control={form.control}
          label='Password'
          name='password'
          type='password'
          placeholder='Enter your password'
        />
        <Button
          disabled={disabled}
          type='submit'
        >
          {disabled ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Login'}
        </Button>
        <p className='text-sm italic'>Don't have an account? Please see admin for access</p>
        {isError && <p className='text-sm italic text-red-600 text-center'>{rootError}</p>}
      </form>
    </Form>
  );
}
