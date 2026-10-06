"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { allProjects, personalInfo, type Project } from "@/app/data";
import { Patch, TRANSMITTING, patchName } from "@/app/Patch";

const statusOf = (p: Project) =>
  TRANSMITTING.includes(p.slug) ? "운영 중" : p.company === "Personal Project" ? "개인 프로젝트" : p.company;

export default function ProjectDetailClient({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const index = allProjects.findIndex((p) => p.slug === project.slug);
  const back = project.company === "Personal Project" ? "/#projects" : "/#career";

  return (
    <main className="min-h-screen bg-pad text-ink">
      <header className="fixed inset-x-0 top-0 z-50 bg-ink text-pad">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-5 md:px-6">
          <Link href={back} className="inline-flex items-center gap-2 font-display text-base font-black uppercase tracking-wide hover:text-nasa">
            <ArrowLeft className="h-4 w-4" /> 포트폴리오로
          </Link>
          <Link href="/" className="font-stencil text-xl font-black uppercase tracking-[0.08em]">
            KKH<span className="text-nasa">.</span>
          </Link>
        </div>
      </header>

      <section className="fuselage px-5 pb-16 pt-28 text-white md:px-6">
        <div className="mx-auto grid max-w-7xl items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h1 className="max-w-[16ch] font-display text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.86]">
              {patchName(project.title)}
            </h1>
            <p className="mt-4 text-sm">
              <span className="font-hangul">{statusOf(project)}</span>
              <span className="tabular font-mono"> · {project.period}</span>
            </p>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">{project.description}</p>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 bg-ink px-5 py-4 font-display text-xl font-black uppercase tracking-wide transition-colors duration-300 ease-expo hover:bg-pad hover:text-ink"
              >
                {project.url.replace(/^https?:\/\/(www\.)?/, "")}
                <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            )}
          </div>
          <motion.div
            initial={reduce ? false : { rotate: -30, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-44 w-44 md:h-64 md:w-64"
          >
            <Patch project={project} index={index} className="h-full w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]" />
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 md:px-6 lg:grid-cols-[1fr_320px]">
        <section>
          <h2 className="font-display text-4xl font-black uppercase md:text-5xl">주요 작업</h2>
          <ol className="mt-8 border-t-2 border-ink">
            {project.details.map((detail) => (
              <li key={detail} className="flex gap-4 border-b border-ink/25 py-5">
                <span aria-hidden className="mt-2 h-2.5 w-2.5 flex-none bg-nasa" />
                <p className="max-w-[68ch] text-[17px] leading-relaxed">{detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className="grid content-start gap-10">
          <div>
            <h2 className="font-display text-2xl font-black uppercase">기술 스택</h2>
            <ul className="mt-4 grid gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="flex items-center gap-2.5 text-[15px]">
                  <span aria-hidden className="grid h-3.5 w-3.5 flex-none place-items-center border-2 border-ink">
                    <span className="h-1.5 w-1.5 bg-nasa" />
                  </span>
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-black uppercase">프로젝트 유형</h2>
            <p className="mt-2 text-[15px]">{project.type}</p>
          </div>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-between gap-3 bg-ink px-5 py-4 font-display text-lg font-black uppercase tracking-wide text-pad transition-colors duration-300 ease-expo hover:bg-nasa"
          >
            <span className="inline-flex items-center gap-2">
              <Mail className="h-5 w-5" /> 자세히 묻기
            </span>
            <ArrowUpRight className="h-5 w-5" />
          </a>
        </aside>
      </div>
    </main>
  );
}
