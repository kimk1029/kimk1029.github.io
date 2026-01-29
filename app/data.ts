import { Code2, Layers, Smartphone, Bot, Database } from "lucide-react";
export const experience = [
  {
    company: "Personal Project (Self-Employed)",
    role: "Full Stack Developer",
    period: "2025.01 ~ 현재",
    description: "AI 기반 개발 생산성 극대화 및 신규 서비스 런칭 준비 중",
    details: [
      "Cursor AI 및 LLM을 활용한 개발 워크플로우 최적화 연구",
      "dopamine.land 및 위치 기반 데이팅 앱 고도화",
      "새로운 비즈니스 모델 발굴 및 MVP 빠른 검증"
    ]
  },
  {
    company: "NEOWIZ (네오위즈)",
    role: "Frontend Developer (Blockchain Team)",
    period: "2020.03 ~ 2024.12",
    description: "블록체인 오픈 DeFi 플랫폼 'Neopin' 및 게임 플랫폼 개발",
    details: [
      "Neopin 지갑 익스텐션(Chrome) 아키텍처 설계 및 코어 기능 구현",
      "React/SWR 기반 상태 관리 최적화 및 디자인 시스템 도입 주도",
      "하이브리드 앱(Webview)과 네이티브 간 양방향 통신 인터페이스 개발",
      "레거시(Svelte) 관리자 페이지 React 마이그레이션 성공적 수행"
    ]
  },
  {
    company: "Trumpia",
    role: "Full Stack Developer (Base Team)",
    period: "2016.01 ~ 2020.02",
    description: "미국 실리콘밸리 소재 메시징 서비스 기업 (본사 협업)",
    details: [
      "대규모 데이터 시각화 차트 엔진(D3.js/C3.js) 리팩토링 (성능 30% 개선)",
      "PHP 레거시 시스템 -> Java Spring Boot 마이그레이션 주도",
      "글로벌 클라이언트(AT&T) 기술 지원 및 Jenkins CI/CD 구축",
      "반응형 웹 리뉴얼 및 크로스 브라우징 이슈 해결"
    ]
  }
];
export const personalInfo = {
  // ... 기존 데이터
  name: "김규현 (Kyu-hyun Kim)",
  title: "Frontend Engineer",
  subtitle: "Web3 & Blockchain | AI-Assisted Dev",
  email: "kimk1029@naver.com",
  phone: "010-3244-0103", // 이력서 기반 번호
  github: "https://github.com/kimk1029",
  summary: [
    // About 섹션에서 비행기가 지나갈 문구들
    "탄탄한 UI/UX 개발 역량 위에 블록체인(Web3) 도메인 지식을 더한 8년 차 개발자입니다.",
    "기술적 구현을 넘어 프론트엔드가 '협업의 허브'임을 이해하며, 주도적으로 디자인 시스템을 도입하고 팀의 효율을 높여왔습니다.",
    "최근에는 Cursor AI 등 AI 도구를 적극 활용하여 개발 생산성을 극대화하는 데 집중하고 있습니다."
  ]
};

export const skills = [
  { category: "Frontend", items: ["React.js", "Next.js 14+", "TypeScript", "Tailwind CSS", "Vue.js", "Shadcn/ui"], icon: Code2 },
  { category: "Web3", items: ["Web3.js", "Ethers.js", "WalletConnect", "Smart Contract"], icon: Layers },
  { category: "Mobile/Game", items: ["Flutter", "React Native", "Phaser.js", "D3.js"], icon: Smartphone },
  { category: "AI/Tools", items: ["Cursor AI", "OpenAI API", "Prompt Engineering"], icon: Bot },
  { category: "Backend", items: ["Node.js", "Supabase", "PostgreSQL", "Java Spring", "Docker"], icon: Database },
];

