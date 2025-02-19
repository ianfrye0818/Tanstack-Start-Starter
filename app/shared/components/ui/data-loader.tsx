import { InfinitySpin } from 'react-loader-spinner';

export default function DataLoader() {
  return (
    <div className='w-[calc(100vw-200px)] h-[calc(100vh-200px)] container mx-auto flex flex-col justify-center items-center'>
      <p>Loading......</p>
      <InfinitySpin
        width='200'
        color='#DF091F'
      />
    </div>
  );
}
