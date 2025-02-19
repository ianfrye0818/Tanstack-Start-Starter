import { Input } from '@/shared/components/ui/input';
import { Search } from 'lucide-react';
import { Table as TTable } from '@tanstack/react-table';

export default function GlobalFilterInput<T>({ table }: { table: TTable<T> }) {
  return (
    <div className='relative max-w-md'>
      <Input
        onChange={(e) => table.setGlobalFilter(e.target.value)}
        placeholder='Search Anything...'
        value={(table.getState().globalFilter as string) ?? ''}
        className='pl-8'
      />
      <Search className='absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4' />
    </div>
  );
}
