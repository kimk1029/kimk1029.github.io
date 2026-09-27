"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Scroll } from "scrollex";
import { allProjects, type Project } from "@/app/data";
import { companyLabel } from "../company";
import { kf, Reveal } from "../scroll-utils";

const featuredProjects = allProjects.slice(0, 6);
const archiveProjects = allProjects.slice(6);

// 블록이 아래에서 작게 들어와 화면 중앙에 닿을 때 원래 크기가 된다.
const FeaturedProject = ({ project, index }: { project: Project; index: number }) => (
  <Scroll.Section>
    <Scroll.Item
      keyframes={kf(({ section }) => ({
        [section.topAt("container-bottom")]: { scale: 0.92, opacity: 0.2 },
        [section.topAt("container-center")]: { scale: 1, opacity: 1 },
      }))}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group grid gap-8 border-t border-apple-line py-14 md:grid-cols-[120px_1fr] md:py-20"
      >
        <span className="text-[17px] font-semibold text-apple-gray">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <p className="text-[15px] font-semibold text-apple-gray md:text-[17px]">
            {project.type} · {project.period}
          </p>
          <h3 className="mt-4 text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] text-apple-ink md:text-[88px]">
            {project.title}
          </h3>
          <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-apple-dim md:text-[24px] md:leading-snug">
            {project.shortDesc}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="text-[14px] text-apple-gray">{project.tech.slice(0, 5).join(" · ")}</p>
            <span className="inline-flex items-center text-[17px] text-apple-link group-hover:underline">
              자세히 보기
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </Scroll.Item>
  </Scroll.Section>
);

export default function Projects() {
  return (
    <section id="projects" className="bg-apple-white text-apple-ink">
      <div className="mx-auto max-w-6xl px-6 py-32 md:py-48">
        <Reveal className="mb-16 md:mb-24">
          <h2 className="text-[40px] font-semibold leading-tight tracking-[-0.03em] md:text-[64px]">
            만들고. 출시하고.
            <br />
            <span className="text-apple-gray">운영합니다.</span>
          </h2>
        </Reveal>

        <div className="border-b border-apple-line">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Reveal className="mb-8 mt-32 md:mt-44">
          <h3 className="text-[32px] font-semibold tracking-[-0.03em] md:text-[48px]">
            그리고 회사에서 해낸 일들.
          </h3>
        </Reveal>
        <div className="border-b border-apple-line">
          {archiveProjects.map((project) => (
            <Reveal key={project.slug} y={40}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid gap-1 border-t border-apple-line py-6 md:grid-cols-[1.2fr_2fr_140px_24px] md:items-baseline md:gap-8"
              >
                <h4 className="text-[21px] font-semibold tracking-[-0.02em] group-hover:text-apple-link">
                  {project.title}
                </h4>
                <p className="text-[15px] leading-relaxed text-apple-dim">{project.shortDesc}</p>
                <p className="text-[14px] text-apple-gray md:text-right">
                  {companyLabel(project.company)}
                </p>
                <ChevronRight className="hidden h-4 w-4 text-apple-gray transition-transform group-hover:translate-x-0.5 group-hover:text-apple-link md:block" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
