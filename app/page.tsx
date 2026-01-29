"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Github, Mail, ArrowRight, Phone, Send, Calendar, Briefcase, MapPin
} from "lucide-react";
import { personalInfo, skills, allProjects, experience } from "./data";

// --- Components ---

const SectionHeading = ({ children, num }: { children: React.ReactNode, num: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-baseline gap-4 mb-16 border-b border-white/20 pb-4"
  >
    <span className="font-mono text-blue-500 text-xl">0{num}.</span>
    <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
      {children}
    </h2>
  </motion.div>
);

const ProjectCard = ({ project }: { project: any }) => {
  const isPersonal = project.company === "Personal Project";
  const labelStyles = isPersonal
    ? "bg-pink-600 text-white border-pink-700 shadow-[0_0_15px_rgba(219,39,119,0.4)]"
    : "bg-blue-600 text-white border-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.4)]";

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -10 }}
        className={`h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 flex flex-col group transition-all duration-300 rounded-none ${isPersonal ? "group-hover:border-pink-500/50" : "group-hover:border-blue-500/50"}`}
      >
        <div className="relative h-60 overflow-hidden border-b border-slate-800">
          {/* Placeholder for visual consistency */}
          <div className={`absolute inset-0 bg-gradient-to-t ${isPersonal ? "from-pink-950/80" : "from-blue-950/80"} to-transparent z-10`} />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700"
          />
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className={`font-mono text-[10px] font-bold border px-2 py-1 tracking-wider uppercase backdrop-blur-md ${labelStyles}`}>
              {isPersonal ? "PERSONAL" : "COMPANY"}
            </span>
            <span className="font-mono text-[10px] font-bold border border-white/20 bg-black/50 text-slate-300 px-2 py-1 tracking-wider uppercase backdrop-blur-md">
              {project.type}
            </span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className={`text-xl font-bold text-white mb-2 transition-colors ${isPersonal ? "group-hover:text-pink-400" : "group-hover:text-blue-400"}`}>{project.title}</h3>
          <p className="text-xs text-slate-500 font-mono mb-4">{project.company}</p>
          <p className="text-slate-400 text-sm line-clamp-3 mb-6">{project.shortDesc}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.slice(0, 3).map((t: any, i: number) => (
              <span key={i} className="text-[10px] border border-slate-700 px-1 py-0.5 text-slate-500 bg-black">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// --- Main Portfolio Component ---

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 전체 스크롤 진행도 (0 ~ 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 어지러움 방지를 위해 damping(감쇠)을 높여 부드럽게 설정
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  /**
   * ✈️ FLIGHT PATH CHOREOGRAPHY
   * * [Section 1: Hero] 0.0 ~ 0.20
   * - Action: Start Top-Right -> Swoop to Center
   * * [Section 2: Career History] 0.20 ~ 0.45
   * - Target: "Current Focus" Card (Left side, Top)
   * - Action: Move to approx 15vw, 35vh and hover to point at the card.
   * * [Section 3: About - Texts] 0.45 ~ 0.60
   * - Target: 3 Summary Lines
   * - Action: Zigzag reading (Left -> Right -> Left)
   * * [Section 3: About - Stats] 0.60 ~ 0.75
   * - Target: Numbers "8+" (Left) and "13+" (Right)
   * - Action: Figure-8 loop
   * * [Section 4: Projects] 0.75 ~ 1.0
   * - Action: Center X, Point Down (180deg), Follow scroll down, Loop up at end.
   */

  // X Coordinates (vw)
  const planeX = useTransform(smoothScroll,
    // Scroll Progress Points
    [0, 0.2, 0.3, 0.45, 0.50, 0.55, 0.65, 0.70, 0.80, 0.90, 1.0],
    // VW Positions
    ["85vw", "50vw", "15vw", "15vw", "80vw", "20vw", "30vw", "70vw", "50vw", "50vw", "50vw"]
    // Start -> Center -> [CAREER: Pointing at Current] -> [ABOUT: Text R -> Text L] -> [STATS: 8+ -> 13+] -> [PROJECTS: Center]
  );

  // Y Coordinates (vh - relative to viewport)
  const planeY = useTransform(smoothScroll,
    [0, 0.2, 0.3, 0.45, 0.50, 0.55, 0.65, 0.70, 0.80, 0.95, 1.0],
    ["10vh", "60vh", "35vh", "35vh", "45vh", "55vh", "75vh", "75vh", "20vh", "90vh", "80vh"]
    // Start -> Down -> [CAREER: Hold at Card] -> [ABOUT: Line 1 -> Line 3] -> [STATS: Bottom] -> [PROJECTS: Top -> Bottom -> Loop Up]
  );

  // Rotation (Degrees)
  const planeRotate = useTransform(smoothScroll,
    [0, 0.15, 0.2, 0.25, 0.45, 0.50, 0.55, 0.65, 0.75, 0.80, 0.95, 1.0],
    [0, 45, 135, 0, 10, 160, 20, -20, 20, 180, 180, 0]
    // Banks into turns. At 0.80 (Projects start), rotates 180deg to point DOWN.
  );

  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="bg-black text-slate-300 selection:bg-blue-500/30 overflow-x-hidden perspective-1000 relative">

      {/* ✈️ Paper Plane (Pilot) */}
      <motion.div
        style={{ left: planeX, top: planeY, rotate: planeRotate }}
        className="fixed z-50 pointer-events-none drop-shadow-[0_0_20px_rgba(59,130,246,1)] origin-center w-12 h-12 flex items-center justify-center"
      >
        <Send size={48} className="text-cyan-400 fill-cyan-400/20" strokeWidth={1.5} />
        {/* Engine Trail */}
        <div className="absolute -top-2 -left-2 w-16 h-16 bg-blue-500/20 rounded-full blur-xl -z-10 animate-pulse" />
      </motion.div>

      {/* --- Background --- */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black" />
      <motion.div style={{ y: starsY }} className="fixed inset-0 z-1 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </motion.div>

      <div className="relative z-10">

        {/* =========================================================================
            SECTION 1: HERO (Profile)
            Height: min-h-screen (Full Screen)
           ========================================================================= */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 border-x border-white/5 relative snap-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl w-full relative z-10"
          >
            <div className="flex items-center gap-4 text-blue-500 font-mono text-sm tracking-widest uppercase mb-6">
              <span className="w-12 h-[2px] bg-blue-500 inline-block shadow-[0_0_10px_#3b82f6]" />
              Identify
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              KYU-HYUN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500">
                KIM
              </span>
            </h1>

            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 p-8 max-w-2xl w-full hover:border-blue-500/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shrink-0">
                  K
                </div>
                <div className="space-y-4 flex-grow">
                  <h2 className="text-2xl font-bold text-white">{personalInfo.title}</h2>
                  <p className="text-slate-400 font-light">{personalInfo.subtitle}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <Phone className="text-blue-500 w-4 h-4" />
                      <span className="text-sm font-mono text-slate-300">{personalInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-500 w-4 h-4" />
                      <a href={`mailto:${personalInfo.email}`} className="text-sm font-mono text-slate-300 hover:text-white transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =========================================================================
            SECTION 2: CAREER HISTORY
            Height: min-h-screen (Full Screen) - Plane Points to Current Project
           ========================================================================= */}
        <section className="min-h-screen flex flex-col justify-center px-6 border-x border-white/5 relative bg-gradient-to-b from-black via-slate-950 to-black snap-start overflow-hidden">
          <div className="max-w-6xl mx-auto w-full flex flex-col justify-center h-full py-20">
            <div className="flex items-baseline gap-4 mb-12 border-b border-white/20 pb-4">
              <span className="font-mono text-blue-500 text-xl">02.</span>
              <h2 className="text-4xl font-bold text-white uppercase">Career History</h2>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 md:border-l-0">
              {/* Target: 2025 Current Project (비행기가 가리킬 곳) */}
              <div className="relative md:grid md:grid-cols-2 gap-12 mb-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="md:text-right"
                >
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2 animate-pulse">CURRENT FOCUS</span>
                  <h3 className="text-3xl font-bold text-white">Personal Project</h3>
                  <p className="text-blue-400 font-mono text-sm mb-4">2025.01 ~ NOW</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    AI 기반 개발 생산성 극대화 및 신규 서비스 런칭 준비 중.<br />
                    Cursor AI 활용 워크플로우 최적화 및 MVP 검증.
                  </p>
                </motion.div>

                <div className="absolute left-[-5px] top-0 w-3 h-3 bg-blue-500 rounded-full md:left-1/2 md:-ml-[7px] shadow-[0_0_10px_#3b82f6]" />
                <div className="hidden md:block"></div>
              </div>

              {/* Other History */}
              <div className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                {experience.slice(1, 3).map((exp, idx) => (
                  <div key={idx} className="relative md:grid md:grid-cols-2 gap-12 mb-8 items-center">
                    <div className={`md:text-right ${idx % 2 !== 0 ? 'md:order-2 md:text-left' : ''}`}>
                      <h3 className="text-xl font-bold text-slate-300">{exp.company}</h3>
                      <p className="text-slate-600 font-mono text-xs">{exp.period}</p>
                    </div>
                    <div className="hidden md:block w-px h-full bg-slate-800 absolute left-1/2" />
                  </div>
                ))}
                <p className="text-center text-xs text-slate-600 mt-4">...and more history below</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: ABOUT & SKILLS
            Height: min-h-screen (Full Screen) - Zigzag & Figure-8 Flight
           ========================================================================= */}
        <section className="min-h-screen flex flex-col justify-center px-6 border-x border-white/5 relative bg-black/60 backdrop-blur-sm snap-start">
          <div className="max-w-6xl mx-auto w-full py-20">
            <div className="flex items-baseline gap-4 mb-16 border-b border-white/20 pb-4">
              <span className="font-mono text-blue-500 text-xl">03.</span>
              <h2 className="text-4xl font-bold text-white uppercase">About & Skills</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Text Area - Zigzag Flight Path */}
              <div className="space-y-8 text-lg font-light leading-relaxed relative">
                {personalInfo.summary.map((txt, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="p-4 border-l-2 border-slate-800 bg-gradient-to-r from-slate-900/50 to-transparent hover:border-blue-500 transition-colors"
                  >
                    <p className="text-slate-300">
                      <span className="text-blue-500 font-mono mr-2">//</span>
                      {txt}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Stats Area - Figure 8 Flight Path */}
              <div className="grid grid-cols-2 gap-6 font-mono relative">
                <div className="bg-slate-900/40 p-8 border border-slate-800 flex flex-col items-center justify-center group hover:border-blue-500/50 transition-colors">
                  <h4 className="text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-500">8+</h4>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Years Exp</span>
                </div>
                <div className="bg-slate-900/40 p-8 border border-slate-800 flex flex-col items-center justify-center group hover:border-cyan-500/50 transition-colors">
                  <h4 className="text-6xl font-black text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-500">13+</h4>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">Projects</span>
                </div>

                <div className="col-span-2 mt-8 flex flex-wrap gap-2 justify-center opacity-70">
                  {skills.flatMap(s => s.items).slice(0, 8).map((item, i) => (
                    <span key={i} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: PROJECTS ARCHIVE
            Height: min-h-screen - Plane Centers & Points Down
           ========================================================================= */}
        <section className="py-40 px-6 max-w-7xl mx-auto border-x border-white/5 bg-slate-950/30 backdrop-blur-sm relative z-10 min-h-screen">
          <div className="flex items-baseline gap-4 mb-16 border-b border-white/20 pb-4">
            <span className="font-mono text-blue-500 text-xl">04.</span>
            <h2 className="text-4xl font-bold text-white uppercase">Projects Archive</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {allProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="py-20 border-t border-white/10 text-center bg-black relative z-10">
          <div className="flex justify-center items-center gap-2 mb-4 text-blue-500">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
            <span className="font-mono text-xs tracking-widest">MISSION COMPLETE</span>
          </div>
          <p className="text-slate-600 font-mono text-xs">
            © {new Date().getFullYear()} KYU-HYUN KIM. DESIGNED FOR THE FUTURE.
          </p>
        </footer>
      </div>
    </div>
  );
}