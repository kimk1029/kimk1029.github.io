import { Code2, Layers, Smartphone, Bot, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const personalInfo = {
  name: '김규현 (Kyu-hyun Kim)',
  title: 'Frontend Engineer',
  subtitle: 'Web3 & Blockchain | AI-Assisted Dev',
  email: 'kimk1029@naver.com',
  github: 'https://github.com/kimk1029',
  summary: [
    '탄탄한 UI/UX 개발 역량 위에 블록체인(Web3) 도메인 지식을 더한 8년 차 개발자입니다.',
    "기술적 구현을 넘어 프론트엔드가 '협업의 허브'임을 이해하며, 주도적으로 디자인 시스템을 도입하고 팀의 효율을 높여왔습니다.",
    '최근에는 Cursor AI 등 AI 도구를 적극 활용하여 개발 생산성을 극대화하는 데 집중하고 있습니다.',
  ],
};

export const skills: { category: string; items: string[]; icon: LucideIcon }[] = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js 14+', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    icon: Code2,
  },
  {
    category: 'Web3',
    items: ['Web3.js', 'Ethers.js', 'WalletConnect', 'Smart Contract'],
    icon: Layers,
  },
  {
    category: 'Mobile/Game',
    items: ['Flutter', 'React Native', 'Phaser.js', 'D3.js'],
    icon: Smartphone,
  },
  {
    category: 'AI/Tools',
    items: ['Cursor AI', 'OpenAI API', 'Prompt Engineering'],
    icon: Bot,
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Supabase', 'PostgreSQL', 'Java Spring'],
    icon: Database,
  },
];

export interface Project {
  slug: string;
  title: string;
  company: string;
  period: string;
  type: string;
  tech: string[];
  shortDesc: string;
  description: string;
  details: string[];
}

