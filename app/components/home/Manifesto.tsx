"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Scroll } from "scrollex";
import { kf, pinRange, usePinProgress, useVelocitySkew } from "../scroll-utils";

const manifesto =
  "9년 동안 사람들이 매일 쓰는 화면을 만들었습니다. 실리콘밸리 Trumpia에서는 데이터 대시보드를, 네오위즈 Neopin에서는 지갑과 DEX를. 그리고 지금은 AI 에이전트와 함께, 혼자서 프로덕트를 출시하고 운영합니다.";

const years = ["2016", "2020", "2024", "2026"];

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [14, 0]);
  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {word}&nbsp;
    </motion.span>
  );
};

const ManifestoText = () => {
  const words = manifesto.split(" ");
  const progress = usePinProgress();
  const skewY = useVelocitySkew(4);

  return (
    <motion.p
      style={{ skewY }}
      className="relative mx-auto max-w-5xl text-[2rem] font-semibold leading-[1.25] tracking-[-0.02em] text-apple-white md:text-[3.5rem] md:leading-[1.2]"
    >
      {words.map((word, index) => {
        const start = 0.08 + (index / words.length) * 0.78;
        return (
          <Word
            key={`${word}-${index}`}
            word={word}
            progress={progress}
            range={[start, start + 0.78 / words.length + 0.04]}
          />
        );
      })}
    </motion.p>
  );
};

export default function Manifesto() {
  return (
    <Scroll.Section className="relative h-[320vh] bg-black">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden px-6">
        {/* 배경: 연도가 거대한 글자로 옆으로 흘러간다 */}
        <Scroll.Item
          className="pointer-events-none absolute left-0 top-1/2 flex -translate-y-1/2 whitespace-nowrap"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0)]: { translateX: "10vw" },
              [pin.at(1)]: { translateX: "-120vw" },
            };
          })}
        >
          {years.map((year) => (
            <span
              key={year}
              className="mr-[12vw] text-[46vw] font-semibold leading-none tracking-[-0.06em] text-[#141416] md:text-[40vw]"
            >
              {year}
            </span>
          ))}
        </Scroll.Item>
        <ManifestoText />
      </div>
    </Scroll.Section>
  );
}
