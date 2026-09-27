"use client";

import { Scroll } from "scrollex";
import { kf, pinRange } from "../scroll-utils";

const stats = [
  { value: "9년+", label: "React · Next.js 프론트엔드 경력" },
  { value: "5종", label: "AI 네이티브 워크플로우로 단독 출시한 프로덕트" },
  { value: "34%", label: "SWR + Zustand 재구성으로 줄인 메인 데이터 페칭" },
  { value: "20%", label: "SWR 도입 후 끌어올린 Lighthouse 점수" },
];

export default function Stats() {
  const segment = 1 / stats.length;

  return (
    <Scroll.Section className="relative h-[420vh] bg-black">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        <p className="absolute top-[14vh] text-lg font-semibold text-apple-gray md:text-2xl">
          숫자로 보면.
        </p>

        {stats.map((stat, index) => {
          const isLast = index === stats.length - 1;
          return (
            <Scroll.Item
              key={stat.value}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                const start = index * segment;
                const end = start + segment;
                return {
                  [pin.at(start)]: { opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 0.6 },
                  [pin.at(start + segment * 0.3)]: { opacity: 1, scale: 1 },
                  [pin.at(end - segment * 0.2)]: { opacity: 1, scale: 1 },
                  [pin.at(end)]: isLast
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 1.5 },
                };
              })}
            >
              <div className="text-[34vw] font-semibold leading-none tracking-[-0.05em] text-apple-white md:text-[15rem]">
                {stat.value}
              </div>
              <p className="mt-6 max-w-xl text-xl font-semibold text-apple-gray md:text-[28px] md:leading-snug">
                {stat.label}
              </p>
            </Scroll.Item>
          );
        })}

        <div className="absolute bottom-[12vh] flex gap-2">
          {stats.map((stat, index) => (
            <Scroll.Item
              key={stat.value}
              className="h-[3px] w-8 bg-apple-white"
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                const start = index * segment;
                return {
                  [pin.at(start)]: { opacity: 0.2 },
                  [pin.at(start + 0.02)]: { opacity: 1 },
                  [pin.at(start + segment - 0.02)]: { opacity: 1 },
                  [pin.at(start + segment)]: { opacity: index === stats.length - 1 ? 1 : 0.2 },
                };
              })}
            />
          ))}
        </div>
      </div>
    </Scroll.Section>
  );
}
