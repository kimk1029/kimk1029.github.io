"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Mail } from "lucide-react";
import {
  allProjects,
  careerTotal,
  careers,
  education,
  experience,
  impacts,
  leadershipNotes,
  manifesto,
  personalInfo,
  skills,
} from "./data";
import { Patch, TRANSMITTING, patchName } from "./Patch";
import OrbitScene from "./OrbitScene";
import BriefingPlanet from "./BriefingPlanet";
import Warp from "./Warp";

const EASE = [0.16, 1, 0.3, 1] as const;

const navItems = [
  ["제작기", "#briefing"],
  ["경력 여정", "#journey"],
  ["성과", "#impact"],
  ["경력", "#career"],
  ["AI 워크플로우", "#ai"],
  ["프로젝트", "#projects"],
  ["스킬", "#skills"],
  ["연락", "#contact"],
];

const aiStack = [
  { title: "에이전틱 개발", tool: "Claude Code · Codex · Cursor", body: "자동완성이 아니라 PR 단위로 작업을 위임합니다. 에이전트가 파일·테스트·빌드를 직접 조작하고, 저는 리뷰와 방향을 잡습니다." },
  { title: "MCP 연동", tool: "Model Context Protocol", body: "직접 만든 서버가 아니라 Supabase 등 공개 MCP 서버를 연결해, LLM이 DB 스키마를 직접 조회하게 했습니다. 컨텍스트를 복사해 붙여넣는 일이 줄었습니다." },
  { title: "Agent Skills & Harness", tool: "Skills · Retry · Recovery", body: "Skills는 에이전트에게 주는 '작업 설명서'입니다. 공개된 것 중 필요한 것만 골라 붙여, 매번 긴 설명을 반복하느라 토큰을 낭비하지 않게 했습니다. Harness는 에이전트를 감싸는 안전장치입니다. 도구 호출이 실패하면 다시 시도하고, 같은 실수를 반복하면 멈추고, 대화가 길어지면 필요한 내용만 남기도록 Node로 직접 짰습니다." },
  { title: "LLM API & 품질 체크", tool: "Anthropic · OpenAI", body: "자주 반복하는 작업(예: 교회 주보 파싱)은 '이 입력엔 이 결과가 나와야 한다'는 정답 예시를 몇 개 만들어 둡니다. 프롬프트를 고칠 때마다 결과를 정답과 맞춰 보고, 고친 뒤 오히려 나빠졌는지 바로 확인합니다. 흔히 eval(평가)이라 부르는 방식입니다." },
  { title: "AI UI 생성", tool: "Claude Design · DESIGN.md · impeccable", body: "GitHub 스타 약 7.8만 개의 디자인 스킬 impeccable을 설치하고, 색·타이포·간격 규칙을 DESIGN.md에 적어 둡니다. 그다음 Claude Design으로 시안을 뽑을 때 '이 DESIGN.md와 impeccable 기준을 지켜서 만들어'라고 지시합니다. 방향은 문서와 스킬이 잡고, 마지막 다듬기는 제가 합니다." },
];
const aiColors = ["bg-nasa text-white", "bg-flight text-white", "bg-[#1b1f3b] text-pad", "bg-[#2a1240] text-pad", "bg-pad text-ink"];

// Oldest first: the rocket climbs through the career.
const stages = [...experience].reverse().map((exp, i) => ({
  ...exp,
  name: ["1단 부스터", "2단 엔진", "궤도 진입"][i],
  event: ["2016 Trumpia", "2020 네오위즈", "2025 독립 개발"][i],
  theme: ["bg-flight/90 text-white", "bg-[#0b1240]/85 text-white", "bg-transparent text-white"][i],
}));

const PROFILE = "M 40 560 C 300 552, 500 430, 620 280 S 860 70, 960 52";

