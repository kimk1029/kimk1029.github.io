"use client";

import { Scroll, type KeyframesContext } from "scrollex";
import { experience } from "@/app/data";
import { kf, Reveal } from "../scroll-utils";

// 다음 카드가 올라와 덮는 동안의 스크롤 구간. 모바일과 마지막 카드는 쌓이지 않는다.
const pushBackRange = ({ section, container }: KeyframesContext, index: number, count: number) => {
  if (container.width < 768 || index === count - 1) return null;
  const stuckAt = section.topAt("container-top") + index * container.height;
  return { from: stuckAt + container.height * 0.4, to: stuckAt + container.height };
};

// 카드가 차례로 화면 위에 쌓이고, 뒤로 밀린 카드는 작아지며 어두워진다.
export default function Work() {
  const count = experience.length;

  return (
    <section id="work" className="bg-black px-4 pt-32 md:px-6 md:pt-48">
      <Reveal className="mx-auto mb-10 max-w-6xl px-2 md:mb-0">
        <h2 className="text-[40px] font-semibold leading-tight tracking-[-0.03em] text-apple-white md:text-[64px]">
          <span className="text-apple-dim">병목을 보고, 구조를 바꾸고,</span>
          <br />
          문서로 남겼습니다.
        </h2>
      </Reveal>

      <Scroll.Section className="relative mx-auto max-w-6xl">
        {experience.map((exp, index) => (
          <div
            key={exp.company}
            className="mb-6 md:sticky md:top-0 md:mb-0 md:flex md:h-[100dvh] md:items-center"
            style={{ paddingTop: `${index * 1.5}rem` }}
          >
            <Scroll.Item
              className="w-full origin-top"
              keyframes={kf((ctx) => {
                const range = pushBackRange(ctx, index, count);
                if (!range) return {};
                return {
                  [range.from]: { scale: 1 },
                  [range.to]: { scale: 0.92 },
                };
              })}
            >
              <article
                className="relative overflow-hidden rounded-[18px] bg-apple-card p-7 md:p-14"
              >
                {/* 투명도 대신 검은 막을 덮어 어둡게 해야 뒤 카드가 비치지 않는다 */}
                <Scroll.Item
                  className="pointer-events-none absolute inset-0 z-10 bg-black"
                  keyframes={kf((ctx) => {
                    const range = pushBackRange(ctx, index, count);
                    if (!range) return { 0: { opacity: 0 } };
                    return {
                      [range.from]: { opacity: 0 },
                      [range.to]: { opacity: 0.6 },
                    };
                  })}
                />
                <p className="text-[15px] font-semibold text-apple-gray md:text-[17px]">
                  {exp.period} · {exp.role}
                </p>
                <h3 className="mt-3 text-[32px] font-semibold tracking-[-0.03em] text-apple-white md:text-[48px]">
                  {exp.company}
                </h3>
                <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-apple-white md:text-[21px]">
                  {exp.description}
                </p>
                <ul className="mt-10 grid gap-x-12 gap-y-4 md:grid-cols-2">
                  {exp.details.map((detail) => (
                    <li key={detail} className="border-t border-white/10 pt-4 text-[14px] leading-relaxed text-apple-gray md:text-[15px]">
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            </Scroll.Item>
          </div>
        ))}
      </Scroll.Section>
    </section>
  );
}
