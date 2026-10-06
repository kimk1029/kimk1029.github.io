import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-6 bg-vacuum px-6 text-white md:px-16">
      <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-black uppercase leading-[0.85]">Off trajectory</h1>
      <p className="text-lg text-white/80">404 · 신호가 끊겼습니다. 페이지를 찾을 수 없습니다.</p>
      <Link href="/" className="bg-nasa px-5 py-3 font-display text-xl font-black uppercase tracking-wide hover:bg-pad hover:text-ink">
        발사대로 돌아가기
      </Link>
    </main>
  );
}
