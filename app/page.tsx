'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Mail,
  ExternalLink,
  Code2,
  Layers,
  Smartphone,
  Bot,
  Database,
  ChevronDown,
} from 'lucide-react';

// --- Data Section (이력서 데이터) ---

const personalInfo = {
  name: '김규현 (Kyu-hyun Kim)',
  title: '협업의 중심에서 신뢰를 만드는 8년 차 프론트엔드 전문가',
  subtitle: 'Frontend | Web3 & Blockchain | AI-Assisted Dev',
  email: 'kimk1029@naver.com',
  github: 'https://github.com/kimk1029',
  summary: [
    '탄탄한 UI/UX 개발 역량 위에 블록체인(Web3) 도메인 지식을 더한 8년 차 개발자입니다.',
    "기술적 구현을 넘어 프론트엔드가 '협업의 허브'임을 이해하며, 주도적으로 디자인 시스템을 도입하고 팀의 효율을 높여왔습니다.",
    '최근에는 Cursor AI 등 AI 도구를 적극 활용하여 개발 생산성을 극대화하는 데 집중하고 있습니다.',
  ],
};

const skills = [
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js 14+', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    category: 'Web3 & Blockchain',
    items: ['Web3.js', 'Ethers.js', 'WalletConnect', 'Smart Contract Integration'],
    icon: <Layers className="w-6 h-6" />,
  },
  {
    category: 'Mobile & Game',
    items: ['Flutter', 'React Native', 'Phaser.js', 'D3.js'],
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    category: 'AI & Productivity',
    items: ['Cursor AI', 'OpenAI API', 'Prompt Engineering', 'Vercel'],
    icon: <Bot className="w-6 h-6" />,
  },
  {
    category: 'Backend & Infra',
    items: ['Node.js', 'Supabase', 'PostgreSQL', 'Docker', 'AWS'],
    icon: <Database className="w-6 h-6" />,
  },
];

const experience = [
  {
    company: 'NEOWIZ (네오위즈)',
    role: '프론트엔드 개발팀',
    period: '2020.03 ~ 2024.12',
    description:
      "블록체인 Open DeFi 플랫폼 'Neopin'의 핵심 프론트엔드 개발 및 디자인 시스템 구축 주도.",
    achievements: [
      'Chrome Extension 지갑 아키텍처 설계 및 블록체인 코어 기능 구현',
      'SWR 도입 및 상태 관리 최적화로 팀 기술 역량 상향 평준화',
      'Webview와 Native App 간 양방향 통신 인터페이스 개발 (Hybrid App)',
      '레거시 관리자 페이지 React 전환 및 디자인 시스템 구축',
    ],
  },
  {
    company: 'Trumpia',
    role: 'Base Team / 사원',
    period: '2016.01 ~ 2020.02',
    description: '미국 실리콘밸리 소재 메시징 서비스 기업. 데이터 시각화 및 풀스택 개발.',
    achievements: [
      'D3.js/C3.js 기반 대규모 데이터 시각화 엔진 리팩토링 (성능 30% 개선)',
      'PHP 레거시 시스템을 Java Spring Boot로 마이그레이션 주도',
      '글로벌 클라이언트(AT&T 등) 기술 지원 및 안정화',
    ],
  },
];

const projects = [
  {
    title: 'Neopin Wallet Extension',
    tech: ['React.js', 'Web3.js', 'Ethers.js', 'Chrome API'],
    desc: '다양한 디스플레이 환경을 지원하는 크롬 익스텐션 지갑. 토큰 전송, 스왑 등 핵심 블록체인 기능을 구현하고 상태 관리 패턴을 정립했습니다.',
    type: 'Company',
  },
  {
    title: 'Dopamine.land',
    tech: ['Next.js', 'Phaser.js', 'Supabase', 'Cursor AI'],
    desc: '카지노 컨셉의 웹 기반 멀티플레이 게임 플랫폼. WebSocket을 활용한 실시간 게임 동기화 및 AI 코딩 도구를 활용해 개발 속도를 2배 단축했습니다.',
    type: 'Personal / Side',
  },
  {
    title: '위치 기반 데이팅 앱',
    tech: ['Flutter', 'Node.js', 'Prisma', 'Docker'],
    desc: 'Flutter로 제작된 위치 기반 매칭 서비스. 기획부터 Docker 기반 배포, 스토어 등록까지 풀스택으로 진행한 프로젝트입니다.',
    type: 'Personal / Side',
  },
  {
    title: 'Trumpia Data Dashboard',
    tech: ['D3.js', 'Java', 'Spring Boot'],
    desc: '복잡한 메시징 데이터를 시각화하는 대시보드. 팩토리 패턴을 적용해 차트 생성 구조를 개선하고 렌더링 성능을 최적화했습니다.',
    type: 'Company',
  },
];

