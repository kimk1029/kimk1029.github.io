import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '김규현 | Frontend · AI Product Engineering',
  description:
    'React·Next.js 8년 차 프론트엔드 개발자 포트폴리오. 네오위즈 Neopin에서 쌓은 Web3(지갑·DEX·Smart Contract) 도메인 전문성과 Claude Code·MCP·Agent Skills 기반 AI 네이티브 개발 워크플로우를 결합합니다.',
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
