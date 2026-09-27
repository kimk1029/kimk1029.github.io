"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Scroll, useScrollValue } from "scrollex";
import { pinRange, prefersReducedMotion } from "../scroll-utils";

const manifesto =
  "9년 동안 사람들이 매일 쓰는 화면을 만들었습니다. 실리콘밸리 Trumpia에서는 데이터 대시보드를, 네오위즈 Neopin에서는 지갑과 DEX를. 그리고 지금은 AI 에이전트와 함께, 혼자서 프로덕트를 출시하고 운영합니다.";

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
};

const ManifestoText = () => {
  const words = manifesto.split(" ");
  const raw = useScrollValue(({ section, position }) =>
    prefersReducedMotion() ? 1 : pinRange({ section }).progress(position)
  );
  const progress = useTransform(raw, (value) => value ?? 0);

  return (
    <p className="mx-auto max-w-5xl text-[2rem] font-bold leading-[1.25] tracking-tight text-apple-white md:text-6xl md:leading-[1.15]">
      {words.map((word, index) => {
        const start = 0.08 + (index / words.length) * 0.8;
        return (
          <Word
            key={`${word}-${index}`}
            word={word}
            progress={progress}
            range={[start, start + 0.8 / words.length + 0.04]}
          />
        );
      })}
    </p>
  );
};

export default function Manifesto() {
  return (
    <Scroll.Section className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center px-6">
        <ManifestoText />
      </div>
    </Scroll.Section>
  );
}
