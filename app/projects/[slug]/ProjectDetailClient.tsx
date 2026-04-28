"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  Cpu,
  ExternalLink,
  Factory,
} from "lucide-react";
import type { Project } from "@/app/data";

export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f5f0e6] text-zinc-950 selection:bg-[#d7ff4f]">
      <div className="fixed inset-0 pointer-events-none opacity-[0.25] [background-image:linear-gradient(#18181b_1px,transparent_1px),linear-gradient(90deg,#18181b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-14">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 border-2 border-zinc-950 bg-[#f5f0e6] px-3 py-2 font-mono text-xs uppercase tracking-widest hover:bg-zinc-950 hover:text-[#d7ff4f]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <section className="border-2 border-zinc-950 bg-[#f5f0e6]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-950 px-4 py-3 font-mono text-xs uppercase tracking-[0.22em] text-zinc-600">
            <span>{project.type}</span>
            <span>{project.period}</span>
          </div>
          <div className="grid gap-8 p-5 md:grid-cols-[1fr_280px] md:p-8">
            <div>
              <h1 className="max-w-4xl text-5xl font-black leading-none tracking-normal md:text-8xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-xl font-bold leading-tight md:text-3xl">
                {project.description}
              </p>
            </div>
            <aside className="grid content-start gap-4">
              <div className="border-2 border-zinc-950 bg-[#d7ff4f] p-4">
                <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                  <Factory className="h-4 w-4" />
                  Company
                </div>
                <p className="text-2xl font-black">{project.company}</p>
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border-2 border-zinc-950 bg-zinc-950 p-4 font-mono text-xs uppercase tracking-widest text-[#d7ff4f]"
                >
                  Visit
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </aside>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="border-2 border-zinc-950 bg-[#f5f0e6]">
            <div className="border-b-2 border-zinc-950 px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-zinc-600">
              Key Actions
            </div>
            <div>
              {project.details.map((detail, index) => (
                <div
                  key={detail}
                  className="grid gap-4 border-b-2 border-zinc-950 p-5 last:border-b-0 md:grid-cols-[70px_1fr]"
                >
                  <div className="font-mono text-xs text-zinc-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <p className="flex gap-3 text-lg leading-relaxed text-zinc-800">
                    <Check className="mt-1 h-5 w-5 flex-none" />
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <aside className="grid content-start gap-6">
            <div className="border-2 border-zinc-950 bg-zinc-950 p-5 text-[#f5f0e6]">
              <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#d7ff4f]">
                <Cpu className="h-4 w-4" />
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="border border-[#f5f0e6]/30 px-2 py-1 text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-2 border-zinc-950 bg-[#f5f0e6] p-5">
              <div className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
                <Calendar className="h-4 w-4" />
                Period
              </div>
              <p className="text-3xl font-black">{project.period}</p>
            </div>
            <a
              href="mailto:kimk1029@naver.com"
              className="border-2 border-zinc-950 bg-[#d7ff4f] p-5 text-center font-mono text-xs uppercase tracking-widest hover:bg-zinc-950 hover:text-[#d7ff4f]"
            >
              Ask me details
            </a>
          </aside>
        </div>
      </div>
    </main>
  );
}
