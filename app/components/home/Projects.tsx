"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { Scroll } from "scrollex";
import { allProjects, type Project } from "@/app/data";
import { companyLabel } from "../company";
import { ProjectVisual } from "../ProjectVisual";
import { clamp, kf, MaskText, Parallax, Reveal, useTraverseProgress } from "../scroll-utils";

const featuredProjects = allProjects.slice(0, 6);
const archiveProjects = allProjects.slice(6);

// 목업이 아래에서 위로 잘려 열리며 커진 상태에서 원래 크기로 돌아오고, 이후 천천히 흐른다.
const ProjectImage = ({ project }: { project: Project }) => {
  const progress = useTraverseProgress();
  const reveal = useTransform(progress, (p) => clamp(p / 0.36));
  const clipPath = useTransform(reveal, (r) => `inset(${(1 - clamp(r * 1.6)) * 100}% 0 0 0)`);
  const scale = useTransform(reveal, [0, 1], [1.2, 1]);
  const y = useTransform(progress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div style={{ clipPath }} className="aspect-[4/3] overflow-hidden rounded-[18px] bg-[#e8e8ed]">
      <motion.div style={{ scale, y }} className="h-full w-full">
        <ProjectVisual project={project} reveal={reveal} dark />
      </motion.div>
    </motion.div>
  );
};

const FeaturedProject = ({ project, index }: { project: Project; index: number }) => {
  const flip = index % 2 === 1;

  return (
    <Scroll.Section className="relative">
      {/* 거대한 번호가 배경에서 글과 다른 속도로 흐른다 */}
      <Parallax
        speed={0.35}
        className={`pointer-events-none absolute top-0 hidden md:block ${flip ? "right-0" : "left-0"}`}
      >
        <span className="text-[24rem] font-semibold leading-none tracking-[-0.08em] text-[#e8e8ed]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </Parallax>

      <Link
        href={`/projects/${project.slug}`}
        className={`group relative grid items-center gap-10 border-t border-apple-line py-20 md:grid-cols-2 md:gap-16 md:py-32 ${
          flip ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Scroll.Item
          keyframes={kf(({ section, container }) => ({
            [section.topAt("container-bottom")]: {
              translateX: flip ? 80 : -80,
              opacity: 0,
              rotateY: flip ? -14 : 14,
            },
            [section.topAt("container-bottom") + container.height * 0.5]: {
              translateX: 0,
              opacity: 1,
              rotateY: 0,
            },
          }))}
          style={{ perspective: 1200 }}
        >
          <ProjectImage project={project} />
        </Scroll.Item>

        <div className="relative">
          <p className="text-[15px] font-semibold text-apple-gray md:text-[17px]">
            {project.type} · {project.period}
          </p>
          <MaskText
            as="h3"
            text={project.title}
            trigger={0.55}
            className="mt-4 text-[44px] font-semibold leading-[1.02] tracking-[-0.04em] text-apple-ink md:text-[72px]"
          />
          <Scroll.Item
            keyframes={kf(({ section, container }) => ({
              [section.topAt("container-bottom") + container.height * 0.2]: {
                opacity: 0,
                translateY: 40,
              },
              [section.topAt("container-bottom") + container.height * 0.55]: {
                opacity: 1,
                translateY: 0,
              },
            }))}
          >
            <p className="mt-6 max-w-xl text-[19px] leading-relaxed text-apple-dim md:text-[22px] md:leading-snug">
              {project.shortDesc}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <p className="text-[14px] text-apple-gray">{project.tech.slice(0, 5).join(" · ")}</p>
              <span className="inline-flex items-center text-[17px] text-apple-link group-hover:underline">
                자세히 보기
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Scroll.Item>
        </div>
      </Link>
    </Scroll.Section>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="-mt-10 rounded-t-[40px] bg-apple-white text-apple-ink">
      <div className="mx-auto max-w-6xl overflow-hidden px-6 py-32 md:py-48">
        <Reveal className="mb-16 md:mb-24">
          <h2 className="text-[40px] font-semibold leading-tight tracking-[-0.03em] md:text-[64px]">
            <MaskText as="span" className="block" text="만들고. 출시하고." />
            <MaskText as="span" className="block text-apple-gray" text="운영합니다." stagger={40} />
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
          {archiveProjects.map((project, index) => (
            <Reveal key={project.slug} y={30} x={-60} delay={index * 20}>
              <Link
                href={`/projects/${project.slug}`}
                className="group grid gap-1 border-t border-apple-line py-6 transition-transform duration-500 hover:translate-x-2 md:grid-cols-[1.2fr_2fr_140px_24px] md:items-baseline md:gap-8"
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
