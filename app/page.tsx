'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { personalInfo, skills, allProjects } from './data';

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

const ProjectCard = ({ project }: { project: (typeof allProjects)[number] }) => (
  <Link href={`/projects/${project.slug}/`} className="block h-full">
    <motion.div
      whileHover={{ y: -5, borderColor: '#3b82f6' }}
      className="h-full bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-6 flex flex-col group transition-all duration-300 rounded-none hover:bg-slate-900/60"
    >
      <div className="flex justify-between items-start mb-4">
        <span className="font-mono text-xs text-blue-500 border border-blue-500/30 px-2 py-1 bg-blue-500/10">
          {project.type}
        </span>
        <ArrowRight className="text-slate-600 group-hover:text-blue-500 transition-colors w-5 h-5" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4 font-mono">
        {project.company} | {project.period}
      </p>

      <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
        {project.shortDesc}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.tech.slice(0, 4).map((t: string, i: number) => (
          <span
            key={i}
            className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black border border-slate-700 text-slate-400"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-[10px] px-2 py-1 text-slate-500">+</span>
        )}
      </div>
    </motion.div>
  </Link>
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-slate-300 selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Starscape + Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-50" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-blue-500 rounded-full opacity-20 blur-sm" />
        <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-white rounded-full opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto border-x border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-blue-500 font-mono text-sm tracking-widest uppercase">
              <span className="w-8 h-[1px] bg-blue-500 inline-block" />
              Portfolio_2026
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
              KYU-HYUN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-300">
                KIM
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
              {personalInfo.title} <br />
              <span className="text-slate-500 text-lg font-mono mt-2 block">
                {personalInfo.subtitle}
              </span>
            </p>

            <div className="flex gap-4 pt-8">
              <a
                href={`mailto:${personalInfo.email}`}
                className="px-8 py-4 bg-white text-black font-bold hover:bg-blue-400 transition-colors rounded-none flex items-center gap-2"
              >
                <Mail size={18} /> CONTACT
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold hover:bg-white/10 transition-colors rounded-none flex items-center gap-2"
              >
                <Github size={18} /> GITHUB
              </a>
            </div>
          </motion.div>
        </section>

        {/* About & Skills */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-x border-white/5">
          <SectionHeading num="1">About & Skills</SectionHeading>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6 text-lg font-light leading-relaxed">
              {personalInfo.summary.map((txt, i) => (
                <p key={i} className="text-slate-300">
                  {txt}
                </p>
              ))}

              <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                <div>
                  <h4 className="text-4xl font-bold text-white font-mono">
                    8+
                  </h4>
                  <span className="text-sm text-slate-500 uppercase tracking-wider">
                    Years Exp
                  </span>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-white font-mono">
                    13+
                  </h4>
                  <span className="text-sm text-slate-500 uppercase tracking-wider">
                    Projects
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {skills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/30 border border-slate-800 p-4 hover:border-blue-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="text-blue-500 w-5 h-5" />
                      <h3 className="font-bold text-white uppercase text-sm tracking-wide">
                        {skill.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs text-slate-400 font-mono"
                        >
                          [{item}]
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects (All) */}
        <section className="py-32 px-6 max-w-7xl mx-auto border-x border-white/5 bg-slate-950/50">
          <SectionHeading num="2">Featured Projects</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>

        <footer className="py-12 border-t border-white/10 text-center text-slate-600 font-mono text-xs">
          <p>© 2026 KYU-HYUN KIM. SYSTEM STATUS: ONLINE.</p>
        </footer>
      </div>
    </div>
  );
}
