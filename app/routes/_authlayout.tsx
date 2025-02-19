import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_authlayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='w-full max-w-md mx-auto p-4 border rounded-md bg-blue-50'>
        <Outlet />
      </div>
    </div>
  );
}
