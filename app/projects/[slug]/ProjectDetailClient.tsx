"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Scroll } from "scrollex";
import type { Project } from "@/app/data";
import { companyLabel } from "@/app/components/company";
import { kf, pinRange, Reveal } from "@/app/components/scroll-utils";

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="bg-black text-apple-white selection:bg-apple-blue selection:text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-xl backdrop-saturate-150">
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
        <Scroll.Section className="relative h-[140vh] bg-black">
          <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden px-6">
            <Scroll.Item
              className="text-center"
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                return {
                  [pin.at(0)]: { scale: 1, opacity: 1, translateY: 0 },
                  [pin.at(1)]: { scale: 0.85, opacity: 0, translateY: -60 },
                };
              })}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <p className="text-[17px] font-semibold text-apple-gray md:text-[21px]">
                  {companyLabel(project.company)} · {project.period}
                </p>
                <h1 className="mt-4 max-w-5xl text-[48px] font-semibold leading-[1.02] tracking-[-0.04em] md:text-[96px]">
                  {project.title}
                </h1>
                <p className="mt-8 max-w-2xl text-[19px] leading-relaxed text-apple-gray md:text-[24px] md:leading-snug">
                  {project.shortDesc}
                </p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center text-[17px] text-apple-link-dark hover:underline"
                  >
                    사이트 방문하기
                    <ChevronRight className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            </Scroll.Item>
          </div>
        </Scroll.Section>

        <section className="bg-apple-white text-apple-ink">
          <div className="mx-auto max-w-5xl px-6 py-32">
            <Reveal>
              <p className="text-[28px] font-semibold leading-snug tracking-[-0.02em] md:text-[40px] md:leading-tight">
                {project.description}
              </p>
            </Reveal>

            <Reveal className="mt-24">
              <div className="grid gap-4 border-t border-apple-line pt-8 md:grid-cols-[200px_1fr]">
                <h2 className="text-[21px] font-semibold">기술 스택</h2>
                <p className="text-[19px] leading-relaxed text-apple-dim">{project.tech.join(" · ")}</p>
              </div>
            </Reveal>

            <Reveal className="mt-16">
              <div className="border-t border-apple-line pt-8">
                <h2 className="text-[21px] font-semibold">주요 작업</h2>
              </div>
            </Reveal>
            <div className="mt-6 border-b border-apple-line">
              {project.details.map((detail, index) => (
                <Reveal key={detail} y={40}>
                  <div className="grid gap-2 border-t border-apple-line py-6 md:grid-cols-[200px_1fr]">
                    <span className="text-[17px] font-semibold text-apple-gray">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[17px] leading-relaxed md:text-[19px]">{detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black">
          <div className="mx-auto max-w-5xl px-6 py-32 text-center">
            <Reveal>
              <h2 className="text-[40px] font-semibold tracking-[-0.03em] md:text-[64px]">
                더 궁금한 점이 있으신가요?
              </h2>
              <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
                <a
                  href="mailto:kimk1029@naver.com"
                  className="rounded-full bg-apple-blue px-6 py-3 text-[17px] text-white transition-colors hover:bg-[#0077ed]"
                >
                  메일로 물어보기
                </a>
                <Link href="/#projects" className="inline-flex items-center text-[17px] text-apple-link-dark hover:underline">
                  다른 프로젝트 보기
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </Scroll.Container>
    </main>
  );
}
