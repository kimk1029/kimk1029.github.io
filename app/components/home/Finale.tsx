"use client";

import { ArrowUpRight, Github, Mail, Phone } from "lucide-react";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { kf, pinRange } from "../scroll-utils";

const leadership = [
  "React·SWR·상태 관리 패턴 주간 기술 세션 운영",
  "마이그레이션 과정과 API 표준을 Notion Wiki로 문서화",
  "미국 본사 및 AT&T 엔지니어와 영어로 이슈 트래킹",
  "Bit Camp Academy 웹 크롤링·시각화 프로젝트 팀 리더",
];

// 문장이 화면 중앙을 지날 때만 밝게 빛난다.
export const Leadership = () => (
  <section className="mx-auto max-w-6xl px-6 py-32 md:py-48">
    <p className="mb-10 text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">
      Leadership
    </p>
    <div className="grid gap-8 md:gap-12">
      {leadership.map((item) => (
        <Scroll.Section key={item}>
          <Scroll.Item
            keyframes={kf(({ section, container }) => {
              const center = section.topAt("container-center");
              const span = container.height * 0.3;
              return {
                [center - span]: { opacity: 0.18, translateX: -20 },
                [center]: { opacity: 1, translateX: 0 },
                [center + span]: { opacity: 0.18, translateX: 0 },
              };
            })}
          >
            <p className="text-3xl font-bold leading-tight tracking-tight text-apple-white md:text-6xl">
              {item}
            </p>
          </Scroll.Item>
        </Scroll.Section>
      ))}
    </div>
  </section>
);

export default function Finale() {
  return (
    <Scroll.Section id="contact" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Scroll.Item
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [ctx.section.topAt("container-bottom")]: { scale: 0.3, opacity: 0 },
              [pin.at(0.5)]: { scale: 1.1, opacity: 1 },
            };
          })}
        >
          <div className="glow-orb h-[60vmax] w-[60vmax] rounded-full" />
        </Scroll.Item>

        <Scroll.Item
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [ctx.section.topAt("container-bottom")]: { scale: 1.5, opacity: 0 },
              [pin.at(0.35)]: { scale: 1, opacity: 1 },
            };
          })}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">Contact</p>
          <h2 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tighter text-apple-white md:text-8xl">
            함께 만들 제품이
            <br />
            <span className="text-gradient">있으신가요?</span>
          </h2>
        </Scroll.Item>

        <Scroll.Item
          className="mt-12"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0.35)]: { opacity: 0, translateY: 40 },
              [pin.at(0.6)]: { opacity: 1, translateY: 0 },
            };
          })}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-apple-blue px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" />
              메일 보내기
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold text-apple-white transition-colors hover:bg-white hover:text-black"
            >
              <Github className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-apple-gray sm:flex-row sm:gap-6">
            <span>{personalInfo.email}</span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" />
              {personalInfo.phone}
            </span>
            <span>{personalInfo.location}</span>
          </div>
        </Scroll.Item>

        <p className="absolute bottom-6 text-xs text-apple-gray/70">
          © {new Date().getFullYear()} 김규현 · Built with Next.js & Scrollex
        </p>
      </div>
    </Scroll.Section>
  );
}
