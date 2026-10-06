import { Code2, Layers, Smartphone, Bot, Database } from "lucide-react";
export const experience = [
  {
    company: "독립 개발 / AI 기반 프로덕트 빌딩",
    role: "풀스택 개발 (1인)",
    period: "2025.01 ~ 현재",
    description: "웹·모바일·게임 프로덕트 6종을 기획부터 배포까지 단독 진행해 5종 출시. ARVO TCG, dopamine.land, DATEBASE 3종은 현재 운영 중",
    details: [
      "ARVO TCG: TCG 시세 데이터 파이프라인 구축부터 Next.js 웹·React Native 앱스토어 출시까지 단독 수행, 웹·앱 양채널 운영",
      "dopamine.land: Next.js + Phaser.js + WebSockets 기반 실시간 멀티플레이 게임 플랫폼 단독 런칭",
      "DATEBASE: Flutter 앱, Node.js 백엔드, NAS Stage 인프라까지 전 구간 설계·구축, 디자이너·인플루언서 섭외까지 운영 주도",
      "Claude Code를 주 작업 도구로 MCP 서버 연동, Agent Skills, Agent Harness, 간이 Eval을 개발 워크플로우로 정착"
    ]
  },
  {
    company: "NEOWIZ (네오위즈)",
    role: "시니어 FE / Lead FE",
    period: "2020.03 ~ 2024.12",
    description: "블록체인 사업부 Neopin(오픈 DeFi 플랫폼)·BETSPIDER.IO 담당 — 지갑 익스텐션, DeFi DApp(DEX), 통합 관리자 마이그레이션, 디자인 시스템까지 프론트엔드 전 영역 핵심 기여자",
    details: [
      "NEOPIN 지갑 익스텐션(Chrome) 아키텍처 설계, Ethers.js·Web3.js로 Smart Contract를 직접 호출하는 지갑 코어 기능 구현",
      "SWR 도입으로 중복 API 요청을 캐시·재검증 흐름으로 정리, 메인 화면 Lighthouse 점수 약 20% 개선",
      "app.neopin.io DEX의 Swap·Pool·Stake 구현, ERC20 ABI 연동 및 웹뷰 ↔ 네이티브 앱 양방향 통신 인터페이스 개발",
      "통합 관리자 페이지 Svelte → React 전환 제안·실행, SWR + Zustand 재구성으로 메인 데이터 페칭 약 34% 개선",
      "NEOPIN.io 디자인 시스템 리드 — 동일 UI 수정 커뮤니케이션 4~5회 → 1~2회로 감소",
      "BETSPIDER.IO(Tron 블록체인 카지노) Vue 2 + TypeScript 점진 도입, TronLink 지갑 결제 흐름 구현"
    ]
  },
  {
    company: "Trumpia",
    role: "풀스택 개발자",
    period: "2016.01 ~ 2020.02",
    description: "미국 실리콘밸리 소재 B2B 메시징 서비스 기업 — 프론트엔드 + 백엔드 + 인프라 일부 담당",
    details: [
      "D3.js·C3.js 데이터 시각화 대시보드 구축, C3.js 단일 렌더링 엔진 + Factory 패턴 리팩토링으로 차트 성능 30% 이상 개선",
      "PHP 레거시 시스템을 Java Spring Boot로 단계적 전환하고 반응형 웹 리뉴얼 리드 (Apache·Tomcat·CentOS 환경 구축 포함)",
      "Jenkins 기반 Dev·Stage·Live CI/CD 파이프라인 구축, GitLab 코드 리뷰 프로세스 도입",
      "Oracle 12g 쿼리 실행 계획 분석·튜닝, 미국 본사·AT&T 엔지니어와 영어로 OEM 서버 테스팅·이슈 트래킹"
    ]
  }
];
export const personalInfo = {
  name: "김규현 (Kyu-hyun Kim)",
  title: "AI Product Engineer · Frontend",
  subtitle: "React·Next.js 9년 차 · 약 5년의 Web3 도메인 경험 · AI 네이티브 개발 워크플로우",
  email: "kimk1029@naver.com",
  github: "https://github.com/kimk1029",
  portfolio: "kimk1029.github.io",
  summary: [
    "React·Next.js 중심의 프론트엔드 역량에 Web3·대시보드·실시간 서비스 경험을 더한 9년 차 개발자입니다. 네오위즈 Neopin에서 지갑 익스텐션, DeFi DApp, 관리자 마이그레이션, 디자인 시스템을 담당했습니다.",
    "Smart Contract 연동, WalletConnect, 트랜잭션 처리 등 블록체인 프론트엔드 전 영역을 실무로 다뤘고, 디자인 시스템 구축·레거시 마이그레이션·성능 최적화를 주도했습니다.",
    "독립 개발 기간에는 Claude Code·MCP·Agent Skills·Agent Harness·간이 Eval 워크플로우로 웹·모바일·게임 프로덕트 6종을 진행해 5종을 출시했고, ARVO TCG·dopamine.land·DATEBASE 3종을 운영 중입니다."
  ]
};

