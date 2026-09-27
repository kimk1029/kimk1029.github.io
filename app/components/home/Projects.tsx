"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Scroll } from "scrollex";
import { allProjects, type Project } from "@/app/data";
import { ProjectBadge } from "../ProjectBadge";
import { kf, Reveal } from "../scroll-utils";

const featuredProjects = allProjects.slice(0, 6);
const archiveProjects = allProjects.slice(6);

const glows = [
  "radial-gradient(60% 80% at 80% 0%, rgba(215,255,79,0.35), transparent 70%)",
  "radial-gradient(60% 80% at 20% 0%, rgba(56,189,248,0.35), transparent 70%)",
  "radial-gradient(60% 80% at 80% 100%, rgba(167,139,250,0.35), transparent 70%)",
  "radial-gradient(60% 80% at 10% 100%, rgba(251,113,133,0.3), transparent 70%)",
  "radial-gradient(60% 80% at 50% 0%, rgba(45,212,191,0.3), transparent 70%)",
  "radial-gradient(60% 80% at 90% 50%, rgba(251,191,36,0.28), transparent 70%)",
];

// 카드가 아래에서 작게 들어와 화면 중앙에서 원래 크기가 되고, 안쪽 제목은 반대로 살짝 흘러 깊이감을 준다.
const FeaturedCard = ({ project, index }: { project: Project; index: number }) => (
  <Scroll.Section className="relative">
    <Scroll.Item
      keyframes={kf(({ section }) => ({
        [section.topAt("container-bottom")]: { scale: 0.86, opacity: 0.3 },
        [section.topAt("container-center")]: { scale: 1, opacity: 1 },
      }))}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block min-h-[70vh] overflow-hidden rounded-[2.5rem] border border-white/10 bg-apple-card p-8 md:min-h-[80vh] md:p-14"
      >
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 group-hover:opacity-80"
          style={{ background: glows[index % glows.length] }}
        />
        <div className="relative flex h-full min-h-[calc(70vh-4rem)] flex-col justify-between gap-10 md:min-h-[calc(80vh-7rem)]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-3">
              <ProjectBadge company={project.company} />
              <span className="text-sm font-medium text-apple-gray">{project.type}</span>
            </div>
            <span className="text-sm font-semibold text-apple-gray">{project.period}</span>
          </div>

          <Scroll.Item
            keyframes={kf(({ section, container }) => ({
              [section.topAt("container-bottom")]: { translateY: container.height * 0.18 },
              [section.bottomAt("container-top")]: { translateY: -container.height * 0.12 },
            }))}
          >
            <h3 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tighter text-apple-white md:text-8xl">
              {project.title}
            </h3>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-apple-white/75 md:text-2xl">
              {project.shortDesc}
            </p>
          </Scroll.Item>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-apple-white/80 backdrop-blur"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-lg font-medium text-apple-blue">
              자세히 보기
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </Scroll.Item>
  </Scroll.Section>
);

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-32 md:px-6 md:py-48">
      <Reveal className="mb-16 px-2 text-center md:mb-24">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">
          Selected Projects
        </p>
        <h2 className="mx-auto mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-apple-white md:text-7xl">
          만들고. 출시하고.
          <br />
          <span className="text-gradient">운영합니다.</span>
        </h2>
      </Reveal>

      <div className="grid gap-8 md:gap-12">
        {featuredProjects.map((project, index) => (
          <FeaturedCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <Reveal className="mb-10 mt-32 px-2 md:mt-48">
        <h3 className="text-3xl font-bold tracking-tight text-apple-white md:text-5xl">
          그리고 회사에서 해낸 일들.
        </h3>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {archiveProjects.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 3) * 50} y={60} itemClassName="h-full">
            <Link
              href={`/projects/${project.slug}`}
              className="group flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-apple-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-[#1f1f22]"
            >
              <div className="flex items-center justify-between">
                <ProjectBadge company={project.company} />
                <ArrowUpRight className="h-5 w-5 text-apple-gray transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-apple-white" />
              </div>
              <h4 className="mt-8 text-2xl font-bold leading-tight tracking-tight text-apple-white">
                {project.title}
              </h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-apple-gray">{project.shortDesc}</p>
              <p className="mt-6 text-xs font-medium text-apple-gray/80">{project.period}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
