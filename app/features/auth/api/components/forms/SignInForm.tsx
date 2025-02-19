import { useSignIn } from '@clerk/tanstack-start';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchema } from '@/features/auth/api/schemas/auth.schema';
import SignInWithMicrosoftButton from '@/features/auth/api/components/SignInWithMicrosoftButton';
import { Loader2 } from 'lucide-react';
import { Form } from '@/shared/components/ui/form';
import { FormInputItem } from '@/shared/components/ui/form-input-item';
import { Button } from '@/shared/components/ui/button';

export default function SignInForm() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await signIn?.create({
        identifier: data.email,
        password: data.password,
      });

      if (result?.status === 'complete') {
        router.navigate({ to: '/' });
      }
    } catch (error) {
      console.error(['onSubmit error', error]);
      form.setError('root', { message: 'There was error logging in' });
    }
  };

  if (!isLoaded) return null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <SignInWithMicrosoftButton
          disabled={form.formState.isSubmitting}
          className='w-full'
        />
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
          disabled={form.formState.isSubmitting}
          type='submit'
        >
          {form.formState.isSubmitting ? <Loader2 className='w-4 h-4 animate-spin' /> : 'Login'}
        </Button>
        {form.formState.errors.root && (
          <p className='text-sm italic text-green-600'>{form.formState.errors.root.message}</p>
        )}
      </form>
    </Form>
  );
}
