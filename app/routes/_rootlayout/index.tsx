import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/shared/components/ui/button';

export const Route = createFileRoute('/_rootlayout/')({
  component: Home,
});

function Home() {
  return (
    <div className='p-2'>
      <h3 className='text-red-500 text-2xl font-bold'>Welcome Home!!!</h3>
    </div>
  );
}
