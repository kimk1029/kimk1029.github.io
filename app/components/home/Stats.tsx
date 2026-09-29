"use client";

import { motion, useTransform } from "framer-motion";
import { Scroll, useScrollValue } from "scrollex";
import { clamp, CountUp, kf, pinRange, prefersReducedMotion, usePinProgress } from "../scroll-utils";

const stats = [
  { to: 9, suffix: "년+", label: "React · Next.js 프론트엔드 경력" },
  { to: 5, suffix: "종", label: "AI 네이티브 워크플로우로 단독 출시한 프로덕트" },
  { to: 34, suffix: "%", label: "SWR + Zustand 재구성으로 줄인 메인 데이터 페칭" },
  { to: 20, suffix: "%", label: "SWR 도입 후 끌어올린 Lighthouse 점수" },
];

const segment = 1 / stats.length;
const RADIUS = 46;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// 화면 중앙의 큰 원이 각 숫자 구간마다 다시 그려진다
const ProgressRing = () => {
  const progress = usePinProgress();
  const local = useTransform(progress, (p) => clamp((p % segment) / segment));
  const dashOffset = useTransform(local, (t) => CIRCUMFERENCE * (1 - t));
  const rotate = useTransform(progress, (p) => p * 360);

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute h-[92vmin] w-[92vmin]"
      style={{ rotate }}
    >
      <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
      <motion.circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        style={{ strokeDashoffset: dashOffset }}
        transform="rotate(-90 50 50)"
      />
    </motion.svg>
  );
};

const StatSlide = ({ index }: { index: number }) => {
  const stat = stats[index];
  const isLast = index === stats.length - 1;
  // 숫자는 각 구간의 앞 40% 동안 0에서 목표값까지 올라간다.
  // 첫 번째는 섹션이 화면에 들어오는 동안부터 세기 시작해 고정될 때 이미 다 차 있게 한다.
  const raw = useScrollValue(({ section, container, position }) => {
    if (prefersReducedMotion()) return 1;
    const pin = pinRange({ section });
    const lead = index === 0 ? container.height : 0;
    const start = pin.at(index * segment) - lead;
    const length = (pin.end - pin.start) * segment * 0.4 + lead;
    return clamp((position - start) / length);
  });
  const count = useTransform(raw, (value) => value ?? 0);

  return (
    <Scroll.Item
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ transformOrigin: "50% 60%" }}
      keyframes={kf((ctx) => {
        const pin = pinRange(ctx);
        const start = index * segment;
        const end = start + segment;
        return {
          [pin.at(start)]: {
            opacity: index === 0 ? 1 : 0,
            rotateX: index === 0 ? 0 : -80,
            translateY: index === 0 ? 0 : 120,
            scale: index === 0 ? 1 : 0.7,
          },
          [pin.at(start + segment * 0.28)]: { opacity: 1, rotateX: 0, translateY: 0, scale: 1 },
          [pin.at(end - segment * 0.2)]: { opacity: 1, rotateX: 0, translateY: 0, scale: 1 },
          [pin.at(end)]: isLast
            ? { opacity: 1, rotateX: 0, translateY: 0, scale: 1 }
            : { opacity: 0, rotateX: 60, translateY: -140, scale: 1.3 },
        };
      })}
    >
      <CountUp
        to={stat.to}
        suffix={stat.suffix}
        progress={count}
        className="shimmer text-[34vw] font-semibold leading-none tracking-[-0.05em] tabular-nums md:text-[15rem]"
      />
      <p className="mt-6 max-w-xl text-xl font-semibold text-apple-gray md:text-[28px] md:leading-snug">
        {stat.label}
      </p>
    </Scroll.Item>
  );
};

export default function Stats() {
  return (
    <Scroll.Section className="relative h-[460vh] bg-black">
      <div
        className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        <ProgressRing />
        <p className="absolute top-[14vh] text-lg font-semibold text-apple-gray md:text-2xl">
          숫자로 보면.
        </p>

        {stats.map((stat, index) => (
          <StatSlide key={stat.label} index={index} />
        ))}

        <div className="absolute bottom-[12vh] flex gap-2">
          {stats.map((stat, index) => (
            <Scroll.Item
              key={stat.label}
              className="h-[3px] w-8 origin-left bg-apple-white"
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                const start = index * segment;
                return {
                  [pin.at(start)]: { opacity: 0.2, scaleX: 0.4 },
                  [pin.at(start + 0.03)]: { opacity: 1, scaleX: 1 },
                  [pin.at(start + segment - 0.02)]: { opacity: 1, scaleX: 1 },
                  [pin.at(start + segment)]: {
                    opacity: index === stats.length - 1 ? 1 : 0.2,
                    scaleX: index === stats.length - 1 ? 1 : 0.4,
                  },
                };
              })}
            />
          ))}
        </div>
      </div>
    </Scroll.Section>
  );
}