export const skills = [
  { category: "Web3 / Blockchain", items: ["Ethers.js", "Web3.js", "Smart Contract ABI", "WalletConnect", "TronLink", "DEX (Swap/Pool/Stake)", "Chrome Extension Wallet"], icon: Layers },
  { category: "AI Engineering", items: ["Claude Code", "MCP", "Agent Skills", "Agent Harness", "LLM Eval", "Anthropic Claude API", "OpenAI API", "Prompt Engineering", "Cursor AI", "Lovable", "v0.dev"], icon: Bot },
  { category: "Frontend & Mobile", items: ["TypeScript", "React.js", "Next.js 14+ (App Router/RSC)", "Vue.js", "React Native", "Flutter", "Tailwind CSS", "shadcn/ui", "Chakra UI", "Framer Motion"], icon: Code2 },
  { category: "State / Realtime / Viz", items: ["SWR", "Zustand", "React-Query", "Recoil", "Phaser.js", "WebSocket", "WebRTC", "D3.js", "C3.js"], icon: Smartphone },
  { category: "Backend & Infra", items: ["Node.js", "Express", "NestJS", "Java Spring Boot", "Supabase", "Prisma", "PostgreSQL", "Vercel", "Railway", "AWS", "Docker", "GitHub Actions", "Jenkins"], icon: Database },
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
  url?: string;
}

