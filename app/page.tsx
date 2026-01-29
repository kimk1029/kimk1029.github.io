'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Github, Mail, ArrowRight, Phone } from 'lucide-react';
import { personalInfo, skills, allProjects } from './data';
import type { Project } from './data';

// --- Components ---

const SectionHeading = ({
  children,
  num,
}: {
  children: React.ReactNode;
  num: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex items-baseline gap-4 mb-12 border-b border-white/20 pb-4"
  >
    <span className="font-mono text-blue-500 text-xl">0{num}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
      {children}
    </h2>
  </motion.div>
);

const ProjectCard = ({ project }: { project: Project }) => {
  const isPersonal = project.company === 'Personal Project';

  const labelStyles = isPersonal
    ? 'bg-pink-600 text-white border-pink-700 shadow-[0_0_10px_rgba(219,39,119,0.5)]'
    : 'bg-blue-600 text-white border-blue-700 shadow-[0_0_10px_rgba(37,99,235,0.5)]';
  const gradientOverlay = isPersonal
    ? 'from-pink-950/80 to-purple-950/80'
    : 'from-blue-950/80 to-cyan-950/80';
  const hoverBorder = isPersonal
    ? 'hover:border-pink-500/50'
    : 'hover:border-blue-500/50';
  const titleHover = isPersonal
    ? 'group-hover:text-pink-400'
    : 'group-hover:text-blue-400';

  const imageSrc =
    project.image ??
    'https://placehold.co/800/400/1e293b/64748b?text=Project';

  return (
    <Link href={`/projects/${project.slug}/`} className="block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        className={`h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 flex flex-col group transition-all duration-300 rounded-none ${hoverBorder}`}
      >
        {/* Image & Label Section */}
        <div className="relative h-52 overflow-hidden border-b border-slate-800">
          <div
            className={`absolute inset-0 bg-gradient-to-t ${gradientOverlay} z-10 pointer-events-none`}
          />
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-500"
          />

          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span
              className={`font-mono text-[10px] font-bold border px-2 py-1 tracking-wider uppercase backdrop-blur-md ${labelStyles}`}
            >
              {isPersonal ? 'PERSONAL' : 'COMPANY'}
            </span>
            <span className="font-mono text-[10px] font-bold border border-white/20 bg-black/50 text-slate-300 px-2 py-1 tracking-wider uppercase backdrop-blur-md">
              {project.type}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3
                className={`text-xl font-bold text-white mt-1 transition-colors ${titleHover}`}
              >
                {project.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-1">
                {project.company} | {project.period}
              </p>
            </div>
            <ArrowRight
              className={`text-slate-600 transition-colors w-5 h-5 ${isPersonal ? 'group-hover:text-pink-500' : 'group-hover:text-blue-500'}`}
            />
          </div>

          <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
            {project.shortDesc}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.slice(0, 4).map((t: string, i: number) => (
              <span
                key={i}
                className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black border border-slate-700 text-slate-500 font-mono"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] px-2 py-1 text-slate-600 font-mono">
                +
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div
      ref={containerRef}
      className="min-h-[200vh] bg-black text-slate-300 selection:bg-blue-500/30 overflow-x-hidden perspective-1000"
    >
      {/* --- Parallax Background Layers --- */}

      {/* Layer 1: Deep Space Background (Slowest) */}
      <motion.div style={{ y: bgY }} className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/20 rounded-full blur-[100px] mix-blend-screen opacity-40" />
      </motion.div>

      {/* Layer 2: Stars & Grid (Medium Speed) */}
      <motion.div
        style={{ y: starsY }}
        className="fixed inset-0 z-[1] pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-70" />
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-70 shadow-[0_0_10px_white]" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 blur-[1px]" />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-cyan-500 rounded-full opacity-30 blur-sm" />
      </motion.div>

      {/* --- Main Content (Normal Scroll) --- */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto border-x border-white/5 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-8 relative"
          >
            <div className="flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase">
              <span className="w-12 h-[2px] bg-blue-500 inline-block" />
              Architecting Web3 & AI Frontiers
            </div>

            <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">
              KYU-HYUN <br />
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600">
                KIM
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-slate-400 max-w-3xl font-light leading-relaxed">
              <span className="text-white font-medium">
                {personalInfo.title}
              </span>{' '}
              bridging the gap between complex backend logic and intuitive user
              experiences.
              <span className="text-blue-400/80 text-lg font-mono mt-4 block border-l-2 border-blue-500/50 pl-4">
                {' '}
                // {personalInfo.subtitle}
              </span>
            </p>

            {/* 연락처 및 정보 섹션 */}
            <div className="flex flex-wrap gap-6 pt-12 border-t border-white/10 mt-12">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-3 border border-blue-500/50">
                  <Phone className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-mono uppercase">
                    Phone
                  </div>
                  <div className="text-white font-bold tracking-wider">
                    {personalInfo.phone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-blue-600/20 p-3 border border-blue-500/50">
                  <Mail className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-mono uppercase">
                    Email
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-white font-bold tracking-wider hover:text-blue-400 transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto px-8 py-4 bg-transparent border border-white/30 text-white font-bold hover:bg-white/10 transition-colors rounded-none flex items-center gap-2 group"
              >
                <Github
                  size={18}
                  className="group-hover:text-blue-400 transition-colors"
                />{' '}
                GITHUB PROFILE
              </a>
            </div>
          </motion.div>
        </section>

        {/* About & Skills */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-x border-white/5 relative z-10 bg-black/80 backdrop-blur-md">
          <SectionHeading num="1">About & Skills</SectionHeading>

          <div className="grid md:grid-cols-5 gap-16 relative">
            <div className="absolute top-0 bottom-0 left-[40%] w-px bg-white/10 hidden md:block" />

            <div className="md:col-span-2 space-y-6 text-lg font-light leading-relaxed pr-8">
              {personalInfo.summary.map((txt, i) => (
                <p key={i} className="text-slate-300">
                  <span className="text-blue-500/50 mr-2 font-mono text-sm">
                    {`>`}
                  </span>
                  {txt}
                </p>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10 font-mono">
                <div className="bg-slate-900/50 p-4 border border-slate-800">
                  <h4 className="text-4xl font-bold text-blue-500">8+</h4>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Years Experience
                  </span>
                </div>
                <div className="bg-slate-900/50 p-4 border border-slate-800">
                  <h4 className="text-4xl font-bold text-cyan-500">13+</h4>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">
                    Total Projects
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 grid gap-4 pl-8">
              {skills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    key={idx}
                    className="bg-slate-900/40 border border-slate-800 p-5 hover:border-blue-500/30 transition-all hover:bg-slate-900/60 hover:translate-x-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="text-blue-500 w-5 h-5" />
                      <h3 className="font-bold text-white uppercase text-sm tracking-widest">
                        {skill.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {skill.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-sm text-slate-400 font-mono flex items-center relative"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-500/50 rounded-full mr-2 inline-block" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects (All) */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-x border-white/5 bg-slate-950/80 backdrop-blur-sm relative z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.1),transparent_50%)] pointer-events-none" />
          <SectionHeading num="2">All Projects Archive</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {allProjects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center text-slate-600 font-mono text-xs bg-black relative z-10">
          <p className="mb-2">END OF LINE_</p>
          <p>
            © {new Date().getFullYear()} KYU-HYUN KIM. All systems operational.
          </p>
        </footer>
      </div>
    </div>
  );
}
