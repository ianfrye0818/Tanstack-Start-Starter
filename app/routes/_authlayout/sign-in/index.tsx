import SignInPage from '@/features/auth/pages/SignInPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authlayout/sign-in/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignInPage />
    </div>
  );
}