export const allProjects: Project[] = [
  // --- Personal Projects ---
  {
    slug: "arvo-tcg",
    title: "ARVO TCG (arvotcg.com)",
    company: "Personal Project",
    period: "2025 ~ 운영 중",
    type: "TCG Community · Web + RN App",
    url: "https://arvotcg.com",
    tech: ["Next.js", "TypeScript", "React Native", "PostgreSQL", "Data Pipeline", "Vercel"],
    shortDesc: "포켓몬·원피스·유희왕 TCG 실시간 시세·거래 커뮤니티. 시세 데이터 파이프라인부터 RN 앱스토어 출시까지 단독 수행.",
    description: "포켓몬·원피스·유희왕 TCG의 실시간 시세 검색, 박스별 힛카드 가격, 카드 거래·컬렉션 관리를 제공하는 커뮤니티 플랫폼입니다. 시세 데이터 파이프라인 구축부터 React Native 앱스토어 출시까지 프로덕트 전 과정을 단독으로 수행하며 웹·앱 양채널로 운영하고 있습니다.",
    details: [
      "해외 시세 소스를 집계하는 자체 데이터 파이프라인을 구축해 박스·싱글카드 단위 가격 시계열 데이터를 자체 보유",
      "수집 → 정규화 → 저장 → 서빙 흐름을 분리해 소스 추가·장애 시에도 서비스 영향 최소화",
      "박스별 힛카드 가격, 카드별 시세 추이 차트 등 시세 데이터를 사용자용 화면으로 시각화",
      "커뮤니티 피드, 카드샵, 실시간 경매(베타), 쪽지·알림 등 거래·소셜 기능과 보유 카드 시세 변동을 추적하는 컬렉션 관리 구현",
      "Next.js App Router 기반 SSR 구조로 시세·게시글 페이지의 검색 노출과 초기 로딩 최적화",
      "웹과 동일 API를 공유하는 React Native 앱을 앱스토어에 출시해 기능 추가 시 웹·앱 양채널 동시 반영 (지속 배포 v1.1.x)"
    ]
  },
  {
    slug: "dopamine-land",
    title: "dopamine.land",
    company: "Personal Project",
    period: "2025.09 ~ 2025.12",
    type: "Web Game Platform",
    url: "https://dopamine.land",
    tech: ["Next.js", "Phaser.js", "Supabase", "WebSockets", "Vercel", "MCP"],
    shortDesc: "브라우저에서 바로 동작하는 실시간 멀티플레이 게임 플랫폼. MCP 기반 개발 환경으로 단독 런칭.",
    description: "별도 설치 없이 브라우저에서 바로 동작하는 멀티플레이 게임 플랫폼입니다. 텍사스 홀덤, 1:1 테트리스 등 실시간 대전 게임과 포인트 시스템·커뮤니티 기능을 결합했으며, MCP 기반 개발 환경을 구성해 LLM이 게임 상태와 DB 스키마를 직접 조회하며 개발을 보조하는 워크플로우로 완성했습니다.",
    details: [
      "Next.js 환경에 Phaser.js 게임 엔진을 탑재해 URL 접속만으로 동작하는 웹 게임 환경 구축, 게임 캔버스와 React UI 레이어(로비·랭킹·포인트) 분리",
      "WebSockets 기반 텍사스 홀덤, 1:1 테트리스 등 실시간 멀티플레이 로직과 게임 상태 동기화 구현",
      "턴 진행·베팅·승패 판정 등 게임 룰을 서버 기준으로 검증해 클라이언트 조작 여지 차단",
      "Vercel Serverless + Supabase 조합으로 포인트 시스템과 유저 데이터 관리, 모바일 브라우저 포함 반응형 대응",
      "Supabase 등 공개 MCP 서버를 연동해 LLM이 DB 스키마·게임 상태를 직접 조회하는 개발 환경 구성, Phaser·Supabase Agent Skills로 반복 코드 생성 자동화"
    ]
  },
  {
    slug: "datebase",
    title: "DATEBASE (datebase.site)",
    company: "Personal Project",
    period: "2024.10 ~ 운영 중",
    type: "Location-based Dating App",
    url: "https://datebase.site",
    tech: ["Flutter", "Node.js", "Express", "Prisma", "Supabase", "Railway", "Docker"],
    shortDesc: "Flutter 위치 기반 데이팅 앱. 기획·개발·운영에 디자이너·인플루언서 섭외까지 앱 서비스 전 과정 수행.",
    description: "웹 중심 스택에 모바일 네이티브를 더해, 위치 기반 데이팅 앱의 기획부터 스토어 배포까지 전 과정을 단독으로 검증한 크로스 플랫폼 프로젝트입니다.",
    details: [
      "Flutter·Dart 러닝 커브를 Claude Code 기반 페어 프로그래밍 방식으로 극복하고, 위치 기반 매칭·프로필·채팅 등 핵심 플로우를 단일 코드베이스로 iOS·Android 대응",
      "Node.js(Express)와 Prisma ORM 기반 RESTful API를 설계하고 Railway로 배포",
      "Supabase를 메인 데이터베이스로 활용해 사용자 프로필, 위치, 매칭 데이터 등 관계형 데이터 관리",
      "Stage 환경을 직접 운용하기 위해 NAS 서버를 구축하고 Docker 기반 Stage 환경 구성",
      "디자이너·마케팅 인플루언서를 직접 섭외하고, APK 생성·개발자 등록·스토어 배포까지 앱 서비스 전 과정 단독 완수"
    ]
  },
  {
    slug: "poke-30",
    title: "포케페스타30 (poke-30.com)",
    company: "Personal Project",
    period: "2025.04 ~ 운영 중",
    type: "Fan Community",
    url: "https://www.poke-30.com",
    tech: ["Next.js", "TypeScript", "Mobile Web", "Community Feed", "Realtime UX"],
    shortDesc: "포켓몬 팬 커뮤니티. 사용자 제보 기반 장소 혼잡도, 카드 거래, 시세, 지도, 오리파 기능 제공.",
    description: "포케페스타30은 포켓몬 팬 이벤트와 현장 정보를 중심으로 만든 모바일 웹 커뮤니티입니다.",
    details: [
      "공개 사이트 기준 사용자 제보 기반 매장/장소 혼잡도, 시간대별 제보량, 실시간 피드 기능을 제공",
      "카드 거래, 카드 시세, 지도, 마이페이지, 작성 플로우를 하단 탭 중심의 모바일 앱 형태 UX로 구성",
      "성수 지역 이벤트와 잉어킹 프로모션 등 현장성 있는 정보를 빠르게 탐색할 수 있는 히어로/퀵 메뉴 설계",
      "픽셀 아트, 포켓볼 아이콘, 포켓몬 sprite를 활용해 팬 커뮤니티 성격에 맞춘 레트로 모바일 UI 구현",
      "SEO 메타데이터와 OG/Twitter 카드 설정으로 팬 프로젝트의 검색/공유 노출 기반 구성"
    ]
  },
  {
    slug: "cop-vs-robbers",
    title: "경찰과 도둑 (Cop vs Robbers)",
    company: "Personal Project",
    period: "2025.01 ~ 출시",
    type: "Realtime Mobile Game · React Native",
    tech: ["React Native", "WebSocket", "WebRTC", "Naver Map API", "Vision Camera"],
    shortDesc: "실시간 위치 동기화, WebRTC PTT 무전, QR 방 참가를 하나의 RN 코드베이스로 통합한 위치 기반 멀티플레이 게임.",
    description: "경찰과 도둑 역할을 나누고 GPS, 음성 통신, 지도 UI를 하나의 게임 플로우로 묶은 React Native 프로젝트입니다.",
    details: [
      "HIDING/CHASE 단계별 게임 플로우와 검거, 수감, 생존 조건을 포함한 승패 로직 구현",
      "WebSocket 기반 위치 동기화와 서버 검증 로직으로 다수 플레이어 상태 일관성 확보",
      "WebRTC P2P 시그널링 및 Push-to-Talk 무전을 도둑 팀 전용으로 연동",
      "QR 코드 생성/스캔과 Naver Map API를 활용한 레이더형 지도 UI, 근접 경고, 감옥 마커 구현",
      "WSL/Windows ADB, Metro 연동 스크립트로 실제 디바이스 빌드 및 실행 파이프라인 구축"
    ]
  },
  {
    slug: "fiesta",
    title: "FIESTA (피에스타)",
    company: "Personal Project",
    period: "2025.01 ~ 출시",
    type: "Job Platform · Next.js + NestJS",
    tech: ["Next.js", "NestJS", "TypeScript", "Prisma", "PostgreSQL", "shadcn/ui"],
    shortDesc: "구인자와 구직자를 연결하는 Next.js + NestJS 풀스택 구인구직 매칭 플랫폼.",
    description: "공고 리스트, 이력서 빌더, 지원자 트래킹, 역할별 권한을 직접 구현한 구인구직 플랫폼입니다.",
    details: [
      "Next.js App Router로 SSR/RSC 기반의 SEO와 초기 로딩 최적화 UI 구축",
      "NestJS + Prisma ORM 기반 API를 모듈, 컨트롤러, 서비스, DTO 계층으로 분리",
      "JWT 인증/인가와 구인자, 구직자, 관리자 역할별 권한 분리 구현",
      "검색 필터링, 페이지네이션, 무한 스크롤 등 리스트형 UX에 필요한 서버/클라이언트 패턴 설계",
      "Claude Code로 NestJS 모듈 생성과 CRUD 보일러플레이트 작성을 자동화"
    ]
  },
  {
    slug: "church-community",
    title: "교회 익명 커뮤니티",
    company: "Personal Project",
    period: "2024.11 ~ 2025.10",
    type: "Web Service",
    tech: ["Next.js", "TypeScript", "shadcn/ui", "Playwright", "Lovable AI"],
    shortDesc: "데이터 자동 수집 기능을 포함한 익명 소통 플랫폼.",
    description: "교회 내 정보 공유 및 소통을 위한 익명 커뮤니티 서비스로, 데이터 자동화 수집 기능을 포함한 웹 플랫폼입니다.",
    details: [
      "초기 Node.js 서버 구조에서 Next.js Serverless 아키텍처로 통합 및 전환(Migration)하여 유지보수 포인트 단일화 및 배포 효율 증대",
      "MS Playwright를 활용한 크롤러를 구축하여 교회 주보, 행사 정보 등을 JSON 형태로 자동 수집 및 시각화",
      "shadcn/ui 컴포넌트 라이브러리와 Lovable AI를 활용하여 직관적이고 모던한 UI를 빠르게 생성하고 사용자 경험(UX) 최적화"
    ]
  },
  // --- Neowiz Projects ---
  {
    slug: "neopin-wallet",
    title: "NEOPIN Wallet Extension",
    company: "NEOWIZ",
    period: "2021.12 ~ 2024.12",
    type: "Blockchain",
    tech: ["React.js", "Web3.js", "Ethers.js", "Chrome Extension"],
    shortDesc: "크롬 익스텐션 기반 블록체인 지갑 아키텍처 설계 및 개발.",
    description: "다양한 디스플레이 환경을 지원하는 크롬 익스텐션 지갑으로, 아키텍처 설계부터 블록체인 코어 기능 구현까지 담당했습니다.",
    details: [
      "React.js 기반의 반응형 마크업으로 다양한 디스플레이 환경을 지원하는 크롬 익스텐션 지갑 개발",
      "Ethers.js와 Web3.js를 활용하여 토큰 잔액 조회(Balance Fetching), 토큰 추가 등 Smart Contract 직접 호출 로직 구현",
      "SWR 라이브러리를 도입하여 API 데이터 캐싱 및 상태 동기화 전략 수립, 네트워크 요청 최적화",
      "WalletConnect 및 Background Script를 활용하여 기존 웹 서비스와 지갑 간의 실시간 연동 프로세스 구현",
      "레퍼런스가 부족한 초기 개발 환경에서 직접 테스트 베드를 구축하여 기술적 난제 해결 및 초기 구조 설계 주도",
      "주간 기술 세션을 통해 React/SWR/상태관리 패턴을 팀 내 전파하고 문서화하여 팀 전체의 기술 역량 상향 평준화 유도"
    ]
  },
  {
    slug: "neopin-landing",
    title: "NEOPIN.io Landing",
    company: "NEOWIZ",
    period: "2021.12 ~ 2024.12",
    type: "Web Frontend",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "Chakra UI"],
    shortDesc: "프론트엔드 리드로서 디자인 시스템 구축 및 인터랙션 고도화.",
    description: "서비스 브랜딩을 위한 랜딩 페이지 및 토큰 소개 사이트로, 디자인 시스템을 구축하고 고품질 인터랙션을 구현했습니다.",
    details: [
      "React.js, Chakra UI, Tailwind CSS를 결합하여 확장 가능한 컴포넌트 기반의 디자인 시스템 및 스타일/타이포 가이드라인 구축",
      "Lottie와 Framer Motion을 활용한 고품질 인터랙션 구현으로 브랜드 아이덴티티 시각화 및 UX 강화",
      "기획-디자인-개발 간 협업 효율을 높이기 위해 디자인 시스템 기반의 업무 프로세스를 정립하고 문서화 주도",
      "컴포넌트 재사용성을 극대화하여 UI 개발 생산성을 높이고, 타 직군과의 협업 비용을 획기적으로 절감"
    ]
  },
  {
    slug: "neopin-dapp",
    title: "App.neopin.io (DeFi)",
    company: "NEOWIZ",
    period: "2021.12 ~ 2024.12",
    type: "Blockchain / Hybrid",
    tech: ["Next.js", "Tailwind CSS", "Hybrid App", "Smart Contract"],
    shortDesc: "DEX 핵심 기능 개발 및 하이브리드 앱(Webview) 양방향 통신 구현.",
    description: "Swap, Pool, Stake 등 핵심 DeFi 비즈니스 로직을 처리하는 DApp으로, 하이브리드 앱 환경 최적화를 수행했습니다.",
    details: [
      "Next.js 기반의 DEX 환경에서 Swap, Pool, Stake 등 핵심 DeFi 비즈니스 로직 및 UI 레이아웃 구현",
      "ERC20 기반의 Smart Contract ABI를 분석하고 연동하여 안정적인 블록체인 트랜잭션 처리 구현",
      "Native Connector를 활용하여 웹뷰(Webview)와 네이티브 앱 간의 양방향 통신 인터페이스 개발",
      "복잡한 컨트랙트 연동 기능을 빠르게 프로토타이핑하여 팀의 기술적 의사결정 속도 단축",
      "하이브리드 앱 환경에서의 사용자 경험(UX)을 최적화하고, 복잡한 금융 로직을 안정적인 웹 서비스로 구현"
    ]
  },
  {
    slug: "neopin-admin",
    title: "통합 관리자(Admin) 페이지",
    company: "NEOWIZ",
    period: "2021.12 ~ 2024.12",
    type: "Internal Tool",
    tech: ["React.js", "React-Query", "Zustand", "Material-UI"],
    shortDesc: "레거시(Svelte) 마이그레이션 및 상태 관리 최적화.",
    description: "사내 운영을 위한 통합 관리자 페이지로, 기존 레거시 시스템을 React로 전환하고 상태 관리를 최적화했습니다.",
    details: [
      "기존 Svelte 기반의 관리자 페이지를 React.js로 전면 전환(Migration)하여 기술 스택 통일 및 유지보수성 확보",
      "상태 관리 로직을 React-Query에서 SWR과 Zustand로 교체하여 전역 상태 관리의 복잡도를 낮추고 성능 최적화",
      "Material-UI와 Chakra UI를 상황에 맞게 커스터마이징하여 관리자 UX 개선",
      "사내 Wiki를 통해 마이그레이션 과정, API 표준, 상태 관리 규칙을 체계화하여 팀의 자산으로 문서화"
    ]
  },
  {
    slug: "betspider",
    title: "BETSPIDER.IO",
    company: "NEOWIZ",
    period: "2020.03 ~ 2021.12",
    type: "Blockchain Game",
    tech: ["Vue.js", "TypeScript", "TronLink", "SCSS"],
    shortDesc: "블록체인 기반 카지노 웹앱 개발 및 트론 네트워크 연동.",
    description: "트론(Tron) 블록체인을 기반으로 한 실시간 베팅 서비스로, 지갑 연동 및 결제 로직을 구현했습니다.",
    details: [
      "Vue 2.0 환경에 TypeScript를 점진적으로 도입하여 코드 안정성 및 타입 추론 기능 강화",
      "TronLink Wallet DApp 연동을 통해 지갑 연결, 입금(Deposit), 출금(Withdraw) 등 핵심 결제 로직 구현",
      "노드(Node)에 직접 sendTransaction을 Call하여 블록체인 네트워크와의 통신 신뢰성 확보",
      "HTML5, SCSS를 활용하여 메인 랜딩 및 이벤트 페이지의 애니메이션 마크업 구현"
    ]
  },
  // --- Trumpia Projects ---
  {
    slug: "trumpia-chart",
    title: "Report Chart Refactoring",
    company: "Trumpia",
    period: "2018.11 ~ 2019.05",
    type: "Data Visualization",
    tech: ["D3.js", "C3.js", "JavaScript"],
    shortDesc: "차트 렌더링 엔진 단일화 및 성능 30% 개선.",
    description: "대규모 데이터 시각화 리포트의 핵심 차트 모듈을 리팩토링하고 렌더링 성능을 개선했습니다.",
    details: [
      "D3.js와 C3.js로 혼재된 레거시 시각화 모듈을 분석하여 C3.js 기반의 단일 렌더링 엔진으로 재설계",
      "Factory 패턴을 적용해 다양한 차트 타입(Line, Bar, Pie 등)을 동적으로 생성하도록 구조화",
      "차트 로딩 속도 및 렌더링 성능을 30% 이상 개선하여, 리포트 페이지의 데이터 조회 속도를 획기적으로 단축"
    ]
  },
  {
    slug: "trumpia-dashboard",
    title: "Data Visualization Dashboard",
    company: "Trumpia",
    period: "2016.10 ~ 2018.11",
    type: "Full Stack",
    tech: ["D3.js", "Java", "Jenkins", "RequireJS"],
    shortDesc: "대규모 데이터 집계 및 시각화 대시보드 풀스택 구축.",
    description: "복잡한 집계 데이터를 시각화하여 고객 분석 효율을 높인 대시보드로, 프론트엔드부터 백엔드까지 풀스택으로 수행했습니다.",
    details: [
      "D3.js와 C3.js를 결합하여 복잡한 집계 데이터를 다양한 차트로 표현하는 시각화 모듈을 직접 개발하고, RequireJS로 의존성 관리",
      "Jenkins 기반의 CI/CD(Dev-Stage-Live) 파이프라인을 구축하고, GitLab 코드 리뷰 문화를 도입하여 배포 안정성 강화",
      "Java Controller 및 DTO 설계를 포함한 백엔드 연동을 직접 수행하여 대시보드 데이터의 정확도와 전송 효율 최적화",
      "복잡한 수치 데이터를 직관적인 시각화 차트로 변환하여 고객의 데이터 분석 효율성을 극대화"
    ]
  },
  {
    slug: "trumpia-legacy",
    title: "Legacy System Modernization",
    company: "Trumpia",
    period: "2016.01 ~ 2020.02",
    type: "Full Stack / Migration",
    tech: ["Java Spring Boot", "Bootstrap", "PHP", "Linux"],
    shortDesc: "PHP 레거시 시스템을 Spring Boot로 재구축 및 반응형 리뉴얼.",
    description: "노후화된 PHP 기반 시스템을 Java Spring Boot 아키텍처로 전면 재구축하고 반응형 웹으로 리뉴얼했습니다.",
    details: [
      "노후화된 PHP 기반의 레거시 시스템을 Java Spring Boot 기반의 아키텍처로 전면 재구축하여 시스템 구조 개선",
      "HTML5와 Bootstrap을 도입하여 기존 웹 사이트를 모바일 환경에 최적화된 반응형 웹(Responsive Web)으로 리뉴얼",
      "Apache, Tomcat, CentOS 등 서버 인프라 환경 구축부터 백엔드, 프론트엔드 개발까지 전 과정을 주도",
      "프론트엔드 코드의 유지보수성을 높이기 위해 프로토타입(Prototype) 패턴을 적용하여 모듈화 진행"
    ]
  },
  {
    slug: "trumpia-support",
    title: "Global Service Support",
    company: "Trumpia",
    period: "2016.01 ~ 2016.08",
    type: "Backend / Infra",
    tech: ["PHP", "Apache", "ORM"],
    shortDesc: "글로벌 서비스 안정화 및 주요 고객사 기술 지원.",
    description: "미국 본사 및 AT&T 등 주요 고객사의 기술적 이슈를 해결하고 시스템 안정성을 확보했습니다.",
    details: [
      "미국 본사 및 주요 고객사(AT&T)와의 직접적인 소통을 통해 OEM 서버 테스팅 및 이슈 트래킹 수행",
      "사내 PHP 프레임워크(ORM)를 활용하여 모바일 앱 및 외부 시스템 연동을 위한 API를 직접 설계 및 개발",
      "Apache 웹 서버 설정 튜닝 및 로깅 시스템 개선을 통해 트래픽 부하를 안정적으로 처리",
      "글로벌 클라이언트의 요구사항을 신속하게 반영하고 시스템 장애를 예방하여 서비스 신뢰도 확보"
    ]
  },
  {
    slug: "trumpia-db-tool",
    title: "DB Query Optimization Tool",
    company: "Trumpia",
    period: "2015.10 ~ 2016.04",
    type: "Internal Tool",
    tech: ["Oracle 12g", "PHP"],
    shortDesc: "커스텀 데이터 추출 툴 개발 및 쿼리 튜닝.",
    description: "비효율적인 쿼리를 개선하고 운영 업무를 자동화하는 툴을 개발했습니다.",
    details: [
      "Oracle 12g 환경에서 복잡한 조인(Join) 쿼리의 실행 계획(Cost)을 분석하고 튜닝하여 데이터 처리 성능 최적화",
      "클라이언트가 쿼리 바인딩을 통해 필요한 데이터를 직접 조회할 수 있는 '커스텀 데이터 추출 툴'을 PHP로 개발",
      "사내 데이터베이스 구조(ERD)를 분석하고 최신화된 문서로 정리하여 팀 내 데이터 이해도 향상",
      "비효율적인 쿼리를 개선하여 트랜잭션 속도를 높이고, 단순 반복적인 데이터 추출 업무를 자동화"
    ]
  }
];

