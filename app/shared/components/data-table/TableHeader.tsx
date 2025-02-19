import { TableHeader as THeader, TableRow, TableHead } from '@/shared/components/ui/table';
import { Table as TTable, flexRender } from '@tanstack/react-table';

export default function TableHeader<T>({ table }: { table: TTable<T> }) {
  return (
    <THeader className='border '>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </THeader>
  );
}
