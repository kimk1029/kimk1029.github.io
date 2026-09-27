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

const cardTints = ["from-[#232d10]", "from-[#0c2336]", "from-[#211838]"];

// 카드가 차례로 화면 위에 쌓이고, 뒤로 밀린 카드는 작아지며 어두워진다.
export default function Work() {
  const count = experience.length;

  return (
    <section id="work" className="px-4 md:px-6">
      <Reveal className="mx-auto mb-10 max-w-6xl px-2 md:mb-0">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">Work</p>
        <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-apple-white md:text-7xl">
          병목을 보고, 구조를 바꾸고,
          <br />
          <span className="text-gradient">문서로 남겼습니다.</span>
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
                className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br ${cardTints[index % cardTints.length]} to-apple-card to-60% p-7 md:p-12`}
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
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-apple-gray">
                  <span>{exp.period}</span>
                  <span className="rounded-full border border-white/15 px-3 py-1">{exp.role}</span>
                </div>
                <h3 className="mt-6 text-3xl font-bold tracking-tight text-apple-white md:text-5xl">
                  {exp.company}
                </h3>
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-apple-white/80 md:text-xl">
                  {exp.description}
                </p>
                <ul className="mt-8 grid gap-3 md:grid-cols-2 md:gap-x-10">
                  {exp.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-relaxed text-apple-gray md:text-[15px]">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-apple-white/60" />
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
