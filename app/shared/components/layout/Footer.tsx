export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='mt-auto py-4 text-center text-gray-500 h-16'>
      © {currentYear} Quality Oil Company
    </footer>
  );
}