export const allProjects: Project[] = [
  {
    slug: 'dopamine-land',
    title: 'dopamine.land',
    company: 'Personal Project',
    period: '2025.09 ~ 2025.12',
    type: 'Web Game Platform',
    tech: ['Next.js', 'Phaser.js', 'Supabase', 'WebSockets', 'Cursor AI'],
    shortDesc:
      '웹 기반 멀티플레이 게임 플랫폼. Cursor AI를 활용해 개발 속도 2배 단축.',
    description:
      '네오위즈 재직 시 습득한 게임 엔진 기술을 웹 서비스에 접목하여 구축한 카지노 컨셉의 멀티플레이 게임 놀이터입니다.',
    details: [
      'Next.js 환경에 Phaser.js 게임 엔진 최적화 탑재',
      'WebSocket 활용 텍사스 홀덤, 1:1 테트리스 실시간 동기화',
      'Cursor AI Vibe Coding 적극 활용으로 로직 구현 시간 단축',
    ],
  },
  {
    slug: 'datepick-app',
    title: '위치 기반 데이팅 앱',
    company: 'Personal Project',
    period: '2024.10 ~ 진행중',
    type: 'Mobile App',
    tech: ['Flutter', 'Node.js', 'Prisma', 'Docker', 'Supabase'],
    shortDesc:
      'Flutter 기반 위치 매칭 서비스. 기획부터 스토어 배포까지 풀스택 주도.',
    description:
      'Flutter로 제작된 위치 기반 매칭 서비스로, APK 생성 및 스토어 배포 준비 단계까지 진행된 풀스택 프로젝트입니다.',
    details: [
      'Flutter/Dart 학습 및 네이티브 수준 앱 기능 구현',
      'Node.js(Express) + Prisma RESTful API 설계',
      'Docker 기반 Stage 서버 및 운영 환경 직접 구축',
      '마케팅 인플루언서 섭외 등 비즈니스 영역 주도',
    ],
  },
  {
    slug: 'church-community',
    title: '교회 익명 커뮤니티',
    company: 'Personal Project',
    period: '2024.11 ~ 2025.10',
    type: 'Web Service',
    tech: ['Next.js', 'TypeScript', 'shadcn/ui', 'Playwright', 'AI UI'],
    shortDesc: '데이터 자동 수집 기능을 포함한 익명 소통 플랫폼.',
    description:
      '교회 내 정보 공유 및 소통을 위한 익명 커뮤니티 서비스입니다.',
    details: [
      'Node.js에서 Next.js Serverless로 마이그레이션',
      'Playwright 크롤러로 주보/행사 정보 자동 수집',
      'shadcn/ui 및 AI 도구 활용해 모던 UI 프로토타이핑 가속화',
    ],
  },
  {
    slug: 'neopin-wallet',
    title: 'NEOPIN Wallet Extension',
    company: 'NEOWIZ',
    period: '2021.12 ~ 2024.12',
    type: 'Blockchain',
    tech: ['React.js', 'Web3.js', 'Ethers.js', 'Chrome Extension'],
    shortDesc:
      '크롬 익스텐션 기반 블록체인 지갑 아키텍처 설계 및 개발.',
    description:
      '다양한 디스플레이 환경을 지원하는 크롬 익스텐션 지갑으로, 아키텍처 설계부터 핵심 기능 구현까지 담당했습니다.',
    details: [
      'React.js 기반 반응형 마크업 및 익스텐션 환경 최적화',
      'Smart Contract 직접 호출 로직 (Token Transfer, Swap) 구현',
      'SWR 도입으로 상태 동기화 및 API 요청 최적화',
      'WalletConnect 활용 기존 웹 서비스와 실시간 연동',
    ],
  },
  {
    slug: 'neopin-landing',
    title: 'NEOPIN.io Landing',
    company: 'NEOWIZ',
    period: '2021.12 ~ 2024.12',
    type: 'Web Frontend',
    tech: ['React.js', 'Tailwind CSS', 'Framer Motion'],
    shortDesc: '프론트엔드 리드로서 디자인 시스템 구축 및 인터랙션 고도화.',
    description: '서비스 브랜딩을 위한 랜딩 페이지 및 토큰 소개 사이트입니다.',
    details: [
      '확장 가능한 컴포넌트 기반 디자인 시스템 가이드라인 구축',
      'Lottie, Framer Motion 활용 고품질 인터랙션 구현',
      '디자인-개발 협업 프로세스 정립 및 문서화',
    ],
  },
  {
    slug: 'neopin-dapp',
    title: 'App.neopin.io (DeFi)',
    company: 'NEOWIZ',
    period: '2021.12 ~ 2024.12',
    type: 'Blockchain / Hybrid',
    tech: ['Next.js', 'Tailwind CSS', 'Hybrid App'],
    shortDesc:
      'DEX 핵심 기능 개발 및 하이브리드 앱(Webview) 양방향 통신 구현.',
    description:
      'Swap, Pool, Stake 등 핵심 DeFi 비즈니스 로직을 처리하는 DApp입니다.',
    details: [
      'ERC20 기반 Smart Contract ABI 분석 및 트랜잭션 연동',
      'Native Connector 활용 웹뷰-네이티브 앱 간 통신 인터페이스 개발',
      '복잡한 금융 로직의 안정적 웹 서비스 구현',
    ],
  },
  {
    slug: 'neopin-admin',
    title: '통합 관리자(Admin) 페이지',
    company: 'NEOWIZ',
    period: '2021.12 ~ 2024.12',
    type: 'Internal Tool',
    tech: ['React.js', 'React-Query', 'Zustand'],
    shortDesc: '레거시(Svelte) 마이그레이션 및 상태 관리 최적화.',
    description: '사내 운영을 위한 통합 관리자 페이지 고도화 작업입니다.',
    details: [
      '기존 Svelte 코드를 React.js로 전면 전환하여 기술 스택 통일',
      '전역 상태 관리(Zustand) 도입으로 복잡도 감소',
      '마이그레이션 과정 및 API 표준 사내 Wiki 문서화',
    ],
  },
  {
    slug: 'betspider',
    title: 'BETSPIDER.IO',
    company: 'NEOWIZ',
    period: '2020.03 ~ 2021.12',
    type: 'Blockchain Game',
    tech: ['Vue.js', 'TypeScript', 'TronLink'],
    shortDesc: '블록체인 기반 카지노 웹앱 개발 및 트론 네트워크 연동.',
    description: '트론(Tron) 블록체인을 기반으로 한 실시간 베팅 서비스입니다.',
    details: [
      'Vue 2.0 환경에 TypeScript 점진적 도입',
      'TronLink Wallet 연동 (입출금 로직 구현)',
      'Node 직접 통신(sendTransaction)으로 신뢰성 확보',
    ],
  },
  {
    slug: 'trumpia-chart',
    title: 'Report Chart Refactoring',
    company: 'Trumpia',
    period: '2018.11 ~ 2019.05',
    type: 'Data Visualization',
    tech: ['D3.js', 'C3.js'],
    shortDesc: '차트 렌더링 엔진 단일화 및 성능 30% 개선.',
    description:
      '대규모 데이터 시각화 리포트의 렌더링 성능을 개선한 프로젝트입니다.',
    details: [
      '혼재된 라이브러리를 C3.js 기반 단일 엔진으로 재설계',
      'Factory 패턴 적용해 차트 생성 동적 구조화',
      '리포트 로딩 속도 획기적 단축',
    ],
  },
  {
    slug: 'trumpia-dashboard',
    title: 'Data Visualization Dashboard',
    company: 'Trumpia',
    period: '2016.10 ~ 2018.11',
    type: 'Full Stack',
    tech: ['D3.js', 'Java', 'Jenkins'],
    shortDesc: '대규모 데이터 집계 및 시각화 대시보드 풀스택 구축.',
    description:
      '복잡한 집계 데이터를 시각화하여 고객 분석 효율을 높인 대시보드입니다.',
    details: [
      'D3.js 시각화 모듈 직접 개발 및 모듈화',
      'Jenkins CI/CD 파이프라인 구축 및 코드 리뷰 문화 도입',
      'Java 백엔드 연동 및 데이터 정합성 확보',
    ],
  },
  {
    slug: 'trumpia-legacy',
    title: 'Legacy System Modernization',
    company: 'Trumpia',
    period: '2016.01 ~ 2020.02',
    type: 'Full Stack / Migration',
    tech: ['Java Spring Boot', 'Bootstrap', 'PHP'],
    shortDesc: 'PHP 레거시 시스템을 Spring Boot로 재구축 및 반응형 리뉴얼.',
    description:
      '노후화된 시스템을 현대적인 아키텍처로 전환한 대규모 프로젝트입니다.',
    details: [
      'PHP -> Java Spring Boot 아키텍처 전면 재구축',
      'Bootstrap 도입하여 모바일 최적화 반응형 웹 구현',
      '서버 인프라(Apache, Tomcat) 구축부터 개발까지 주도',
    ],
  },
  {
    slug: 'trumpia-db-tool',
    title: 'DB Query Optimization Tool',
    company: 'Trumpia',
    period: '2015.10 ~ 2016.04',
    type: 'Internal Tool',
    tech: ['Oracle', 'PHP'],
    shortDesc: '커스텀 데이터 추출 툴 개발 및 쿼리 튜닝.',
    description:
      '비효율적인 쿼리를 개선하고 운영 업무를 자동화한 프로젝트입니다.',
    details: [
      '복잡한 Join 쿼리 실행 계획 분석 및 튜닝',
      'PHP 기반 커스텀 데이터 추출 툴 개발로 반복 업무 자동화',
      'ERD 최신화 및 문서화',
    ],
  },
];