const buildLog = [
  {
    step: "관심사를 컨셉으로",
    short: "우주는 제 관심사입니다. 경력이 발사 → 궤도 → 교신으로 읽히도록 설계했습니다.",
    tools: ["우주", "개인 관심사"],
    me: "우주는 제가 원래 좋아하는 관심사입니다. 경력이 '발사 → 궤도 → 교신'으로 읽히게 하자는 컨셉을 잡고, 결과를 보며 '로켓은 살리고, 우주 용어엔 한국어 경력 라벨을 붙이자'고 방향을 다듬었습니다.",
    ai: "디자인 스킬이 방향 후보를 제안했고, 고른 방향을 구현했습니다.",
  },
  {
    step: "프롬프트보다 환경 먼저",
    short: "디자인 스킬(impeccable)과 과잉 설계 방지 스킬(ponytail)을 설치해 AI의 기본 습관부터 바꿨습니다.",
    tools: ["Claude Code", "Plugins", "impeccable", "ponytail"],
    me: "Claude Code에 플러그인으로 디자인 스킬(impeccable)과 과잉 설계를 막는 스킬(ponytail)을 설치했습니다. AI가 뻔한 템플릿과 불필요한 코드를 내놓는 기본 습관부터 교정한 것입니다.",
    ai: "스킬이 정한 품질 기준(대비·타이포·모션 규칙)과 '최소 코드' 원칙을 매 작업에 적용했습니다.",
  },
  {
    step: "맥락을 문서로 고정",
    short: "독자·포지셔닝·비공개 정보를 PRODUCT.md에 고정해, 세션이 바뀌어도 같은 기준으로 판단하게 했습니다.",
    tools: ["PRODUCT.md", "이력서 v2", "방향 계약"],
    me: "누가 보는지(채용 담당자·테크 리드), 무엇을 믿게 할지(AI 제품 엔지니어), 무엇을 숨길지(전화번호·주소)를 정해 PRODUCT.md에 고정했습니다. 세션이 바뀌어도 AI가 같은 기준으로 판단합니다.",
    ai: "이력서를 데이터 구조로 옮기고, 디자인 방향을 계약 문서로 남겨 이후 작업이 따르게 했습니다.",
  },
  {
    step: "스택과 인터랙션 결정",
    short: "Next.js 정적 배포 위에 스크롤 연동과 Three.js 3D. 지금 보고 있는 이 행성도 그 결정입니다.",
    tools: ["Next.js 14", "Framer Motion", "Three.js", "GitHub Pages"],
    me: "서버 없이 빠르게 뜨는 정적 사이트(Next.js export + GitHub Pages)로 정하고, 인터랙션은 스크롤 연동과 3D로 가자고 정했습니다. 지금 행성을 도는 이 우주선도 그 결정입니다.",
    ai: "Claude Code가 컴포넌트와 3D 장면을 구현하고, 빌드·배포 파이프라인을 돌렸습니다.",
  },
  {
    step: "결과로 판단하기",
    short: "AI가 찍은 스크린샷과 리뷰를 보고, 무엇을 반영할지는 제가 골랐습니다.",
    tools: ["Playwright", "Review agent", "Git"],
    me: "AI가 찍은 데스크톱·모바일 스크린샷과 리뷰 에이전트의 지적을 보고 무엇을 반영할지 골랐습니다. '페이지가 짧다', '경력이 안 보인다'처럼 결과물 기준으로 다시 시키는 것이 제 역할이었습니다.",
    ai: "Playwright로 화면을 캡처해 겹침·잘림을 찾고, 리뷰 에이전트가 방향 계약 대비 결함을 정리했습니다.",
  },
];

const personal = allProjects.filter((p) => p.company === "Personal Project");
const company = ["NEOWIZ", "Trumpia"].map((c) => ({ company: c, projects: allProjects.filter((p) => p.company === c) }));

