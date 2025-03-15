import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_rootlayout')({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/sign-in' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
