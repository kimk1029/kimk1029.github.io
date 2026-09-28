"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Scroll, useScrollValue } from "scrollex";
import { prefersReducedMotion, useVelocitySkew } from "../scroll-utils";

const rows: { items: string[]; direction: 1 | -1; className: string }[] = [
  {
    items: ["3년 Web3 프론트엔드", "Lighthouse 20% 개선", "데이터 페칭 34% 개선"],
    direction: -1,
    className: "text-apple-white",
  },
  {
    items: ["UI 반복 4~5회 → 1~2회", "6종 진행 · 5종 출시", "Claude Code · MCP · Harness"],
    direction: 1,
    className: "text-[#3a3a3c]",
  },
  {
    items: ["지갑 익스텐션", "DEX Swap · Pool · Stake", "Smart Contract", "디자인 시스템", "React Native 출시"],
    direction: -1,
    className: "text-apple-white",
  },
];

// 항상 흐르고, 스크롤을 빠르게 하면 그 속도만큼 더 빨라진다.
const Row = ({ items, direction, className }: (typeof rows)[number]) => {
  const copyRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const velocity = useScrollValue(({ velocity }) => velocity);

  useAnimationFrame((_, delta) => {
    const width = copyRef.current?.offsetWidth ?? 0;
    if (!width || prefersReducedMotion()) return;
    const boost = Math.abs(velocity.get() ?? 0) * 0.35;
    const next = x.get() + ((70 + boost) * direction * delta) / 1000;
    // 한 벌 너비 안에서 순환시켜 끊김 없이 이어지게 한다
    x.set((((next % width) + width) % width) - width);
  });

  const line = `${items.join("  ·  ")}  ·  `;

  return (
    <motion.div style={{ x }} className="flex whitespace-nowrap will-change-transform">
      {[0, 1, 2].map((copy) => (
        <span
          key={copy}
          ref={copy === 0 ? copyRef : undefined}
          className={`text-[4.5rem] font-semibold leading-[1.1] tracking-[-0.04em] md:text-[8.5rem] ${className}`}
        >
          {line}
        </span>
      ))}
    </motion.div>
  );
};

const Rows = () => {
  const skewX = useVelocitySkew(10, "x");
  return (
    <motion.div style={{ skewX }} className="flex flex-col gap-2 md:gap-4">
      {rows.map((row) => (
        <Row key={row.items[0]} {...row} />
      ))}
    </motion.div>
  );
};

export default function Marquee() {
  return (
    <Scroll.Section className="overflow-hidden bg-black py-24 md:py-40">
      <Rows />
    </Scroll.Section>
  );
}
