import { Table } from '@tanstack/react-table';
import { DataTablePagination } from './TablePagination';
import DataTableRefetchBar from './RefetchBar';

type TableTopBarProps<T> = {
  table: Table<T>;
  dataUpdatedAt: number;
  refetch: () => Promise<any>;
  isFetching: boolean;
};

export default function TableTopBar<T>({
  table,
  dataUpdatedAt,
  refetch,
  isFetching,
}: TableTopBarProps<T>) {
  return (
    <div className='p-2 flex items-center justify-between'>
      <DataTableRefetchBar
        dataUpdatedAt={dataUpdatedAt}
        refetch={refetch}
        isFetching={isFetching}
      />
      <DataTablePagination
        showRowsPerPage={false}
        table={table}
      />
    </div>
  );
}
