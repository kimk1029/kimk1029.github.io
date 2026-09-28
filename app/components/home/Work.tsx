"use client";

import { Scroll, type KeyframesContext } from "scrollex";
import { experience } from "@/app/data";
import { kf, MaskText, Reveal } from "../scroll-utils";

// 카드가 화면 위에 완전히 고정되는 스크롤 위치
const stuckAt = ({ section, container }: KeyframesContext, index: number) =>
  section.topAt("container-top") + index * container.height;

// 다음 카드가 올라와 덮는 동안의 스크롤 구간. 모바일과 마지막 카드는 쌓이지 않는다.
const pushBackRange = (ctx: KeyframesContext, index: number, count: number) => {
  if (ctx.container.width < 768 || index === count - 1) return null;
  const at = stuckAt(ctx, index);
  return { from: at + ctx.container.height * 0.4, to: at + ctx.container.height };
};

const years = ["2025", "2020", "2016"];

// 카드가 아래에서 젖혀진 채 올라와 화면에 쌓이고, 뒤로 밀린 카드는 작아지며 어두워진다.
export default function Work() {
  const count = experience.length;

  return (
    <section id="work" className="-mt-10 rounded-t-[40px] bg-black px-4 pt-32 md:px-6 md:pt-48">
      <Reveal className="mx-auto mb-10 max-w-6xl px-2 md:mb-0">
        <h2 className="text-[40px] font-semibold leading-tight tracking-[-0.03em] text-apple-white md:text-[64px]">
          <MaskText as="span" className="block text-apple-dim" text="병목을 보고, 구조를 바꾸고," />
          <MaskText as="span" className="block" text="문서로 남겼습니다." stagger={40} />
        </h2>
      </Reveal>

      <Scroll.Section className="relative mx-auto max-w-6xl">
        {experience.map((exp, index) => (
          <div
            key={exp.company}
            className="mb-6 md:sticky md:top-0 md:mb-0 md:flex md:h-[100dvh] md:items-center"
            style={{ paddingTop: `${index * 1.5}rem`, perspective: 1600 }}
          >
            {/* 연도 워터마크: 카드 뒤에서 반대 방향으로 흐른다 */}
            <Scroll.Item
              className="pointer-events-none absolute right-0 top-[8vh] hidden md:block"
              keyframes={kf((ctx) => {
                const at = stuckAt(ctx, index);
                const h = ctx.container.height;
                return {
                  [at - h]: { translateY: h * 0.5, opacity: 0 },
                  [at]: { translateY: 0, opacity: 1 },
                  [at + h]: { translateY: -h * 0.3, opacity: 0 },
                };
              })}
            >
              <span className="text-[22vw] font-semibold leading-none tracking-[-0.06em] text-[#111113]">
                {years[index]}
              </span>
            </Scroll.Item>

            <Scroll.Item
              className="w-full"
              style={{ transformOrigin: "50% 100%" }}
              keyframes={kf((ctx) => {
                if (ctx.container.width < 768) return {};
                const at = stuckAt(ctx, index);
                const h = ctx.container.height;
                const range = pushBackRange(ctx, index, count);
                return {
                  [at - h * 0.9]: { rotateX: 18, scale: 0.94, translateY: 80 },
                  [at]: { rotateX: 0, scale: 1, translateY: 0 },
                  ...(range
                    ? {
                        [range.from]: { rotateX: 0, scale: 1, translateY: 0 },
                        [range.to]: { rotateX: 0, scale: 0.9, translateY: -30 },
                      }
                    : {}),
                };
              })}
            >
              <article className="relative overflow-hidden rounded-[18px] bg-apple-card p-7 md:p-14">
                {/* 투명도 대신 검은 막을 덮어 어둡게 해야 뒤 카드가 비치지 않는다 */}
                <Scroll.Item
                  className="pointer-events-none absolute inset-0 z-10 bg-black"
                  keyframes={kf((ctx) => {
                    const range = pushBackRange(ctx, index, count);
                    if (!range) return { 0: { opacity: 0 } };
                    return {
                      [range.from]: { opacity: 0 },
                      [range.to]: { opacity: 0.65 },
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
                  {exp.details.map((detail, detailIndex) => (
                    <Scroll.Item
                      key={detail}
                      keyframes={kf((ctx) => {
                        if (ctx.container.width < 768) return {};
                        const at = stuckAt(ctx, index);
                        const h = ctx.container.height;
                        const delay = detailIndex * h * 0.06;
                        return {
                          [at - h * 0.5 + delay]: { opacity: 0, translateY: 30 },
                          [at - h * 0.1 + delay]: { opacity: 1, translateY: 0 },
                        };
                      })}
                    >
                      <li className="border-t border-white/10 pt-4 text-[14px] leading-relaxed text-apple-gray md:text-[15px]">
                        {detail}
                      </li>
                    </Scroll.Item>
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