// 이미지 플레이스홀더 (추후 실제 프로젝트 스크린샷으로 교체 권장)
const placeholderSpace = (id: number) => `https://picsum.photos/seed/space${id}/800/600?grayscale&blur=2`;
const placeholderTech = (id: number) => `https://picsum.photos/seed/tech${id}/800/600?grayscale`;

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
  image?: string;
  url?: string;
}

export const allProjects: Project[] = [
  // --- Personal Projects ---
  {
    slug: "dopamine-land",
    title: "dopamine.land",
    company: "Personal Project",
    period: "2025.09 ~ 2025.12",
    type: "Web Game Platform",
    image: placeholderTech(1),
    url: "https://dopamine.land",
    tech: ["Next.js", "Phaser.js", "Supabase", "WebSockets", "Cursor AI"],
    shortDesc: "웹 기반 멀티플레이 게임 플랫폼. Cursor AI를 활용해 개발 속도 2배 단축.",
    description: "네오위즈 재직 시 습득한 게임 엔진 기술을 웹 서비스에 접목하여 구축한 카지노 컨셉의 멀티플레이 게임 놀이터입니다.",
    details: [
      "Next.js 환경에 Phaser.js 게임 엔진을 최적화하여 탑재, 별도 설치 없는 고성능 웹 게임 환경 구축",
      "WebSockets을 활용하여 '텍사스 홀덤', '1:1 테트리스' 등의 실시간 멀티플레이 로직과 게임 상태 동기화 구현",
      "Vercel 배포 환경에 맞춰 백엔드 로직을 Serverless로 구성하고, Supabase를 이용해 포인트 시스템 및 유저 데이터 관리",
      "Cursor AI의 바이브 코딩(Vibe Coding) 기능을 적극 활용하여 게임 로직 구현 속도를 2배 이상 단축하고, 도메인 연결 및 SSL 보안 적용 완료"
    ]
  },
  {
    slug: "datepick-app",
    title: "위치 기반 데이팅 앱",
    company: "Personal Project",
    period: "2024.10 ~ 진행중",
    type: "Mobile App",
    image: placeholderTech(2),
    tech: ["Flutter", "Node.js", "Prisma", "Docker", "Supabase"],
    shortDesc: "Flutter 기반 위치 매칭 서비스. 기획부터 스토어 배포까지 풀스택 주도.",
    description: "Flutter로 제작된 위치 기반 매칭 서비스로, APK 생성 및 스토어 배포 준비 단계까지 진행된 풀스택 프로젝트입니다.",
    details: [
      "익숙하지 않은 Flutter/Dart 환경이었으나, Cursor AI와의 페어 프로그래밍을 통해 러닝 커브를 극복하고 네이티브 수준의 앱 기능 구현",
      "Node.js(Express)와 Prisma ORM을 사용하여 안정적인 RESTful API를 설계하고, Railway를 통해 서버를 배포하여 운영 환경 구축",
      "Supabase를 메인 데이터베이스로 활용하여 사용자 프로필, 매칭 기록, 채팅 로그 등 복잡한 관계형 데이터를 효율적으로 관리",
      "직접 Stage 서버를 운용하기 위해 Nas 서버를 구축하고, Docker에 우분투 이미지를 올려 Stage 서버 구성",
      "직접 마케팅 인플루언서와 디자이너를 섭외하여 기획부터 개발, 마케팅까지 프로젝트 전 과정 주도"
    ]
  },
  {
    slug: "church-community",
    title: "교회 익명 커뮤니티",
    company: "Personal Project",
    period: "2024.11 ~ 2025.10",
    type: "Web Service",
    image: placeholderTech(3),
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
    image: placeholderSpace(4),
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
    image: placeholderSpace(5),
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
    image: placeholderSpace(6),
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
    image: placeholderTech(7),
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
    image: placeholderSpace(8),
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
    image: placeholderTech(9),
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
    image: placeholderTech(10),
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
    image: placeholderTech(11),
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
    image: placeholderTech(12),
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
    image: placeholderTech(13),
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