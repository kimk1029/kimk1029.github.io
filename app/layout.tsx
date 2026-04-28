import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '김규현 | Frontend · AI Product Engineering',
  description:
    'React·Next.js 기반 프론트엔드와 Claude Code, MCP, Agent Skills를 제품 개발에 활용하는 8년 차 개발자 포트폴리오.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