// --- Components ---

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="text-3xl md:text-4xl font-bold mb-12 text-slate-100 border-l-4 border-blue-500 pl-4"
  >
    {children}
  </motion.h2>
);

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-colors ${className}`}
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-6">
        <div className="max-w-4xl w-full space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-blue-400 font-medium tracking-wider mb-4">
              PORTFOLIO
            </h3>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Hello, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.title}
            </p>
            <p className="mt-2 text-sm text-slate-500">{personalInfo.subtitle}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4 pt-4"
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              <Mail size={18} /> Contact Me
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors border border-slate-700 font-medium"
            >
              <Github size={18} /> GitHub
            </a>
          </motion.div>
        </div>

        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl -z-0 pointer-events-none" />

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown className="text-slate-500" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading>About Me</SectionHeading>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg leading-relaxed"
          >
            {personalInfo.summary.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
              <h3 className="text-4xl font-bold text-white mb-2">8+</h3>
              <p className="text-slate-500 text-sm">Years Experience</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
              <h3 className="text-4xl font-bold text-blue-400 mb-2">Web3</h3>
              <p className="text-slate-500 text-sm">Blockchain Specialist</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
              <h3 className="text-4xl font-bold text-cyan-400 mb-2">AI</h3>
              <p className="text-slate-500 text-sm">Productivity Driven</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
              <h3 className="text-4xl font-bold text-white mb-2">Full</h3>
              <p className="text-slate-500 text-sm">Stack Capability</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Tech Stack</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, idx) => (
              <Card key={idx}>
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  {skill.icon}
                  <h3 className="font-bold text-xl text-slate-100">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-700/50 rounded-md text-sm text-slate-300 border border-slate-600/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <SectionHeading>Experience</SectionHeading>
        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Connector for Desktop */}
              <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />

              <div
                className={`md:flex justify-between items-start gap-12 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Date Side */}
                <div
                  className={`hidden md:block w-1/2 ${idx % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}
                >
                  <span className="text-blue-400 font-bold text-lg">
                    {exp.period}
                  </span>
                </div>

                {/* Content Side */}
                <div className="md:w-1/2 relative">
                  {/* Mobile Date */}
                  <span className="md:hidden block text-blue-400 font-bold mb-2">
                    {exp.period}
                  </span>

                  {/* Dot - CSS만 사용 (SSR/hydration 안전) */}
                  <div
                    className="absolute top-2 -left-[26px] w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-950 z-10 md:left-1/2 md:-translate-x-1/2"
                    aria-hidden
                  />

                  <Card className="relative z-10 ml-4 md:ml-0">
                    <h3 className="text-xl font-bold text-white">
                      {exp.company}
                    </h3>
                    <p className="text-slate-400 mb-4 font-medium">
                      {exp.role}
                    </p>
                    <p className="mb-4 text-slate-300">{exp.description}</p>
                    <ul className="space-y-2">
                      {exp.achievements.map((ach, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        {project.type}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <ExternalLink className="text-slate-500 hover:text-white transition-colors cursor-pointer" />
                  </div>
                  <p className="text-slate-400 mb-6 flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-slate-950 rounded border border-slate-800 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-slate-500">
        <p>© {new Date().getFullYear()} Kyu-hyun Kim. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Built with Next.js, Tailwind CSS & Framer Motion
        </p>
      </footer>
    </div>
  );
}
