import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authlayout')({
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({ to: '/customers' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='h-[calc(100dvh-10rem)] w-full flex items-center justify-center'>
      <Outlet />
    </div>
  );
}
