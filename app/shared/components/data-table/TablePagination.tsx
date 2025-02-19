import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useEffect } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  selectedRowsCount?: boolean;
  showRowsPerPage?: boolean;
}

export function DataTablePagination<TData>({
  table,
  selectedRowsCount = false,
  showRowsPerPage = true,
}: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageLength = table.getFilteredRowModel().rows.length;
  const getPageCount = () => {
    return Math.ceil(pageLength / pageSize);
  };

  //use effect to move to last page if filter is applied and page size is now less than the current page
  useEffect(() => {
    const pageCount = getPageCount();
    if (pageIndex >= pageCount) {
      table.setPageIndex(pageCount - 1);
    }
  }, [pageLength]);

  return (
    <div className='flex items-center px-2'>
      {selectedRowsCount && (
        <div className='flex-1 text-sm text-muted-foreground'>
          {selectedRowsCount} of {pageLength} row(s) selected.
        </div>
      )}
      <div className='w-full flex items-center justify-end space-x-6 lg:space-x-8'>
        {showRowsPerPage && (
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>Rows per page</p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className='h-8 w-[70px]'>
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={`${pageSize}`}
                  >
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {table.getPageCount() > 1 && (
          <>
            <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
              Page {pageIndex + 1} of {getPageCount()}
            </div>
            <div className='flex items-center space-x-2'>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to first page</span>
                <DoubleArrowLeftIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className='sr-only'>Go to previous page</span>
                <ChevronLeftIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='h-8 w-8 p-0'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to next page</span>
                <ChevronRightIcon className='h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                className='hidden h-8 w-8 p-0 lg:flex'
                onClick={() => table.setPageIndex(getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className='sr-only'>Go to last page</span>
                <DoubleArrowRightIcon className='h-4 w-4' />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
