'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface FormDialogProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}

export default function FormDialog({
  title,
  description,
  children,
  setOpen,
  open,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
