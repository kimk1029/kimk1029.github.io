import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kyu-hyun Kim | Portfolio',
  description:
    '협업의 중심에서 신뢰를 만드는 8년 차 프론트엔드 전문가. Frontend | Web3 & Blockchain | AI-Assisted Dev',
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
