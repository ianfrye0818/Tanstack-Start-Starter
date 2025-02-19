import { useReactTable, TableState, TableOptions, RowData } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

interface UseTableProps<T> extends TableOptions<T> {
  tableState: TableState;
  setTableState: Dispatch<SetStateAction<TableState>>;
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    context: {
      tableId: string | string[] | null | undefined;
    };
  }
}

export default function useTable<T>({
  data,
  columns,
  tableState,
  setTableState,
  meta,
  ...options
}: UseTableProps<T>) {
  return useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: (sorting) =>
      setTableState((prev) => ({
        ...prev,
        sorting: typeof sorting === 'function' ? sorting(prev.sorting) : sorting,
      })),
    onColumnFiltersChange: (columnFilters) =>
      setTableState((prev) => ({
        ...prev,
        columnFilters:
          typeof columnFilters === 'function' ? columnFilters(prev.columnFilters) : columnFilters,
      })),
    onColumnVisibilityChange: (columnVisibility) =>
      setTableState((prev) => ({
        ...prev,
        columnVisibility:
          typeof columnVisibility === 'function'
            ? columnVisibility(prev.columnVisibility)
            : columnVisibility,
      })),
    onRowSelectionChange: (rowSelection) =>
      setTableState((prev) => ({
        ...prev,
        rowSelection:
          typeof rowSelection === 'function' ? rowSelection(prev.rowSelection) : rowSelection,
      })),
    onPaginationChange: (pagination) =>
      setTableState((prev) => ({
        ...prev,
        pagination: typeof pagination === 'function' ? pagination(prev.pagination) : pagination,
      })),

    onGlobalFilterChange: (globalFilter) =>
      setTableState((prev) => ({
        ...prev,
        globalFilter,
      })),
    state: tableState,
    autoResetPageIndex: false,
    meta,
    ...options,
  });
}
