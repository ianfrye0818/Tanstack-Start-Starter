import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Button } from '@/shared/components/ui/button';

type DataTableRefetchBarProps<T> = {
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T, Error>>;
  dataUpdatedAt: number;
  isFetching: boolean;
};

export default function DataTableRefetchBar<T>({
  refetch,
  dataUpdatedAt,
  isFetching,
}: DataTableRefetchBarProps<T>) {
  return (
    <p className='p-2 flex items-center'>
      Data last fetched: {new Date(dataUpdatedAt).toLocaleString()}{' '}
      <Button
        disabled={isFetching}
        className='text-blue-500 underline'
        variant={'link'}
        onClick={() => refetch()}
      >
        {isFetching ? 'Refreshing...' : 'Refresh'}
      </Button>
    </p>
  );
}
