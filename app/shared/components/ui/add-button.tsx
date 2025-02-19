import { PlusIcon } from 'lucide-react';
import { Button } from './button';

interface AddButtonProps {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddButton({ setIsDialogOpen }: AddButtonProps) {
  return (
    <Button
      variant={'outline'}
      onClick={() => setIsDialogOpen(true)}
    >
      <PlusIcon />
    </Button>
  );
}
