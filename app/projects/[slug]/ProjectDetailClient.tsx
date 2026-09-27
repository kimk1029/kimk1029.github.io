"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, Mail } from "lucide-react";
import { Scroll } from "scrollex";
import type { Project } from "@/app/data";
import { ProjectBadge } from "@/app/components/ProjectBadge";
import { kf, pinRange, Reveal } from "@/app/components/scroll-utils";

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="bg-black text-apple-white selection:bg-[#d7ff4f] selection:text-black">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
          <Link href="/#projects" className="inline-flex items-center gap-1 text-sm text-apple-white/80 hover:text-apple-white">
            <ChevronLeft className="h-4 w-4" />
            Portfolio
          </Link>
          <span className="truncate pl-4 text-sm font-semibold">{project.title}</span>
        </div>
      </header>

      <Scroll.Container scrollAxis="y" className="h-[100dvh]">
        {/* 히어로: 제목이 고정된 채 작아지며 사라진다 */}
        <Scroll.Section className="relative h-[140vh]">
          <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden px-6">
            <Scroll.Item
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                return {
                  [pin.at(0)]: { scale: 1, opacity: 1 },
                  [pin.at(1)]: { scale: 2, opacity: 0.2 },
                };
              })}
            >
              <div className="glow-orb h-[70vmax] w-[70vmax] rounded-full" />
            </Scroll.Item>
            <Scroll.Item
              className="text-center"
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                return {
                  [pin.at(0)]: { scale: 1, opacity: 1, translateY: 0 },
                  [pin.at(1)]: { scale: 0.8, opacity: 0, translateY: -60 },
                };
              })}
            >
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(16px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <ProjectBadge company={project.company} />
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-apple-gray">
                  {project.type} · {project.period}
                </p>
                <h1 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[0.95] tracking-tighter md:text-8xl">
                  {project.title}
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-apple-gray md:text-2xl">
                  {project.shortDesc}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-apple-blue px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                  >
                    사이트 방문하기
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </Scroll.Item>
          </div>
        </Scroll.Section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <Reveal>
            <p className="text-3xl font-bold leading-snug tracking-tight md:text-5xl md:leading-tight">
              {project.description}
            </p>
          </Reveal>

          <Reveal className="mt-24">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">Tech Stack</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-white/15 bg-apple-card px-4 py-2 text-base">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-24">
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">Key Actions</p>
            </Reveal>
            <div className="mt-8 grid gap-4">
              {project.details.map((detail, index) => (
                <Reveal key={detail} y={60} scale={0.96}>
                  <div className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-apple-card p-6 md:grid-cols-[64px_1fr] md:p-8">
                    <span className="text-gradient text-2xl font-extrabold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="flex gap-3 text-lg leading-relaxed text-apple-white/85">
                      <Check className="mt-1.5 h-5 w-5 flex-none text-apple-gray" />
                      {detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="mt-32 text-center">
            <h2 className="text-4xl font-extrabold tracking-tighter md:text-6xl">
              더 궁금한 점이 <span className="text-gradient">있으신가요?</span>
            </h2>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:kimk1029@naver.com"
                className="inline-flex items-center gap-2 rounded-full bg-apple-blue px-7 py-3.5 font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <Mail className="h-4 w-4" />
                메일로 물어보기
              </a>
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition-colors hover:bg-white hover:text-black"
              >
                다른 프로젝트 보기
              </Link>
            </div>
          </Reveal>
        </section>
      </Scroll.Container>
    </main>
  );
}
