import { Table as TTable } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { Table as TTableUI } from '@/shared/components/ui/table';
import ColumnSelectMenu from './ColumnSelectMenu';
import { DataTablePagination } from './TablePagination';
import TableTopBar from './TableTopBar';
import { cn } from '@/shared/lib/utils';
import { Row } from '@tanstack/react-table';

interface TableProps<T> {
  table: TTable<T>;
  DataTableFilterBar?: React.ReactNode;
  trailing?: React.ReactNode;
  dataUpdatedAt: number;
  refetch: any;
  isFetching: boolean;
  hideColumnSelectMenu?: boolean;
  showTopBar?: boolean;
  getRowColor?: (row: Row<T>) => string | undefined;
}

export default function Table<T>({
  table,
  DataTableFilterBar,
  trailing: trailingProp,
  dataUpdatedAt,
  refetch,
  isFetching,
  hideColumnSelectMenu,
  showTopBar = false,
  getRowColor,
}: TableProps<T>) {
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <TableHeaderSection<T>
        table={table}
        DataTableFilterBar={DataTableFilterBar}
        trailing={trailingProp}
        hideColumnSelectMenu={hideColumnSelectMenu}
      />
      <TableBodySection<T>
        table={table}
        showTopBar={showTopBar}
        isFetching={isFetching}
        dataUpdatedAt={dataUpdatedAt}
        refetch={refetch}
        getRowColor={getRowColor}
      />
      <TableFooterSection<T> table={table} />
    </div>
  );
}

function TableHeaderSection<T>({
  table,
  DataTableFilterBar,
  trailing: trailingProp,
  hideColumnSelectMenu,
}: {
  table: TTable<T>;
  DataTableFilterBar?: React.ReactNode;
  trailing?: React.ReactNode;
  hideColumnSelectMenu?: boolean;
}) {
  return (
    <section>
      <div className={cn('flex items-center', trailingProp ? 'justify-between' : 'justify-start')}>
        {!hideColumnSelectMenu && (
          <div>
            <ColumnSelectMenu<T> table={table} />
          </div>
        )}
        <div>{trailingProp}</div>
      </div>
      {DataTableFilterBar}
    </section>
  );
}

function TableBodySection<T>({
  table,
  showTopBar,
  isFetching,
  dataUpdatedAt,
  refetch,
  getRowColor,
}: {
  table: TTable<T>;
  showTopBar: boolean;
  isFetching: boolean;
  dataUpdatedAt: number;
  refetch: any;
  getRowColor?: (row: Row<T>) => string | undefined;
}) {
  return (
    <section className='rounded-md border'>
      {showTopBar && (
        <TableTopBar<T>
          table={table}
          isFetching={isFetching}
          dataUpdatedAt={dataUpdatedAt}
          refetch={refetch}
        />
      )}
      <TTableUI>
        <TableHeader<T> table={table} />
        <TableBody<T>
          table={table}
          getRowColor={getRowColor}
        />
      </TTableUI>
    </section>
  );
}

function TableFooterSection<T>({ table }: { table: TTable<T> }) {
  return (
    <section className='w-full flex justify-end'>
      <DataTablePagination table={table} />
    </section>
  );
}
