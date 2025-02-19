import { Button, ButtonProps } from '@/shared/components/ui/button';
import { toast } from 'sonner';
import { FaMicrosoft } from 'react-icons/fa';
import { useSignIn } from '@clerk/tanstack-start';

export default function SignInWithMicrosoftButton(props: ButtonProps) {
  const { signIn, isLoaded } = useSignIn();
  const signInWithMicrosoft = async () => {
    try {
      await signIn?.authenticateWithRedirect({
        strategy: 'oauth_microsoft',
        redirectUrl: '/',
        redirectUrlComplete: '/',
      });
    } catch (error) {
      console.error(['signInWithMicrosoft error', error]);
      toast.error('There was error logging in');
    }
  };

  if (!isLoaded) return null;

  return (
    <Button
      variant='outline'
      type='button'
      onClick={signInWithMicrosoft}
      {...props}
    >
      <FaMicrosoft /> Sign In with Microsoft
    </Button>
  );
}
