"use client";

// Last resort: if something outside the isolated scenes still throws, offer a way back
// instead of the bare framework error screen.
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-vacuum px-6 text-center text-pad">
      <div>
        <p className="font-hangul text-3xl">교신이 잠시 끊겼습니다.</p>
        <p className="mt-3 text-pad/70">이 브라우저에서 화면을 그리는 중 문제가 생겼습니다.</p>
        <button onClick={reset} className="mt-8 bg-nasa px-5 py-3 font-hangul text-lg text-white">
          다시 시도
        </button>
        <p className="mt-6 text-sm text-pad/60">
          계속되면 <a className="underline" href="mailto:kimk1029@naver.com">kimk1029@naver.com</a> 으로 연락 주세요.
        </p>
      </div>
    </main>
  );
}
