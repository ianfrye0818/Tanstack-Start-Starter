import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';

export default function MaintenanceComingSoonBanner({ message }: { message: string }) {
  const [open, setOpen] = useState(false);

  return open ? (
    <div className='bg-yellow-500  text-white p-4 relative h-3 flex items-center justify-center mb-2'>
      <p className='text-xs'>{message}</p>
      <Button
        size={'icon'}
        asChild
        className='absolute top-2 right-2 p-0 m-0 bg-transparent hover:bg-transparent cursor-pointer'
        onClick={() => {
          setOpen(false);
        }}
      >
        <XIcon className='w-[15px] h-[15px]' />
      </Button>
    </div>
  ) : null;
}
