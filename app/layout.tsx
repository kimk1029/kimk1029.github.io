import type { Metadata } from 'next';
import {
  Big_Shoulders_Display,
  Big_Shoulders_Stencil_Display,
  Black_Han_Sans,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

const display = Big_Shoulders_Display({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-display' });
const stencil = Big_Shoulders_Stencil_Display({ subsets: ['latin'], weight: ['800', '900'], variable: '--font-stencil' });
const hangul = Black_Han_Sans({ subsets: ['latin'], weight: '400', preload: false, variable: '--font-hangul' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: '김규현 | AI Product Engineer · Frontend',
  description:
    'React·Next.js 9년 차 프론트엔드 개발자. Claude Code·MCP·Agent Harness 기반 AI 네이티브 워크플로우로 제품 6종을 만들어 5종을 출시하고 3종을 운영 중이며, 네오위즈 Neopin에서 지갑·DEX·디자인 시스템을 담당했습니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${display.variable} ${stencil.variable} ${hangul.variable} ${mono.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
