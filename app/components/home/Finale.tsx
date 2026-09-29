"use client";

import { ChevronRight } from "lucide-react";
import { motion, useTransform } from "framer-motion";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { Sparkles } from "../Sparkles";
import { kf, pinRange, usePinProgress } from "../scroll-utils";

const leadership = [
  "React·SWR·상태 관리 패턴 주간 기술 세션 운영",
  "마이그레이션 과정과 API 표준을 Notion Wiki로 문서화",
  "미국 본사 및 AT&T 엔지니어와 영어로 이슈 트래킹",
  "Bit Camp Academy 웹 크롤링·시각화 프로젝트 팀 리더",
];

// 문장이 양옆에서 번갈아 미끄러져 들어와 화면 중앙을 지날 때만 선명해진다.
export const Leadership = () => (
  <section className="bg-apple-white text-apple-ink">
    <div className="mx-auto max-w-6xl overflow-hidden px-6 pb-32 md:pb-48">
      <p className="mb-10 text-[21px] font-semibold text-apple-gray md:text-[24px]">
        혼자 익힌 방식을 팀의 방식으로.
      </p>
      <div className="grid gap-8 md:gap-12">
        {leadership.map((item, index) => {
          const fromLeft = index % 2 === 0;
          return (
            <Scroll.Section key={item}>
              <Scroll.Item
                keyframes={kf(({ section, container }) => {
                  const center = section.topAt("container-center");
                  const span = container.height * 0.32;
                  return {
                    [center - span]: {
                      opacity: 0.1,
                      translateX: fromLeft ? -160 : 160,
                      skewX: fromLeft ? -8 : 8,
                    },
                    [center]: { opacity: 1, translateX: 0, skewX: 0 },
                    [center + span]: {
                      opacity: 0.1,
                      translateX: fromLeft ? 60 : -60,
                      skewX: 0,
                    },
                  };
                })}
              >
                <p className="text-[32px] font-semibold leading-tight tracking-[-0.03em] md:text-[56px]">
                  {item}
                </p>
              </Scroll.Item>
            </Scroll.Section>
          );
        })}
      </div>
    </div>
  </section>
);

const ripples = [0, 1, 2, 3, 4];

const Headline = () => {
  const progress = usePinProgress();
  // 글자가 벌어진 채 크게 시작해서 조여지며 제자리를 찾는다
  const letterSpacing = useTransform(progress, [0, 0.4], ["0.18em", "-0.04em"]);
  const scale = useTransform(progress, [0, 0.4], [1.5, 1]);
  const opacity = useTransform(progress, [0, 0.25], [0, 1]);

  return (
    <motion.h2
      style={{ letterSpacing, scale, opacity }}
      className="shimmer text-[48px] font-semibold leading-[1.05] md:text-[96px]"
    >
      함께 만들 제품이
      <br />
      있으신가요?
    </motion.h2>
  );
};

export default function Finale() {
  return (
    <Scroll.Section id="contact" className="relative z-10 -mt-10 h-[260vh] rounded-t-[40px] bg-black">
      <div className="sticky top-0 flex h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <Sparkles count={120} className="absolute inset-0 h-full w-full" />
        {/* 파문: 가는 원이 시차를 두고 퍼져 나간다 */}
        {ripples.map((ripple) => (
          <Scroll.Item
            key={ripple}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[30vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
            keyframes={kf((ctx) => {
              const pin = pinRange(ctx);
              const start = 0.05 + ripple * 0.1;
              return {
                [pin.at(start)]: { scale: 0.2, opacity: 0 },
                [pin.at(start + 0.15)]: { scale: 1 + ripple * 0.6, opacity: 0.8 },
                [pin.at(start + 0.6)]: { scale: 3.5 + ripple * 1.2, opacity: 0 },
              };
            })}
          />
        ))}

        <Headline />

        <Scroll.Item
          className="mt-12"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0.4)]: { opacity: 0, translateY: 50 },
              [pin.at(0.6)]: { opacity: 1, translateY: 0 },
            };
          })}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <a
              href={`mailto:${personalInfo.email}`}
              className="shine rounded-full bg-apple-blue px-6 py-3 text-[17px] text-white transition-transform duration-300 hover:scale-105"
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
        </Scroll.Item>

        <Scroll.Item
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0.55)]: { opacity: 0 },
              [pin.at(0.75)]: { opacity: 1 },
            };
          })}
        >
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
