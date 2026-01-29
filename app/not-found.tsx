import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-6 px-6">
      <h1 className="text-4xl font-bold text-slate-100">404</h1>
      <p className="text-slate-400">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-black font-bold hover:bg-blue-400 transition-colors"
      >
        홈으로
      </Link>
    </div>
  );
}
