"use client";

import { ChevronRight } from "lucide-react";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { kf, pinRange } from "../scroll-utils";

const leadership = [
  "React·SWR·상태 관리 패턴 주간 기술 세션 운영",
  "마이그레이션 과정과 API 표준을 Notion Wiki로 문서화",
  "미국 본사 및 AT&T 엔지니어와 영어로 이슈 트래킹",
  "Bit Camp Academy 웹 크롤링·시각화 프로젝트 팀 리더",
];

// 문장이 화면 중앙을 지날 때만 선명해진다.
export const Leadership = () => (
  <section className="bg-apple-white text-apple-ink">
    <div className="mx-auto max-w-6xl px-6 pb-32 md:pb-48">
      <p className="mb-10 text-[21px] font-semibold text-apple-gray md:text-[24px]">
        혼자 익힌 방식을 팀의 방식으로.
      </p>
      <div className="grid gap-8 md:gap-12">
        {leadership.map((item) => (
          <Scroll.Section key={item}>
            <Scroll.Item
              keyframes={kf(({ section, container }) => {
                const center = section.topAt("container-center");
                const span = container.height * 0.3;
                return {
                  [center - span]: { opacity: 0.15, translateY: 20 },
                  [center]: { opacity: 1, translateY: 0 },
                  [center + span]: { opacity: 0.15, translateY: 0 },
                };
              })}
            >
              <p className="text-[32px] font-semibold leading-tight tracking-[-0.03em] md:text-[56px]">
                {item}
              </p>
            </Scroll.Item>
          </Scroll.Section>
        ))}
      </div>
    </div>
  </section>
);

export default function Finale() {
  return (
    <Scroll.Section id="contact" className="relative h-[220vh] bg-black">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Scroll.Item
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [ctx.section.topAt("container-bottom")]: { scale: 1.4, opacity: 0 },
              [pin.at(0.35)]: { scale: 1, opacity: 1 },
            };
          })}
        >
          <h2 className="text-[48px] font-semibold leading-[1.05] tracking-[-0.04em] text-apple-white md:text-[96px]">
            함께 만들 제품이
            <br />
            있으신가요?
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
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <a
              href={`mailto:${personalInfo.email}`}
              className="rounded-full bg-apple-blue px-6 py-3 text-[17px] text-white transition-colors hover:bg-[#0077ed]"
            >
              메일 보내기
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-[17px] text-apple-link-dark hover:underline"
            >
              GitHub에서 코드 보기
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-10 text-[14px] text-apple-gray">
            {personalInfo.email} · {personalInfo.phone} · {personalInfo.location}
          </p>
        </Scroll.Item>

        <p className="absolute bottom-6 text-xs text-apple-dim">
          © {new Date().getFullYear()} 김규현
        </p>
      </div>
    </Scroll.Section>
  );
}