// ---- Resume v2 기반 상세 경력 ----
export interface CareerCase {
  title: string;
  period?: string;
  background?: string;
  action: string;
  impact: string;
}

export interface Career {
  company: string;
  period: string;
  role: string;
  summary: string;
  cases: CareerCase[];
}

export const careerTotal = "총 8년 8개월 + 독립 개발 1년 5개월";

export const careers: Career[] = [
  {
    company: "독립 개발 / AI 기반 프로덕트 빌딩",
    period: "2025.01 ~ 현재",
    role: "풀스택 메이커",
    summary:
      "LLM 도구를 실제 프로덕트 개발에 녹이는 검증 기간. 기획 → 개발 → 디자이너·인플루언서 섭외 → 서버 구축 → 스토어 배포까지 프로덕트를 단독 완수하며, 개발 병목을 AI 워크플로우로 해결한 사례를 축적했습니다.",
    cases: [
      {
        title: "1인 개발의 속도 한계",
        action: "Claude Code를 자동완성이 아닌 PR 단위 작업 위임 도구로 운용 — 에이전트가 파일·테스트·빌드를 직접 조작하는 구조.",
        impact: "구현 사이클 체감 약 2배 단축 (dopamine.land 게임 로직, Piesta NestJS CRUD 보일러플레이트 기준).",
      },
      {
        title: "LLM이 프로젝트 컨텍스트를 모르는 문제",
        action: "Supabase 스키마·게임 상태를 LLM이 직접 조회하는 커스텀 MCP 서버를 구현해 도입. 공개 Agent Skills(코드 리뷰·PR 정리 등)를 선별 도입해 토큰 사용 최적화.",
        impact: "수동 컨텍스트 복붙 제거, 반복 작업 자동화로 운영 부담 감소.",
      },
      {
        title: "에이전트의 반복 실패와 품질 저하",
        action: "툴 호출 실패 시 재시도·에러 복구 로직을 Node 레이어에 직접 구성(Agent Harness). 주보 파싱 같은 반복 작업에는 정답 세트 기반 간이 eval로 프롬프트 변경 시 품질 회귀 감지.",
        impact: "LLM이 같은 실수를 무한 반복하는 패턴 차단, 산출물 품질을 일정 수준으로 유지.",
      },
    ],
  },
  {
    company: "㈜네오위즈 — 블록체인 사업부 Neopin",
    period: "2020.03 ~ 2024.12",
    role: "시니어 FE / NEOPIN.io FE 리드",
    summary:
      "판교 기반 게임 퍼블리싱·개발사의 블록체인 사업부 Neopin(Open DeFi 플랫폼) 핵심 기여자. 지갑 익스텐션 → 랜딩·디자인 시스템 → DEX DApp → Admin까지 프로덕트 전 영역을 담당했습니다.",
    cases: [
      {
        title: "NEOPIN 지갑 익스텐션 — Chrome Extension Wallet",
        period: "2021.12 ~ 2024.12",
        background: "참고 레퍼런스가 거의 없던 초기 시점에 블록체인 지갑 익스텐션 아키텍처 설계를 단독으로 담당.",
        action:
          "테스트 베드를 직접 구축하며 React 기반 반응형 구조(팝업 ~ 전체 화면) 설계. Ethers.js·Web3.js로 Smart Contract 직접 호출, WalletConnect + Background Script로 웹 서비스 ↔ 지갑 실시간 연동. 여러 화면이 각자 요청하던 잔액·네트워크 정보를 SWR 캐시로 통합.",
        impact: "메인 화면 Lighthouse 성능 점수 약 20% 향상. 팀이 참고하는 아키텍처 기반 제공, 주간 기술 세션으로 React·SWR 패턴 전파.",
      },
      {
        title: "app.neopin.io — DeFi DApp (DEX)",
        background: "Swap·Pool·Stake 등 복잡한 금융 로직을 웹·하이브리드 앱 양쪽에서 안정적으로 처리해야 하는 환경.",
        action: "Next.js 기반 DEX 핵심 기능의 비즈니스 로직·UI 구현, ERC20 ABI 연동으로 트랜잭션 안정 처리. Native Connector로 웹뷰 ↔ 네이티브 앱 양방향 통신 인터페이스 개발.",
        impact: "복잡한 컨트랙트 연동 기능을 빠른 프로토타입으로 경영진·디자인팀과 공유 — 의사결정 소요 시간 약 50% 단축.",
      },
      {
        title: "NEOPIN.io — 서비스 랜딩 · 디자인 시스템 (FE 리드)",
        background: "기획·디자인·개발 간 UI 수정이 4~5회 반복되는 비효율적 협업 구조.",
        action: "Chakra UI(빠른 컴포넌트 베이스) + Tailwind CSS(브랜드 커스터마이징) 조합으로 디자인 시스템·타이포 가이드라인 구축. Lottie·Framer Motion으로 브랜드 인터랙션 구현, 협업 프로세스 문서화.",
        impact: "UI 개발 반복 비용 4~5회 → 1~2회로 감소. 팀 표준 프로세스로 정착.",
      },
      {
        title: "통합 관리자(Admin) 아키텍처 전환 · 성능 최적화",
        background: "유지보수 인력 확보가 어려운 Svelte 레거시를 팀 표준 스택(React)으로 전환.",
        action: "전역 상태가 적고 캐싱이 중요한 Admin 특성을 고려해 React-Query 대신 SWR + Zustand 조합으로 상태 관리 재설계.",
        impact: "번들 크기 축소, 메인 페이지 데이터 페칭 속도 34% 개선. 마이그레이션·API 표준을 Notion Wiki로 문서화해 온보딩 자료로 활용.",
      },
      {
        title: "BETSPIDER.IO — 블록체인 카지노 웹앱 (Tron)",
        period: "2020.03 ~ 2021.12",
        background: "트론 네트워크 기반 베팅 서비스의 프론트엔드 및 결제 플로우 전담.",
        action: "TronLink 연동으로 지갑 연결·입출금 흐름 구현. 중간 서버 없이 노드에 sendTransaction을 직접 호출해 레이턴시를 줄이고 에러 핸들링을 정교화. Vue 2에 TypeScript 점진 도입.",
        impact: "블록체인 베팅 서비스 런칭 및 초기 운영 안정화.",
      },
    ],
  },
  {
    company: "Trumpia — 실리콘밸리 B2B 메시징",
    period: "2016.01 ~ 2020.02",
    role: "풀스택 개발자",
    summary: "미국 본사·AT&T 고객사 엔지니어와 영어로 직접 커뮤니케이션하며 프론트엔드부터 백엔드·인프라까지 풀스택 개발을 수행했습니다.",
    cases: [
      {
        title: "반응형 리포트 차트 리팩토링",
        period: "2018.11 ~ 2019.05",
        action: "D3.js·C3.js가 혼재된 시각화 모듈을 C3.js 단일 렌더링 엔진으로 재설계, 차트 타입을 Factory 패턴으로 동적 생성 — 신규 차트 추가 시 기존 코드 수정이 필요 없는 구조.",
        impact: "차트 로딩·렌더링 성능 30% 이상 개선.",
      },
      {
        title: "대규모 데이터 시각화 대시보드 & CI/CD",
        period: "2016.10 ~ 2018.11",
        action: "D3.js + C3.js 기반 집계 데이터 시각화 모듈 설계(Java Controller·DTO까지 직접 수정). Jenkins로 Dev·Stage·Live 3단계 CI/CD 구축, GitLab 코드 리뷰 프로세스 도입.",
        impact: "고객사 데이터 분석 효율 개선, 배포 전 검증 단계 정착.",
      },
      {
        title: "레거시 현대화 (PHP → Spring Boot) · 반응형 리뉴얼",
        action: "PHP 레거시를 모듈 단위로 Spring Boot 마이그레이션, 데스크탑 전용 웹을 Bootstrap 반응형으로 리뉴얼. Apache·Tomcat·CentOS 인프라 설정 전담.",
        impact: "레거시 부채 해소로 시스템 안정성·유지보수성 개선.",
      },
    ],
  },
];

