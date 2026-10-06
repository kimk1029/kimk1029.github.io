"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Mail } from "lucide-react";
import { allProjects, experience, personalInfo, skills } from "./data";
import { Patch, TRANSMITTING, patchName } from "./Patch";

const navItems = [
  ["Ascent", "#ascent"],
  ["Orbit", "#orbit"],
  ["Archive", "#archive"],
  ["Systems", "#systems"],
  ["Contact", "#contact"],
];

// Oldest first: the career reads bottom-up like a launch.
const stages = [...experience].reverse().map((exp, i) => ({
  ...exp,
  name: ["Stage 1 · Booster", "Stage 2", "Payload"][i],
  event: ["Liftoff 2016", "Stage sep 2020", "Payload deploy 2025"][i],
  theme: [
    "bg-sky text-ink",
    "bg-flight text-white",
    "bg-vacuum text-white",
  ][i],
}));

const personal = allProjects.filter((p) => p.company === "Personal Project");
const transmitting = personal.filter((p) => TRANSMITTING.includes(p.slug));
const launched = personal.filter((p) => !TRANSMITTING.includes(p.slug));
const archive = ["NEOWIZ", "Trumpia"].map((company) => ({
  company,
  projects: allProjects.filter((p) => p.company === company),
}));

const PROFILE = "M 40 560 C 300 552, 500 430, 620 280 S 860 70, 960 52";

/* ------------------------------------------------------------------ */

