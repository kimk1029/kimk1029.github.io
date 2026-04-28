"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BriefcaseBusiness,
  Github,
  Mail,
  MapPin,
  Phone,
  Radar,
  ScrollText,
  Sparkles,
} from "lucide-react";
import { allProjects, experience, personalInfo, skills, type Project } from "./data";

const navItems = [
  ["Intro", "#intro"],
  ["Skills", "#skills"],
  ["Work", "#work"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

const proofNotes = [
  "Svelte -> React 마이그레이션",
  "UI 반복 4~5회 -> 1~2회",
  "메인 데이터 페칭 34% 개선",
  "Lighthouse 20% 개선",
  "독립 개발 프로덕트 6종",
  "Harness Engineering",
];

const capabilityNotes = [
  {
    title: "AI를 기능이 아니라 작업 흐름으로 다룹니다",
    body: "Claude Code, 커스텀 MCP 서버, 공개 Agent Skills, 하네스 엔지니어링, 간이 eval을 실제 개인 프로젝트에 붙여 PR 단위 작업과 반복 파싱 작업을 맡겼습니다.",
  },
  {
    title: "프론트엔드를 협업 인터페이스로 봅니다",
    body: "Neopin에서 디자인 시스템과 스타일 가이드를 만들고, 기획·디자인·개발 간 반복 비용을 줄이는 프로세스를 문서화했습니다.",
  },
  {
    title: "끝까지 굴러가는 제품을 만듭니다",
    body: "Next.js, Flutter, React Native, NestJS, Supabase, Docker를 오가며 서버 구축, 앱 배포 준비, 마케팅 섭외까지 직접 진행했습니다.",
  },
];

const leadership = [
  "React·SWR·상태 관리 패턴 주간 기술 세션 운영",
  "마이그레이션 과정과 API 표준을 Notion Wiki로 문서화",
  "미국 본사 및 AT&T 엔지니어와 영어로 이슈 트래킹",
  "Bit Camp Academy 웹 크롤링·시각화 프로젝트 팀 리더",
];

const featuredProjects = allProjects.slice(0, 6);

const SectionLabel = ({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) => (
  <div className="mb-10 flex items-end justify-between gap-6 border-b-2 border-zinc-950 pb-4">
    <div>
      <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
        <span>{index}</span>
        <span className="h-px w-10 bg-zinc-400" />
        <span>{eyebrow}</span>
      </div>
      <h2 className="max-w-4xl text-4xl font-black leading-none tracking-normal text-zinc-950 md:text-7xl">
        {title}
      </h2>
    </div>
  </div>
);

const getProjectLabel = (company: string) => {
  if (company === "Personal Project") {
    return {
      text: "PERSONAL",
      className: "bg-[#d7ff4f] text-zinc-950",
    };
  }

  if (company === "NEOWIZ") {
    return {
      text: "NEOWIZ",
      className: "bg-zinc-950 text-[#d7ff4f]",
    };
  }

  if (company === "Trumpia") {
    return {
      text: "TRUMPIA",
      className: "bg-[#f5f0e6] text-zinc-950",
    };
  }

  return {
    text: company.toUpperCase(),
    className: "bg-[#f5f0e6] text-zinc-950",
  };
};

const ProjectLabel = ({ company }: { company: string }) => {
  const label = getProjectLabel(company);

  return (
    <span
      className={`inline-flex w-fit items-center border border-zinc-950 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest ${label.className}`}
    >
      {label.text}
    </span>
  );
};

const ProjectRow = ({ project, index }: { project: Project; index: number }) => (
  <Link
    href={`/projects/${project.slug}`}
    className="group grid gap-5 border-b-2 border-zinc-950 py-7 transition-colors hover:bg-[#d7ff4f] md:grid-cols-[110px_1.4fr_1fr_170px]"
  >
    <div className="font-mono text-xs text-zinc-500 group-hover:text-zinc-950">
      P-{String(index + 1).padStart(2, "0")}
    </div>
    <div>
      <ProjectLabel company={project.company} />
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-2xl font-black text-zinc-950 md:text-4xl">
          {project.title}
        </h3>
        <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
      </div>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-700">
        {project.shortDesc}
      </p>
    </div>
    <div className="flex flex-wrap content-start gap-2">
      {project.tech.slice(0, 5).map((tech) => (
        <span
          key={tech}
          className="border border-zinc-950 bg-[#f5f0e6] px-2 py-1 font-mono text-[11px] uppercase text-zinc-800 group-hover:bg-zinc-950 group-hover:text-[#d7ff4f]"
        >
          {tech}
        </span>
      ))}
    </div>
    <div className="font-mono text-xs uppercase text-zinc-500 md:text-right">
      <div>{project.company}</div>
      <div className="mt-1 text-zinc-950">{project.period}</div>
    </div>
  </Link>
);

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#f5f0e6] text-zinc-950 selection:bg-[#d7ff4f] selection:text-zinc-950">
      <div className="fixed inset-0 pointer-events-none opacity-[0.28] [background-image:linear-gradient(#18181b_1px,transparent_1px),linear-gradient(90deg,#18181b_1px,transparent_1px)] [background-size:24px_24px]" />

      <header className="sticky top-0 z-40 border-b-2 border-zinc-950 bg-[#f5f0e6]/90 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 md:px-6">
          <a href="#intro" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-zinc-950 font-black text-[#d7ff4f]">
              K
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.22em] text-zinc-700 sm:block">
              Frontend / AI Product Engineering
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-zinc-700 hover:bg-zinc-950 hover:text-[#d7ff4f]"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${personalInfo.email}`}
            className="border-2 border-zinc-950 px-3 py-2 font-mono text-xs uppercase tracking-widest hover:bg-zinc-950 hover:text-[#d7ff4f] md:hidden"
          >
            Mail
          </a>
        </div>
      </header>

      <section id="intro" className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border-2 border-zinc-950 bg-[#f5f0e6]"
          >
            <div className="flex items-center justify-between border-b-2 border-zinc-950 px-4 py-3 font-mono text-xs uppercase tracking-[0.22em]">
              <span>Resume parsed from DOCX</span>
              <span>2026</span>
            </div>
            <div className="p-5 md:p-8">
              <div className="mb-8 flex flex-wrap gap-2">
                {["React", "Next.js", "Full Stack", "LLM Workflow"].map((tag) => (
                  <span key={tag} className="bg-zinc-950 px-3 py-1 font-mono text-xs uppercase text-[#d7ff4f]">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-[4rem] font-black leading-[0.86] tracking-normal text-zinc-950 sm:text-[6.5rem] lg:text-[8.5rem]">
                김규현
              </h1>
              <p className="mt-7 max-w-3xl text-2xl font-bold leading-tight text-zinc-950 md:text-4xl">
                {personalInfo.title}
              </p>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-700 md:text-xl">
                {personalInfo.subtitle}. 복잡한 제품 요구사항을 UI, 데이터, 자동화 워크플로우로
                분해해 실제로 배포되는 결과물까지 밀고 갑니다.
              </p>
            </div>
          </motion.div>

          <aside className="grid gap-4">
            <div className="border-2 border-zinc-950 bg-zinc-950 p-5 text-[#f5f0e6]">
              <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#d7ff4f]">
                <Radar className="h-4 w-4" />
                Current Focus
              </div>
              <p className="text-3xl font-black leading-tight">
                Claude Code, MCP, Agent Skills, 하네스 엔지니어링을 제품 개발 루틴으로 가져오는 프론트엔드 엔지니어.
              </p>
            </div>
            <div className="grid grid-cols-2 border-2 border-zinc-950 bg-[#d7ff4f]">
              <div className="border-r-2 border-zinc-950 p-5">
                <div className="font-mono text-xs uppercase">Career</div>
                <div className="mt-8 text-5xl font-black">8y+</div>
              </div>
              <div className="p-5">
                <div className="font-mono text-xs uppercase">Solo products</div>
                <div className="mt-8 text-5xl font-black">6</div>
              </div>
            </div>
            <div className="border-2 border-zinc-950 bg-[#f5f0e6] p-5">
              <div className="grid gap-3 text-sm">
                <a className="flex items-center gap-3 hover:underline" href={`mailto:${personalInfo.email}`}>
                  <Mail className="h-4 w-4" /> {personalInfo.email}
                </a>
                <a className="flex items-center gap-3 hover:underline" href={personalInfo.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" /> github.com/kimk1029
                </a>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" /> {personalInfo.phone}
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" /> {personalInfo.location}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 grid border-2 border-zinc-950 bg-[#f5f0e6] md:grid-cols-3">
          {personalInfo.summary.map((text, index) => (
            <p
              key={text}
              className="border-b-2 border-zinc-950 p-5 text-base leading-relaxed text-zinc-700 last:border-b-0 md:border-b-0 md:border-r-2 md:last:border-r-0"
            >
              <span className="mb-5 block font-mono text-xs text-zinc-500">
                NOTE {String(index + 1).padStart(2, "0")}
              </span>
              {text}
            </p>
          ))}
        </div>
      </section>

      <section id="skills" className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <SectionLabel index="01" eyebrow="Capabilities" title="AI와 제품 개발을 같은 테이블에 올립니다." />
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {capabilityNotes.map((note, index) => (
              <motion.article
                key={note.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06 }}
                className="border-2 border-zinc-950 bg-[#f5f0e6] p-5"
              >
                <div className="mb-5 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-500">
                  <span>Case {index + 1}</span>
                  {index === 0 ? <Bot className="h-4 w-4" /> : <ScrollText className="h-4 w-4" />}
                </div>
                <h3 className="text-2xl font-black leading-tight">{note.title}</h3>
                <p className="mt-4 leading-relaxed text-zinc-700">{note.body}</p>
              </motion.article>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.category} className="border-2 border-zinc-950 bg-zinc-950 p-5 text-[#f5f0e6]">
                <div className="mb-7 flex items-center gap-3">
                  <skill.icon className="h-5 w-5 text-[#d7ff4f]" />
                  <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-[#d7ff4f]">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="border border-[#f5f0e6]/30 px-2 py-1 text-sm text-[#f5f0e6]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <SectionLabel index="02" eyebrow="Work Record" title="회사와 독립 개발 양쪽에서 남긴 작업 기록." />
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="border-2 border-zinc-950 bg-[#d7ff4f] p-5">
            <BriefcaseBusiness className="mb-8 h-8 w-8" />
            <p className="text-2xl font-black leading-tight">
              리드 타이틀보다 먼저 병목을 보고, 구조를 바꾸고, 문서로 남겼습니다.
            </p>
          </div>
          <div className="border-2 border-zinc-950 bg-[#f5f0e6]">
            {experience.map((exp, index) => (
              <article key={exp.company} className="grid gap-5 border-b-2 border-zinc-950 p-5 last:border-b-0 md:grid-cols-[170px_1fr]">
                <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  <div>{exp.period}</div>
                  <div className="mt-2 text-zinc-950">{exp.role}</div>
                </div>
                <div>
                  <h3 className="text-3xl font-black">{exp.company}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-zinc-700">{exp.description}</p>
                  <ul className="mt-5 grid gap-2">
                    {exp.details.map((detail) => (
                      <li key={detail} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                        <span className="mt-2 h-2 w-2 flex-none bg-zinc-950" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-y-2 border-zinc-950 bg-zinc-950 py-8 text-[#f5f0e6]">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 md:grid-cols-3 md:px-6">
          {proofNotes.map((note) => (
            <div key={note} className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="h-4 w-4 text-[#d7ff4f]" />
              {note}
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <SectionLabel index="03" eyebrow="Selected Projects" title="개인 프로젝트 6종과 핵심 업무 프로젝트." />
        <div className="border-t-2 border-zinc-950">
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.slice(6).map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group border-2 border-zinc-950 bg-[#f5f0e6] p-5 hover:bg-zinc-950 hover:text-[#f5f0e6]"
            >
              <div className="mb-8 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-500 group-hover:text-[#d7ff4f]">
                <span>A-{String(index + 1).padStart(2, "0")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <div className="mb-4">
                <ProjectLabel company={project.company} />
              </div>
              <h3 className="text-2xl font-black leading-tight">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700 group-hover:text-[#f5f0e6]/75">
                {project.shortDesc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <SectionLabel index="04" eyebrow="Leadership" title="개인이 익힌 방식을 팀이 쓸 수 있게 바꿉니다." />
        <div className="grid gap-4 md:grid-cols-2">
          {leadership.map((item, index) => (
            <div key={item} className="border-2 border-zinc-950 bg-[#f5f0e6] p-5">
              <div className="mb-8 font-mono text-xs uppercase tracking-widest text-zinc-500">
                L-{String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-2xl font-black leading-tight">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="relative border-t-2 border-zinc-950 bg-[#d7ff4f]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:px-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-700">
              Contact
            </div>
            <p className="mt-4 max-w-3xl text-4xl font-black leading-none md:text-6xl">
              프로덕션 수준의 프론트엔드와 AI 워크플로우를 함께 다룹니다.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-3 font-mono text-sm">
            <a className="flex items-center gap-3 underline" href={`mailto:${personalInfo.email}`}>
              <Mail className="h-4 w-4" /> {personalInfo.email}
            </a>
            <a className="flex items-center gap-3 underline" href={personalInfo.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> github.com/kimk1029
            </a>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4" /> {personalInfo.phone}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
