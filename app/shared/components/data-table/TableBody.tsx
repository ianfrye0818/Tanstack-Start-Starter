import { Row, Table as TTable, flexRender } from '@tanstack/react-table';
import { TableBody as TBody, TableCell, TableRow } from '@/shared/components/ui/table';
import { cn } from '@/shared/lib/utils';

interface TableBodyProps<T> {
  table: TTable<T>;
  getRowColor?: (row: Row<T>) => string | undefined;
}

export default function TableBody<T>({ table, getRowColor }: TableBodyProps<T>) {
  return (
    <TBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() && 'selected'}
            className={cn(getRowColor?.(row))}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell
                className='border'
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell
            // colSpan={createColumns.length}
            className='h-24'
          >
            No results.
          </TableCell>
        </TableRow>
      )}
    </TBody>
  );
}