function Hud() {
  const { scrollYProgress } = useScroll();
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setP);
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const alt = Math.round(p * 408);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 bg-ink/85 p-2.5 font-mono text-[11px] uppercase text-pad min-[1500px]:block">
      <div className="tabular">ALT {String(alt).padStart(3, "0")} KM</div>
      <div className="relative ml-auto mt-3 h-56 w-px bg-white/40">
        <motion.div className="absolute bottom-0 left-[-3px] w-[7px] bg-white" style={{ height: fill }} />
      </div>
      <div className="tabular mt-3">T+{(2016 + p * 10).toFixed(1)}</div>
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -420]);
  const flame = useTransform(scrollY, [0, 300], [0, reduce ? 0 : 1]);

  return (
    <section id="top" className="relative grid min-h-[100svh] overflow-hidden bg-pad pt-12 lg:grid-cols-[1.35fr_1fr]">
      <div className="relative min-h-[62svh] overflow-hidden border-b-2 border-ink lg:border-b-0 lg:border-r-2">
        <motion.div
          initial={reduce ? false : { y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <motion.div style={{ y: lift }} className="fuselage absolute inset-x-0 top-0 bottom-[-420px] flex justify-center gap-6 px-6 pt-8 md:gap-10">
            <div className="flex flex-col items-center gap-6">
              <div className="roll-pattern h-16 w-16 border-2 border-ink" aria-hidden />
              <h1 className="font-hangul leading-[0.92] text-pad [writing-mode:vertical-rl] text-[clamp(4.5rem,13svh,8rem)] md:text-[clamp(7rem,24svh,15rem)]">
                김규현
              </h1>
            </div>
            <div className="hidden flex-col justify-between pb-[440px] pt-2 text-pad sm:flex">
              <span className="font-stencil text-4xl font-black uppercase tracking-[0.12em] [writing-mode:vertical-rl] md:text-5xl">
                Kim Kyu-hyun
              </span>
              <span className="font-mono text-xs [writing-mode:vertical-rl]">KKH-1 · SEOUL KR</span>
            </div>
          </motion.div>
          <motion.div
            aria-hidden
            style={{ opacity: flame, scaleY: flame }}
            className="absolute inset-x-[20%] bottom-0 h-40 origin-bottom bg-[radial-gradient(ellipse_at_bottom,#f2f1ec_0%,#f7b42c_35%,transparent_70%)]"
          />
        </motion.div>
      </div>

      <div className="relative flex flex-col justify-between gap-10 px-5 py-8 md:px-10 md:py-12">
        <div>
          <p className="font-display text-[clamp(3rem,6.2vw,5.75rem)] font-black uppercase leading-[0.88] tracking-[-0.01em]">
            AI Product
            <br />
            Engineer
          </p>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink md:text-xl">
            React·Next.js 9년 차. AI 네이티브 워크플로우로 제품 6종을 만들어 5종을 출시했고, 그중 3종을 직접 운영하고 있습니다.
          </p>
        </div>

        <dl className="grid grid-cols-3 border-y-2 border-ink font-mono text-xs uppercase">
          {[
            ["Launched", "6"],
            ["In orbit", "5"],
            ["Transmitting", "3"],
          ].map(([k, v], i) => (
            <div key={k} className={`py-3 ${i ? "border-l-2 border-ink pl-3" : ""}`}>
              <dt className="text-steel">{k}</dt>
              <dd className="tabular mt-1 font-display text-4xl font-black text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group inline-flex items-center gap-3 bg-ink px-5 py-4 font-display text-xl font-black uppercase tracking-wide text-pad transition-colors duration-300 ease-expo hover:bg-nasa"
          >
            <Mail className="h-5 w-5" /> {personalInfo.email}
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-ink px-4 py-[14px] font-display text-xl font-black uppercase tracking-wide transition-colors duration-300 ease-expo hover:bg-ink hover:text-pad"
          >
            <Github className="h-5 w-5" /> GitHub
          </a>
        </div>

        <a href="#ascent" className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase text-steel hover:text-ink">
          <ArrowDown className="h-4 w-4" /> Scroll to ascend
        </a>
      </div>
    </section>
  );
}

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

function Ascent() {
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
    <section id="ascent" ref={ref} className="relative md:h-[420vh]">
      {/* Desktop: one sticky flight, scroll drives the profile */}
      <div className={`sticky top-0 hidden h-screen overflow-hidden pt-12 transition-colors duration-700 ease-expo md:block ${s.theme}`}>
        <div className="mx-auto grid h-full max-w-7xl grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 px-6 py-10 xl:pr-24">
          <div className="flex min-h-0 flex-col justify-center">
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
            <svg viewBox="0 0 1000 600" className="h-auto w-full overflow-visible" aria-label="경력 고도 프로파일">
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
                  <text x={i === 3 ? -14 : 14} y={i === 0 || i === 3 ? 34 : -14} textAnchor={i === 3 ? "end" : "start"} fill="currentColor" className="font-mono text-[18px] uppercase">
                    {i < 3 ? stages[i].event : "Orbit"}
                  </text>
                </g>
              ))}
              <g ref={rocketRef}>
                <Rocket stage={stage} />
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

function Orbit() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spin = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const counter = useTransform(spin, (v) => -v * 1.4);
  const rise = useTransform(scrollYProgress, [0, 0.5], ["30%", "0%"]);

  return (
    <section id="orbit" ref={ref} className="relative overflow-hidden bg-vacuum px-5 pb-24 pt-24 text-white md:px-6 md:pt-32">
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: rise }}
        className="pointer-events-none absolute -bottom-[118vw] left-1/2 h-[140vw] w-[140vw] -translate-x-1/2 rounded-full bg-flight shadow-[0_-30px_120px_rgba(29,63,191,0.55)] md:-bottom-[124vw]"
      />
      <div className="relative mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(3.5rem,9vw,6rem)] font-black uppercase leading-[0.85]">In orbit</h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-white/80">
          혼자 기획하고 만들어 띄운 제품들. 가장 큰 패치 셋은 지금도 운영하며 신호를 보내고 있습니다.
        </p>

        <div className="orbit relative mt-16">
          <svg aria-hidden viewBox="0 0 1200 260" className="pointer-events-none absolute inset-x-0 top-[90px] hidden w-full md:block" preserveAspectRatio="none">
            <ellipse cx="600" cy="130" rx="590" ry="110" fill="none" stroke="white" strokeOpacity="0.3" strokeDasharray="3 9" />
          </svg>

          <div className="relative grid gap-12 md:grid-cols-3">
            {transmitting.map((p, i) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex flex-col items-center text-center transition-[opacity,filter] duration-500 ease-expo">
                <div className="relative h-56 w-56 lg:h-64 lg:w-64">
                  <span aria-hidden className="transmit-ring absolute inset-0 rounded-full border-2 border-nasa" />
                  <motion.div style={reduce ? undefined : { rotate: i % 2 ? counter : spin }} className="h-full w-full transition-transform duration-500 ease-expo group-hover:scale-105">
                    <Patch project={p} index={i} className="h-full w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]" />
                  </motion.div>
                </div>
                <h3 className="mt-6 font-display text-3xl font-black uppercase">{patchName(p.title)}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase">
                  <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-[#ff6a55] align-middle motion-reduce:animate-none" />
                  <span className="text-[#ff8a78]">Transmitting</span> · {p.period}
                </p>
                <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-white/75">{p.shortDesc}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-mono text-xs uppercase text-white underline decoration-white/30 group-hover:decoration-white">
                  Mission file <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>

          <div className="relative mt-24 grid grid-cols-2 gap-10 md:grid-cols-4">
            {launched.map((p, i) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group flex flex-col items-center text-center transition-[opacity,filter] duration-500 ease-expo">
                <motion.div style={reduce ? undefined : { rotate: i % 2 ? spin : counter }} className="h-28 w-28 md:h-32 md:w-32">
                  <Patch project={p} index={i + 3} className="h-full w-full" />
                </motion.div>
                <h3 className="mt-4 font-display text-xl font-black uppercase">{patchName(p.title)}</h3>
                <p className="tabular mt-1 font-mono text-[11px] uppercase text-white/60">{p.period}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  return (
    <section id="archive" className="bg-vacuum px-5 py-24 text-white md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.85]">Mission archive</h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-white/75">
          네오위즈 Neopin과 Trumpia에서 맡았던 프로젝트 기록. 지갑, DEX, 디자인 시스템, 데이터 시각화.
        </p>
        <div className="mt-14 grid gap-14">
          {archive.map(({ company, projects }) => (
            <div key={company}>
              <h3 className="border-b-2 border-white pb-3 font-display text-3xl font-black uppercase">{company}</h3>
              <ul>
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group grid gap-2 border-b border-white/20 py-5 transition-colors duration-300 ease-expo hover:bg-white hover:text-ink md:grid-cols-[1.1fr_1.6fr_auto] md:items-baseline md:gap-8 md:px-3"
                    >
                      <span className="font-display text-2xl font-black uppercase leading-none">{p.title}</span>
                      <span className="text-[15px] leading-relaxed text-white/70 group-hover:text-ink/80">{p.shortDesc}</span>
                      <span className="tabular inline-flex items-center gap-2 font-mono text-xs uppercase text-white/60 group-hover:text-ink">
                        {p.period}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Systems() {
  return (
    <section id="systems" className="bg-pad px-5 py-24 md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.85]">Flight systems</h2>
        <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-steel">
          발사마다 실제로 점검표에 올랐던 스택.
        </p>
        <div className="mt-14 grid gap-[2px] border-2 border-ink bg-ink md:grid-cols-2 lg:grid-cols-5">
          {skills.map((group) => (
            <div key={group.category} className="bg-pad p-5 md:last:col-span-2 lg:last:col-span-1">
              <h3 className="font-display text-xl font-black uppercase leading-tight">{group.category}</h3>
              <ul className="mt-5 grid gap-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[15px]">
                    <span aria-hidden className="grid h-3.5 w-3.5 flex-none place-items-center border-2 border-ink">
                      <span className="h-1.5 w-1.5 bg-nasa" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="fuselage px-5 py-24 text-white md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(3.5rem,10vw,6rem)] font-black uppercase leading-[0.85]">Open channel</h2>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed">
          프로덕션 수준의 프론트엔드와 AI 워크플로우를 함께 다룰 팀을 찾고 있다면, 메일 한 통이면 됩니다.
        </p>
        <a
          href={`mailto:${personalInfo.email}`}
          className="group mt-12 flex w-fit max-w-full items-center gap-4 break-all font-stencil text-[clamp(2.25rem,7vw,5.5rem)] font-black leading-none decoration-4 underline-offset-8 hover:underline"
        >
          {personalInfo.email}
          <ArrowUpRight className="h-[0.8em] w-[0.8em] flex-none transition-transform duration-300 ease-expo group-hover:-translate-y-2 group-hover:translate-x-2" />
        </a>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-2 border-white/60 pt-6 font-mono text-xs uppercase">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline">
            <Github className="h-4 w-4" /> github.com/kimk1029
          </a>
          <span>© 2026 Kim Kyu-hyun · KKH-1</span>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <main className="bg-pad text-ink">
      <header className="fixed inset-x-0 top-0 z-50 bg-ink text-pad">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-4 px-5 md:px-6">
          <a href="#top" className="font-stencil text-xl font-black uppercase tracking-[0.08em]">
            KKH<span className="text-nasa">-1</span>
          </a>
          <nav className="hidden gap-1 md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1.5 font-display text-base font-black uppercase tracking-wide transition-colors duration-200 hover:bg-pad hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
          <a href={`mailto:${personalInfo.email}`} className="bg-nasa px-3 py-1.5 font-display text-base font-black uppercase tracking-wide md:hidden">
            Mail
          </a>
        </div>
      </header>
      <Hud />
      <Hero />
      <Ascent />
      <Orbit />
      <Archive />
      <Systems />
      <Contact />
    </main>
  );
}