/* ------------------------------------------------------------------ */

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ en, ko, light = false }: { en: string; ko: string; light?: boolean }) {
  return (
    <Reveal>
      <h2 className="font-display text-[clamp(3.25rem,9vw,6rem)] font-black uppercase leading-[0.85]">{en}</h2>
      <p className={`mt-3 font-hangul text-2xl md:text-3xl ${light ? "text-white/80" : "text-pad/70"}`}>{ko}</p>
    </Reveal>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative grid h-full overflow-hidden pt-12 lg:grid-cols-[1.35fr_1fr]">
      <div className="relative min-h-[30svh] overflow-hidden border-b-2 border-pad/25 lg:border-b-0 lg:border-r-2">
        <motion.div initial={reduce ? false : { y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE }} className="absolute inset-0">
          <div className="fuselage absolute inset-0 flex justify-center gap-6 px-6 pt-4 md:gap-10 md:pt-8">
            <div className="flex flex-col items-center gap-6">
              <div className="roll-pattern h-10 w-10 border-2 md:h-16 md:w-16 border-pad/25" aria-hidden />
              <h1 className="font-hangul text-[clamp(2.75rem,7.5svh,8rem)] leading-[0.92] text-pad [writing-mode:vertical-rl] md:text-[clamp(7rem,24svh,15rem)]">
                김규현
              </h1>
            </div>
            <div className="hidden flex-col pt-2 text-pad sm:flex">
              <span className="font-stencil text-4xl font-black uppercase tracking-[0.12em] [writing-mode:vertical-rl] md:text-5xl">Kim Kyu-hyun</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative flex flex-col justify-between gap-5 px-5 py-5 md:gap-10 md:px-10 md:py-12">
        <div>
          <p className="font-display text-[clamp(3rem,6.2vw,5.75rem)] font-black uppercase leading-[0.88] tracking-[-0.01em]">
            AI Product
            <br />
            Engineer
          </p>
          <p className="mt-6 max-w-[36ch] text-lg leading-relaxed md:text-xl">
            React·Next.js 프론트엔드 9년 차. 네오위즈 Neopin에서 지갑·DEX·디자인 시스템을 만들었고, 최근엔 AI 네이티브 워크플로우로 제품 5종을 혼자 출시해 3종을 운영하고 있습니다.
          </p>
        </div>

        <dl className="grid grid-cols-3 border-y-2 border-pad/25">
          {[
            ["경력", "8Y 8M"],
            ["Web3", "≈5Y"],
            ["단독 출시", "5"],
          ].map(([k, v], i) => (
            <div key={k} className={`py-2 md:py-3 ${i ? "border-l-2 border-pad/25 pl-3" : ""}`}>
              <dt className="font-hangul text-sm text-pad/65">{k}</dt>
              <dd className="tabular mt-1 font-display text-3xl font-black md:text-4xl">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${personalInfo.email}`} className="group inline-flex items-center gap-3 bg-nasa px-4 py-3 font-display text-lg font-black md:px-5 md:py-4 md:text-xl uppercase tracking-wide text-white transition-colors duration-300 ease-expo hover:bg-pad hover:text-ink">
            <Mail className="h-5 w-5" /> {personalInfo.email}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border-2 border-pad px-4 py-[10px] font-display text-lg font-black md:py-[14px] md:text-xl uppercase tracking-wide transition-colors duration-300 ease-expo hover:bg-pad hover:text-ink">
            <Github className="h-5 w-5" /> GitHub
          </a>
        </div>

        <a href="#briefing" className="inline-flex w-fit items-center gap-2 font-hangul text-sm text-pad/65 hover:text-pad">
          <ArrowDown className="h-4 w-4" /> 스크롤해서 발사하기
        </a>
      </div>
    </section>
  );
}

/* ---------------- Manifesto: words light up with scroll ---------------- */

function Word({ word, i, total, progress }: { word: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = (i / total) * 0.85;
  const opacity = useTransform(progress, [start, start + 0.85 / total], [0.14, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const words = manifesto.split(" ");
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-5 pt-12 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="font-hangul text-xl text-[#ff8a78]">교신 — 소개</h2>
          <p className="mt-6 font-hangul text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.35]">
            {words.map((w, i) => (
              <Word key={i} word={w} i={i} total={words.length} progress={scrollYProgress} />
            ))}
          </p>
          <div className="mt-10 h-[3px] w-full bg-pad/15">
            <motion.div className="h-full bg-nasa" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Briefing: how this page was made (3D orbit) ---------------- */

const planetLabels = buildLog.map((r) => ({ title: r.step, tools: r.tools, short: r.short }));

const FORM = 0.12;

function Briefing() {
  const ref = useRef<HTMLElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // First FORM of the scroll: the planet condenses out of the warp burst; the steps run on the rest.
  const form = useTransform(scrollYProgress, [0, FORM], [0, 1]);
  const steps = useTransform(scrollYProgress, [FORM, 1], [0, 1]);
  const n = buildLog.length;
  const [active, setActive] = useState(0);
  useMotionValueEvent(steps, "change", (v) => setActive(Math.min(n - 1, Math.round(Math.min(1, v / 0.8) * (n - 1)))));
  const chrome = useTransform(steps, [0, 0.03, 0.8, 0.86], [0, 1, 1, 0]);
  const driftL = useTransform(steps, [0, 0.86], ["6%", "-18%"]);
  const driftR = useTransform(steps, [0, 0.86], ["-18%", "6%"]);
  const row = buildLog[active];

  return (
    <section id="briefing" ref={ref} className="relative -mt-[100vh] h-[800vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Giant type sits behind the transparent 3D canvas, so the planet passes in front of it. */}
        <motion.div aria-hidden style={{ opacity: chrome }} className="pointer-events-none absolute inset-0 flex flex-col justify-start gap-2 overflow-hidden pt-[13vh] font-hangul leading-none md:justify-between md:gap-0 md:py-[13vh]">
          <motion.p style={{ x: driftL }} className="whitespace-nowrap text-[clamp(3.5rem,11vw,11rem)] text-pad/90">
            AI는 누가 쓰느냐에 따라
          </motion.p>
          <motion.p style={{ x: driftR }} className="whitespace-nowrap text-[clamp(3.5rem,11vw,11rem)] text-transparent [-webkit-text-stroke:1.5px_rgba(255,138,120,0.9)]">
            다른 결과물을 만듭니다
          </motion.p>
        </motion.div>
        <div className="absolute inset-0 z-10">
          <BriefingPlanet progress={steps} form={form} labels={planetLabels} flash={flash} />
        </div>
        <div
          ref={flash}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,#fff7e6_0%,#ffb347_30%,#d4291a_60%,transparent_85%)] opacity-0"
        />

        <motion.div style={{ opacity: chrome }} className="pointer-events-none relative z-10 flex h-full flex-col justify-between px-5 pb-6 pt-16 md:px-6 md:pb-8">
          <div className="mx-auto flex w-full max-w-7xl items-baseline justify-between">
            <h2 className="font-hangul text-sm text-[#ff8a78] md:text-base">미션 브리핑 — 이 페이지를 만든 방법<span className="sr-only">: AI는 누가 쓰느냐에 따라 다른 결과물을 만듭니다.</span></h2>
            <span className="tabular font-mono text-xs text-pad/60">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>

          <div className="mx-auto w-full max-w-2xl text-center">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <p className="text-[15px] leading-relaxed md:hidden">
                <span className="mr-2 inline-block bg-pad px-1.5 py-0.5 font-hangul text-xs text-ink">내가 한 것</span>
                {row.me}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-pad/70">
                <span className="mr-2 inline-block border border-pad/50 px-1.5 py-0.5 font-hangul text-xs">AI가 한 것</span>
                {row.ai}
              </p>
            </motion.div>
            <div className="mt-4 flex justify-center gap-2">
              {buildLog.map((r, i) => (
                <span key={r.step} className={`h-1.5 w-8 transition-colors duration-500 ${i === active ? "bg-[#ff8a78]" : "bg-pad/20"}`} />
              ))}
            </div>
          </div>
        </motion.div>

        <ol className="sr-only">
          {buildLog.map((r) => (
            <li key={r.step}>
              {r.step}: {r.me} (AI: {r.ai})
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Journey: rocket climbs the career ---------------- */

function Rocket({ stage }: { stage: number }) {
  const drop = (gone: boolean) =>
    `transition-all duration-[900ms] ease-expo ${gone ? "opacity-0 [transform:translate(-60px,40px)_rotate(-40deg)]" : ""}`;
  return (
    <g>
      <g className={drop(stage > 0)}>
        <rect x="-62" y="-8" width="34" height="16" fill="#d4291a" stroke="currentColor" strokeWidth="2" />
        <path d="M -62 -8 L -72 -16 L -56 -8 Z M -62 8 L -72 16 L -56 8 Z" fill="currentColor" />
      </g>
      <g className={drop(stage > 1)}>
        <rect x="-28" y="-7" width="28" height="14" fill="#f2f1ec" stroke="currentColor" strokeWidth="2" />
      </g>
      <path d="M 0 -7 L 18 -7 L 32 0 L 18 7 L 0 7 Z" fill="currentColor" />
    </g>
  );
}

function Journey() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<SVGGElement>(null);
  const [stage, setStage] = useState(0);
  const [marks, setMarks] = useState<{ x: number; y: number }[]>([]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const place = (v: number) => {
    const path = pathRef.current;
    const rocket = rocketRef.current;
    if (!path || !rocket) return;
    const len = path.getTotalLength();
    const at = Math.min(Math.max(v, 0.001), 0.999) * len;
    const a = path.getPointAtLength(at);
    const b = path.getPointAtLength(at + 1);
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    rocket.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${angle})`);
  };

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    setMarks([0, 1 / 3, 2 / 3, 1].map((t) => path.getPointAtLength(t * len)));
    place(scrollYProgress.get());
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    place(v);
    setStage(v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2);
  });

  const s = stages[stage];

  return (
    <section id="journey" ref={ref} className="relative md:h-[420vh]">
      {/* Desktop: one sticky flight, scroll drives the profile */}
      <div className={`sticky top-0 hidden h-screen overflow-hidden pt-12 transition-colors duration-700 ease-expo md:block ${s.theme}`}>
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 px-6 py-10 xl:pr-24">
          <div className="flex min-h-0 flex-col justify-center">
            <p className="mb-6 font-hangul text-lg opacity-70">경력 여정 · {stage + 1} / 3</p>
            <motion.div key={stage} initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <h2 className="font-display text-[clamp(2.75rem,5vw,5.5rem)] font-black uppercase leading-[0.9]">
                {s.name}
                <span className="block text-[0.55em] opacity-80">{s.company}</span>
              </h2>
              <p className="tabular mt-4 font-mono text-xs uppercase opacity-80">
                {s.period} · {s.role}
              </p>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed lg:text-lg">{s.description}</p>
              <ul className="mt-6 grid gap-2.5 text-[15px] leading-snug">
                {s.details.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-[7px] h-2 w-2 flex-none bg-current" aria-hidden />
                    <span className="opacity-90">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="relative flex min-h-0 items-center">
            <svg viewBox="0 0 1000 600" className="h-auto w-full overflow-visible" aria-label="경력 여정 그래프">
              <g opacity="0.25" stroke="currentColor" strokeWidth="1">
                {[100, 200, 300, 400, 500].map((y) => (
                  <line key={y} x1="40" x2="960" y1={y} y2={y} strokeDasharray="2 6" />
                ))}
              </g>
              <path d={PROFILE} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
              <motion.path ref={pathRef} d={PROFILE} fill="none" stroke="currentColor" strokeWidth="4" style={{ pathLength: scrollYProgress }} />
              {marks.map((m, i) => (
                <g key={i} transform={`translate(${m.x} ${m.y})`}>
                  <circle r="7" fill="currentColor" />
                  <text x={i === 3 ? -14 : 14} y={i === 0 || i === 3 ? 48 : -22} textAnchor={i === 3 ? "end" : "start"} fill="currentColor" className="font-hangul text-[22px]">
                    {i < 3 ? stages[i].event : "현재"}
                  </text>
                </g>
              ))}
              <g ref={rocketRef}>
                <g transform="scale(2)">
                  <Rocket stage={stage} />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile: the same flight, stacked */}
      <div className="md:hidden">
        {stages.map((st) => (
          <article key={st.company} className={`px-5 py-14 ${st.theme}`}>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.9]">
              {st.name}
              <span className="block text-3xl opacity-80">{st.company}</span>
            </h2>
            <p className="tabular mt-3 font-mono text-xs uppercase opacity-80">
              {st.event} · {st.period} · {st.role}
            </p>
            <p className="mt-4 leading-relaxed">{st.description}</p>
            <ul className="mt-5 grid gap-2.5 text-[15px] leading-snug">
              {st.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span className="mt-[7px] h-2 w-2 flex-none bg-current" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}


/* ---------------- Impact: metrics orbit a planet ---------------- */

function OrbitItem({ m, i, n, progress, active }: { m: (typeof impacts)[number]; i: number; n: number; progress: MotionValue<number>; active: boolean }) {
  // Item i reaches the front (bottom of the ellipse) at progress (i + 0.5) / n.
  const angle = useTransform(progress, (v) => ((90 + (i / n) * 360 - ((v * n - 0.5) / n) * 360) * Math.PI) / 180);
  const left = useTransform(angle, (a) => `${50 + Math.cos(a) * 46}%`);
  const top = useTransform(angle, (a) => `${50 + Math.sin(a) * 17}%`);
  const depth = useTransform(angle, (a) => (Math.sin(a) + 1) / 2);
  const scale = useTransform(depth, [0, 1], [0.55, 1.05]);
  const opacity = useTransform(depth, [0, 1], [0.35, 1]);
  const zIndex = useTransform(depth, (d) => (d > 0.5 ? 3 : 1));
  return (
    <motion.div style={{ left, top, opacity, zIndex }} className="absolute">
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ scale }}
          className={`grid h-[68px] w-[68px] place-items-center rounded-full border-2 text-center transition-colors duration-500 md:h-[104px] md:w-[104px] ${active ? "border-[#ff8a78] bg-nasa" : "border-pad/40 bg-[#0b0f24]"}`}
        >
          <span className="tabular px-1.5 font-display text-[15px] font-black leading-none md:text-[22px]">{m.value}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Impact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = impacts.length;
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n)))));
  const m = impacts[active];

  return (
    <section id="impact" ref={ref} className="relative h-[460vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-12">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 md:grid-cols-[1fr_1.15fr] md:gap-10 md:px-6">
          <div>
            <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-black uppercase leading-[0.85]">Impact</h2>
            <p className="mt-3 font-hangul text-xl text-white/80 md:text-3xl">행성 궤도 — 숫자로 남은 성과</p>
            <motion.div key={active} initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: EASE }} className="mt-6 md:mt-12">
              <p className="tabular whitespace-nowrap font-display text-[clamp(3.5rem,9vw,8rem)] font-black leading-[0.85] text-[#ff8a78]">{m.value}</p>
              <p className="mt-3 font-hangul text-2xl md:text-3xl">{m.label}</p>
              <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-white/80 md:text-lg">{m.note}</p>
            </motion.div>
            <div className="mt-6 flex gap-2 md:mt-10">
              {impacts.map((it, i) => (
                <span key={it.label} className={`h-1.5 w-8 transition-colors duration-500 ${i === active ? "bg-[#ff8a78]" : "bg-pad/20"}`} />
              ))}
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[300px] md:max-w-[600px]">
            <div aria-hidden className="absolute inset-x-[4%] top-1/2 h-[34%] -translate-y-1/2 rounded-[50%] border border-dashed border-pad/30" />
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-[2] h-[44%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#6f86ea_0%,#1d3fbf_42%,#0a1240_78%)] shadow-[0_0_80px_rgba(29,63,191,0.45)]"
            />
            {impacts.map((it, i) => (
              <OrbitItem key={it.label} m={it} i={i} n={n} progress={scrollYProgress} active={i === active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Career: sticky company, scrolling cases ---------------- */

function CareerBlock({ c, index }: { c: (typeof careers)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="grid gap-10 border-t-2 border-pad/25 py-16 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:py-24">
      <div className="md:sticky md:top-24 md:self-start">
        <p className="tabular font-mono text-sm">{c.period}</p>
        <h3 className="mt-3 font-hangul text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05]">{c.company}</h3>
        <p className="mt-4 inline-block bg-nasa px-3 py-1 font-hangul text-base text-white">{c.role}</p>
        <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-pad/85">{c.summary}</p>
        <div className="mt-8 hidden items-center gap-3 md:flex">
          <span className="tabular font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
          <div className="h-[3px] flex-1 bg-pad/15">
            <motion.div className="h-full bg-nasa" style={{ width: fill }} />
          </div>
          <span className="tabular font-mono text-xs">{c.cases.length} cases</span>
        </div>
      </div>

      <ol className="grid gap-6">
        {c.cases.map((k, i) => (
          <Reveal key={k.title}>
            <li className="border border-pad/20 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 ease-expo hover:border-pad/50 hover:bg-white/[0.08] md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h4 className="font-hangul text-2xl leading-snug md:text-[1.75rem]">{k.title}</h4>
                <span className="tabular font-mono text-xs text-pad/65">{k.period ?? String(i + 1).padStart(2, "0")}</span>
              </div>
              <dl className="mt-6 grid gap-x-6 gap-y-3 text-[15px] leading-relaxed md:grid-cols-[104px_1fr]">
                {k.background && (
                  <>
                    <dt className="font-display text-sm font-black uppercase tracking-[0.12em] text-pad/65">Background</dt>
                    <dd>{k.background}</dd>
                  </>
                )}
                <dt className="font-display text-sm font-black uppercase tracking-[0.12em] text-pad/65">Action</dt>
                <dd>{k.action}</dd>
                <dt className="font-display text-sm font-black uppercase tracking-[0.12em] text-[#ff8a78]">Impact</dt>
                <dd className="font-semibold">{k.impact}</dd>
              </dl>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

function Career() {
  return (
    <section id="career" className="px-5 pt-24 md:px-6 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6 pb-12">
          <SectionTitle en="Mission log" ko="관제 기록 — 경력 사항" />
          <Reveal>
            <p className="font-hangul text-xl text-pad/65">{careerTotal}</p>
          </Reveal>
        </div>
        {careers.map((c, i) => (
          <CareerBlock key={c.company} c={c} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- AI workflow: stacking cards ---------------- */

function StackCard({ item, i, total, progress }: { item: (typeof aiStack)[number]; i: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const scale = useTransform(progress, [i / total, 1], [1, reduce ? 1 : 1 - (total - i) * 0.035]);
  return (
    <div className="sticky h-[72vh] md:h-[66vh]" style={{ top: `calc(5rem + ${i * 28}px)` }}>
      <motion.article style={{ scale }} className={`flex h-full origin-top flex-col gap-10 border-2 border-pad/25 p-6 md:p-12 ${aiColors[i]}`}>
        <div className="flex items-start justify-between gap-6">
          <span className="tabular font-mono text-sm opacity-80">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-right font-display text-sm font-black uppercase tracking-[0.15em] opacity-80">{item.tool}</span>
        </div>
        <div>
          <h3 className="font-hangul text-[clamp(2.25rem,6vw,5rem)] leading-[1.05]">{item.title}</h3>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed md:text-xl">{item.body}</p>
        </div>
      </motion.article>
    </div>
  );
}

function AiWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="ai" className="px-5 pb-32 pt-24 md:px-6 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle en="Propulsion" ko="추진 시스템 — AI 네이티브 개발 워크플로우" />
        <div ref={ref} className="relative mt-16 grid gap-10">
          {aiStack.map((item, i) => (
            <StackCard key={item.title} item={item} i={i} total={aiStack.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Personal projects: parallax rows ---------------- */

function ProjectRow({ p, i }: { p: (typeof personal)[number]; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-8, 8]);
  const live = TRANSMITTING.includes(p.slug);
  const flip = i % 2 === 1;

  return (
    <article ref={ref} className="grid items-center gap-10 border-t border-white/25 py-16 md:grid-cols-2 md:gap-16 md:py-24">
      <motion.div style={{ y, rotate }} className={`mx-auto w-56 md:w-80 ${flip ? "md:order-2" : ""}`}>
        <div className="relative">
          <div aria-hidden className="satellite-orbit absolute -inset-8 rounded-full border border-dashed border-pad/30">
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#ff8a78]" />
          </div>
          <Patch project={p} index={i} className="relative h-auto w-full" />
        </div>
      </motion.div>
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <span className="tabular font-mono text-sm text-white/70">{p.period}</span>
          {live && <span className="bg-nasa px-2 py-0.5 font-hangul text-sm">교신 중 · 운영 중</span>}
        </div>
        <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[0.9]">{patchName(p.title)}</h3>
        <p className="mt-2 font-display text-lg font-black uppercase tracking-[0.1em] text-white/60">{p.type}</p>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-white/90">{p.description}</p>
        <ul className="mt-6 grid gap-2.5 text-[15px] leading-relaxed text-white/80">
          {p.details.slice(0, 3).map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-[9px] h-2 w-2 flex-none bg-nasa" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-xs uppercase text-white/60">{p.tech.join(" · ")}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-2 bg-pad px-4 py-3 font-hangul text-lg text-ink transition-colors duration-300 ease-expo hover:bg-nasa hover:text-white">
            자세히 보기 <ArrowUpRight className="h-4 w-4" />
          </Link>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-pad px-4 py-[10px] font-display text-lg font-black uppercase tracking-wide transition-colors duration-300 ease-expo hover:bg-pad hover:text-ink">
              {p.url.replace(/^https?:\/\/(www\.)?/, "")} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="px-5 pt-24 text-white md:px-6 md:pt-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle en="Satellites" ko="위성 — 개인 프로젝트, 기획부터 배포까지 단독 수행" light />
        <div className="mt-12">
          {personal.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyProjects() {
  return (
    <section className="px-5 pb-24 pt-16 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionTitle en="Expeditions" ko="탐사 기록 — 회사 프로젝트" light />
        <div className="mt-14 grid gap-14">
          {company.map(({ company: name, projects }) => (
            <div key={name}>
              <h3 className="border-b-2 border-white pb-3 font-display text-3xl font-black uppercase">{name}</h3>
              <ul>
                {projects.map((p, i) => (
                  <motion.li key={p.slug} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}>
                    <Link href={`/projects/${p.slug}`} className="group grid gap-2 border-b border-white/20 py-5 transition-colors duration-300 ease-expo hover:bg-white hover:text-ink md:grid-cols-[1.1fr_1.6fr_auto] md:items-baseline md:gap-8 md:px-3">
                      <span className="font-display text-2xl font-black uppercase leading-none">{p.title}</span>
                      <span className="text-[15px] leading-relaxed text-white/70 group-hover:text-ink/80">{p.shortDesc}</span>
                      <span className="tabular inline-flex items-center gap-2 font-mono text-xs uppercase text-white/60 group-hover:text-ink">
                        {p.period}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Leadership: clip reveal ---------------- */

function Leadership() {
  const reduce = useReducedMotion();
  return (
    <section className="px-5 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle en="Crew" ko="승무원 — 리더십 & 협업" />
        <div className="mt-14 grid gap-px border border-pad/25 bg-pad/25 md:grid-cols-2">
          {leadershipNotes.map((n, i) => (
            <motion.div
              key={n.title}
              initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.12 }}
              className="bg-[#0b0f24] p-6 md:p-10"
            >
              <h3 className="font-hangul text-3xl">{n.title}</h3>
              <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed">{n.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Skills: scroll-driven marquee ---------------- */

function SkillRow({ group, i, progress }: { group: (typeof skills)[number]; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const right = i % 2 === 1;
  const x = useTransform(progress, [0, 1], reduce ? ["0%", "0%"] : right ? ["-30%", "0%"] : ["0%", "-30%"]);
  const items = [...group.items, ...group.items, ...group.items];
  return (
    <div className="overflow-hidden border-b-2 border-pad/25 py-5">
      <motion.div style={{ x }} className="flex w-max items-center gap-6 whitespace-nowrap">
        <span className="bg-pad px-3 py-1 font-display text-xl font-black uppercase tracking-wide text-ink">{group.category}</span>
        {items.map((it, k) => (
          <span key={k} className="flex items-center gap-6 font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-none">
            {it}
            <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-[#ff8a78]" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <section id="skills" ref={ref} className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionTitle en="Constellation" ko="성좌 — 핵심 보유 역량" />
      </div>
      <div className="mt-14 border-t-2 border-pad/25">
        {skills.map((g, i) => (
          <SkillRow key={g.category} group={g} i={i} progress={scrollYProgress} />
        ))}
      </div>
      <div className="mx-auto mt-20 grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_2fr] md:px-6">
        <Reveal>
          <h3 className="font-display text-4xl font-black uppercase">Education</h3>
          <p className="mt-2 font-hangul text-xl text-pad/65">학력 · 교육 · 외국어</p>
        </Reveal>
        <ul className="border-t-2 border-pad/25">
          {education.map((e) => (
            <li key={e.title} className="flex flex-wrap items-baseline justify-between gap-3 border-b border-pad/25/25 py-5">
              <span className="font-hangul text-xl">{e.title}</span>
              <span className="tabular font-mono text-sm text-pad/65">{e.period}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Landing: ship spirals down to the contact planet ---------------- */

function Landing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineA = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);
  const lineB = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const lineC = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <OrbitScene progress={scrollYProgress} variant="descent" />
        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end gap-3 px-5 pb-16 font-hangul md:px-6">
          <motion.p style={{ opacity: lineA }} className="text-xl text-pad/80 md:text-3xl">경력 여정, 성과, 프로젝트까지 — 탐사를 마쳤습니다.</motion.p>
          <motion.p style={{ opacity: lineB }} className="text-xl text-pad/80 md:text-3xl">이제 귀환 궤도로 진입합니다.</motion.p>
          <motion.p style={{ opacity: lineC }} className="text-3xl text-[#ff8a78] md:text-5xl">교신 채널을 엽니다.</motion.p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.6, 1]);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden px-5 pb-28 pt-24 text-white md:px-6 md:pb-40 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[82%] -translate-x-1/2 md:top-[76%]">
        <motion.div
          style={{ scale }}
          className="h-[140vw] w-[140vw] origin-top rounded-full bg-[radial-gradient(circle_at_50%_0%,#e8453a_0%,#a3200f_18%,#3a0a06_40%,#05060a_62%)]"
        />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(3.5rem,10vw,6rem)] font-black uppercase leading-[0.85]">Open channel</h2>
        <p className="mt-3 font-hangul text-2xl text-white/80 md:text-3xl">교신 채널 — 연락</p>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed">
          프로덕션 수준의 프론트엔드를 책임지면서 AI 워크플로우를 팀에 정착시킬 사람을 찾고 있다면, 메일 한 통이면 됩니다.
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="group mt-12 flex w-fit max-w-full origin-left items-center gap-4 break-all font-stencil text-[clamp(2.25rem,7vw,5.5rem)] font-black leading-none decoration-4 underline-offset-8 hover:underline"
        >
          {personalInfo.email}
          <ArrowUpRight className="h-[0.8em] w-[0.8em] flex-none transition-transform duration-300 ease-expo group-hover:-translate-y-2 group-hover:translate-x-2" />
        </a>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-white/60 pt-6 font-display text-sm font-black uppercase tracking-[0.15em]">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
            <Github className="h-4 w-4" /> github.com/kimk1029
          </a>
          <span>© 2026 Kim Kyu-hyun</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  return (
    <main className="text-pad">
      <header className="fixed inset-x-0 top-0 z-50 bg-vacuum/70 text-pad backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 md:px-6">
          <a href="#top" className="font-stencil text-xl font-black uppercase tracking-[0.08em]">
            KKH<span className="text-nasa">.</span>
          </a>
          <nav className="hidden gap-1 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="px-3 py-1.5 font-hangul text-[15px] transition-colors duration-200 hover:bg-pad hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${personalInfo.email}`} className="bg-nasa px-3 py-1.5 font-display text-base font-black uppercase tracking-wide md:hidden">
            Mail
          </a>
        </div>
        <motion.div className="h-[3px] origin-left bg-nasa" style={{ scaleX: scrollYProgress }} />
      </header>
      <Warp>
        <Hero />
      </Warp>
      <Briefing />
      <Journey />
      <Manifesto />
      <Impact />
      <Career />
      <AiWorkflow />
      <Projects />
      <CompanyProjects />
      <Leadership />
      <Skills />
      <Landing />
      <Contact />
    </main>
  );
}
