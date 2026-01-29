"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import {
  Github, Mail, ArrowRight, Phone, Send, MapPin, Calendar, Briefcase
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
  const gradientOverlay = isPersonal
    ? "from-pink-950/90 to-purple-950/90"
    : "from-blue-950/90 to-cyan-950/90";
  const hoverBorder = isPersonal ? "group-hover:border-pink-500/50" : "group-hover:border-blue-500/50";

  return (
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -10 }}
        className={`h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 flex flex-col group transition-all duration-300 rounded-none ${hoverBorder}`}
      >
        <div className="relative h-60 overflow-hidden border-b border-slate-800">
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} z-10 pointer-events-none transition-opacity duration-500`} />
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

        <div className="p-8 flex flex-col flex-grow relative overflow-hidden">
          {/* Decorative Corner */}
          <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r transition-colors ${isPersonal ? 'border-pink-500/30' : 'border-blue-500/30'}`} />

          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className={`text-2xl font-bold text-white mt-1 transition-colors ${isPersonal ? 'group-hover:text-pink-400' : 'group-hover:text-blue-400'}`}>
                {project.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1 flex items-center gap-2">
                <Briefcase size={10} /> {project.company}
              </p>
            </div>
            <ArrowRight className={`text-slate-600 transition-colors w-5 h-5 ${isPersonal ? 'group-hover:text-pink-500' : 'group-hover:text-blue-500'}`} />
          </div>

          <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
            {project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.slice(0, 4).map((t: string, i: number) => (
              <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black border border-slate-700 text-slate-500 font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// --- Timeline Component ---
const TimelineItem = ({ exp, index }: { exp: any, index: number }) => {
  const isLeft = index % 2 === 0;
  return (
    <div className={`flex flex-col md:flex-row gap-8 md:gap-0 relative mb-24 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* Date & Meta (Side) */}
      <div className={`md:w-1/2 flex flex-col justify-center ${isLeft ? 'md:items-end md:pr-16 text-right' : 'md:items-start md:pl-16 text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-mono text-blue-400 text-sm mb-2 tracking-widest uppercase flex items-center gap-2"
        >
          {isLeft ? <>{exp.period} <Calendar size={14} /></> : <><Calendar size={14} /> {exp.period}</>}
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-black text-white mb-1"
        >
          {exp.company}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-slate-400 font-light"
        >
          {exp.role}
        </motion.p>
      </div>

      {/* Center Line & Node */}
      <div className="absolute left-0 md:left-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 -ml-[1px] hidden md:block">
        <div className="sticky top-1/2 w-4 h-4 bg-black border-2 border-blue-500 rounded-full -ml-[7px] shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10" />
      </div>

      {/* Content Card (Other Side) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`md:w-1/2 relative ${isLeft ? 'md:pl-16' : 'md:pr-16'}`}
      >
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 hover:border-blue-500/30 transition-all group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/50" />
          <p className="text-slate-300 mb-6 leading-relaxed">
            {exp.description}
          </p>
          <ul className="space-y-3">
            {exp.details.map((detail: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 전체 스크롤 진행도 (0 ~ 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Parallax & Plane Animations ---

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // 비행기 경로 (X축: 좌우로 크게 왔다 갔다)
  const planeX = useTransform(smoothScroll,
    [0, 0.2, 0.45, 0.7, 1],
    ["10vw", "70vw", "20vw", "80vw", "-10vw"]
  );

  // 비행기 경로 (Y축: 위에서 아래로)
  const planeY = useTransform(smoothScroll,
    [0, 1],
    ["10vh", "110vh"] // 뷰포트 기준 상대적 위치라 화면 따라 내려옴
  );

  // 비행기 회전 (진행 방향에 맞춰 회전)
  const planeRotate = useTransform(smoothScroll,
    [0, 0.2, 0.45, 0.7, 1],
    [45, 135, 45, 135, 180]
  );

  // 배경 요소 패럴랙스
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]); // Hero 섹션 텍스트

  return (
    <div ref={containerRef} className="bg-black text-slate-300 selection:bg-blue-500/30 overflow-x-hidden perspective-1000 relative">

      {/* --- Paper Plane (Fixed Layer) --- */}
      <motion.div
        style={{ x: planeX, top: planeY, rotate: planeRotate }}
        className="fixed z-50 pointer-events-none drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
      >
        <Send size={48} className="text-cyan-400 fill-cyan-400/20" strokeWidth={1.5} />
        {/* Trail effect behind plane */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl -z-10" />
      </motion.div>


      {/* --- Background Layers --- */}
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black" />

      <motion.div style={{ y: starsY }} className="fixed inset-0 z-1 pointer-events-none opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Stars */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white]" />
        <div className="absolute top-1/4 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full blur-[1px]" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-50" />
      </motion.div>

      {/* --- Main Content --- */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto border-x border-white/5 relative overflow-hidden">
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
            className="space-y-8 relative z-10"
          >
            <div className="flex items-center gap-4 text-blue-500 font-mono text-sm tracking-widest uppercase">
              <span className="w-12 h-[2px] bg-blue-500 inline-block shadow-[0_0_10px_#3b82f6]" />
              Architecting Web3 & AI Frontiers
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter">
              KYU-HYUN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 animate-gradient-x">
                KIM
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl font-light leading-relaxed pl-2 border-l-4 border-slate-800">
              <span className="text-white font-medium">{personalInfo.title}</span> <br />
              bridging the gap between complex backend logic and intuitive user experiences.
            </p>

            <div className="flex flex-wrap gap-6 pt-12 mt-12 border-t border-white/10">
              <div className="flex items-center gap-3 group">
                <div className="bg-blue-900/20 p-3 border border-blue-500/30 group-hover:border-blue-500/80 transition-colors">
                  <Phone className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Phone</div>
                  <div className="text-white font-bold tracking-wider">{personalInfo.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="bg-blue-900/20 p-3 border border-blue-500/30 group-hover:border-blue-500/80 transition-colors">
                  <Mail className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-white font-bold tracking-wider hover:text-blue-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section (New Timeline) */}
        <section className="py-40 px-6 max-w-7xl mx-auto border-x border-white/5 relative bg-gradient-to-b from-black via-slate-950 to-black">
          <SectionHeading num="1">Career History</SectionHeading>

          <div className="relative py-20">
            {/* Mobile Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-800 md:hidden" />

            {experience.map((exp, idx) => (
              <TimelineItem key={idx} exp={exp} index={idx} />
            ))}
          </div>
        </section>

        {/* About & Skills */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-x border-white/5 relative z-10 bg-black/60 backdrop-blur-sm">
          <SectionHeading num="2">About & Skills</SectionHeading>

          <div className="grid md:grid-cols-5 gap-16 relative">
            <div className="md:col-span-2 space-y-6 text-lg font-light leading-relaxed pr-8">
              {personalInfo.summary.map((txt, i) => (
                <p key={i} className="text-slate-300">
                  <span className="text-blue-500/50 mr-2 font-mono text-sm">{`//`}</span>
                  {txt}
                </p>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10 font-mono">
                {/* Stats */}
                <div className="bg-slate-900/50 p-4 border border-slate-800 hover:border-blue-500 transition-colors">
                  <h4 className="text-4xl font-bold text-white">8+</h4>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Years</span>
                </div>
                <div className="bg-slate-900/50 p-4 border border-slate-800 hover:border-blue-500 transition-colors">
                  <h4 className="text-4xl font-bold text-blue-500">13+</h4>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Projects</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 grid gap-4">
              {skills.map((skill, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="bg-slate-900/40 border border-slate-800 p-6 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <skill.icon className="text-slate-500 group-hover:text-blue-400 transition-colors w-6 h-6" />
                    <h3 className="font-bold text-white uppercase text-sm tracking-widest group-hover:text-blue-400 transition-colors">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {skill.items.map((item, i) => (
                      <span key={i} className="text-sm text-slate-400 font-mono flex items-center">
                        <span className="w-1 h-1 bg-slate-600 rounded-full mr-2 group-hover:bg-blue-500 transition-colors"></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="py-40 px-6 max-w-7xl mx-auto border-x border-white/5 bg-slate-950/30 backdrop-blur-sm relative z-10">
          <SectionHeading num="3">Projects Archive</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {allProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="py-20 border-t border-white/10 text-center bg-black relative z-10">
          <div className="flex justify-center items-center gap-2 mb-4 text-blue-500 animate-pulse">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="font-mono text-xs tracking-widest">SYSTEM ONLINE</span>
          </div>
          <p className="text-slate-600 font-mono text-xs">
            © {new Date().getFullYear()} KYU-HYUN KIM. DESIGNED FOR THE FUTURE.
          </p>
        </footer>
      </div>
    </div>
  );
}