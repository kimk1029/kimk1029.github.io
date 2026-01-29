'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Building,
  Cpu,
  CheckCircle,
} from 'lucide-react';
import type { Project } from '@/app/data';

export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Grid Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-slate-500 hover:text-white mb-12 transition-colors font-mono text-sm uppercase"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to List
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-white/10 pb-16"
        >
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider uppercase rounded-none">
              {project.type}
            </span>
            <span className="flex items-center gap-2 text-slate-500 text-sm font-mono">
              <Building size={14} /> {project.company}
            </span>
            <span className="flex items-center gap-2 text-slate-500 text-sm font-mono">
              <Calendar size={14} /> {project.period}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            {project.title}
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Details (Left 2 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-12"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-blue-500 inline-block mr-2" />
                Key Achievements & Details
              </h3>
              <ul className="space-y-4">
                {project.details.map((detail: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 bg-slate-900/30 border border-slate-800 p-4"
                  >
                    <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 leading-relaxed">
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar (Right 1 col) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-slate-900/20 border border-slate-800 p-6">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                <Cpu size={16} /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-black border border-slate-700 text-slate-400 text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 border border-dashed border-slate-700 text-center">
              <p className="text-slate-500 text-sm mb-4">
                Interested in this project?
              </p>
              <a
                href="mailto:kimk1029@naver.com"
                className="inline-block w-full py-3 bg-white text-black font-bold hover:bg-blue-400 transition-colors"
              >
                ASK ME DETAILS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
