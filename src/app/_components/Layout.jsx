import Link from 'next/link';
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <Link href="/">
          <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">MyApp</h1>
        </Link>
        {children}
      </div>
    </div>
  );
}