export const impacts = [
  { value: "20%", label: "Lighthouse 성능 향상", note: "NEOPIN 지갑 — 중복 요청을 SWR 캐시로 통합" },
  { value: "34%", label: "데이터 페칭 개선", note: "Admin Svelte → React, SWR + Zustand 재설계" },
  { value: "4~5→1~2", label: "UI 수정 반복 횟수", note: "NEOPIN.io 디자인 시스템 리드" },
  { value: "50%", label: "의사결정 시간 단축", note: "DEX 컨트랙트 기능 프로토타입 선공유" },
  { value: "30%+", label: "차트 렌더링 성능", note: "Trumpia — C3.js 단일 엔진 + Factory 패턴" },
  { value: "2×", label: "구현 사이클 단축(체감)", note: "Claude Code PR 단위 작업 위임" },
];

export const leadershipNotes = [
  { title: "기술 리드 & 전파", body: "NEOPIN.io FE 리드로 디자인 시스템·협업 프로세스를 팀 표준으로 정착. 주간 기술 세션(React·SWR·상태 관리)을 운영하고, Svelte→React 전환을 직접 제안해 완수했습니다." },
  { title: "직군 간 협업", body: "디자인 시스템으로 UI 수정 반복 4~5회 → 1~2회, 프로토타입 선공유로 의사결정 시간 약 50% 단축. Trumpia에서 미국 본사·AT&T 엔지니어와 영어로 직접 소통했습니다." },
  { title: "End-to-End 오너십", body: "독립 개발 프로덕트를 단독 완주 — 디자이너·인플루언서 섭외, NAS 서버 구축, 앱스토어 등록까지. 레퍼런스 없던 지갑 익스텐션 초기 구조도 테스트 베드를 만들며 직접 설계했습니다." },
  { title: "AI-Native Team Enablement", body: "개인 워크플로우(Claude Code·MCP·Skills·Harness)를 팀 단위로 전파할 수 있습니다. 네오위즈에서 주간 세션으로 기술을 팀에 정착시킨 경험이 있습니다." },
];

export const education = [
  { title: "한남대학교 컴퓨터공학과 졸업", period: "2009.03 ~ 2015.02" },
  { title: "애자일 기반 자바 개발자 과정 · 비트교육센터", period: "2015.03 ~ 2015.07" },
  { title: "영어 — 비즈니스 업무 가능 · JLPT N5", period: "외국어" },
];

export const manifesto =
  "8년간 React·Vue·Next.js로 프론트엔드를 해왔고, 그중 약 5년을 블록체인 도메인에서 보냈습니다. 최근에는 Claude Code·MCP·Agent Skills 워크플로우를 실제 프로덕트에 적용하며 AI 도구가 개발 병목을 어디까지 해결하는지 직접 검증했습니다. 이제 이 두 축을 회사에서 결합해, 프로덕션 수준의 프론트엔드를 책임지면서 검증된 AI 워크플로우를 팀에 정착시키고 싶습니다.";
