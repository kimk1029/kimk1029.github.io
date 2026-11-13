"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Letterbox, SceneLine, ShaderScene } from "./Cinema";
import { TESSERACT } from "./shaders";

const kicker = "font-mono text-xs uppercase tracking-[0.3em] text-[#ffb347] md:text-sm";
const big = "mt-4 font-hangul text-[clamp(2.2rem,6.5vw,6rem)] leading-[1.12] text-pad [text-shadow:0_2px_30px_rgba(5,6,10,0.95)]";
const sub = "mx-auto mt-5 max-w-[34ch] text-lg leading-relaxed text-pad/90 [text-shadow:0_1px_16px_rgba(5,6,10,1)] md:text-2xl";

const YEARS = ["2016", "2018", "2020", "2022", "2024", "2026"];

// Act IV: inside the black hole, time is laid out like shelves. Every year of the career
// is a spine on the wall, and the mission log that follows pulls them out one by one.
export default function Tesseract({ total }: { total: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const yearsX = useTransform(scrollYProgress, [0.3, 0.72], ["60%", "-110%"]);
  const yearsOpacity = useTransform(scrollYProgress, [0.3, 0.36, 0.66, 0.72], [0, 1, 1, 0]);

  return (
    <section ref={ref} data-act="ACT IV · 테서랙트" className="relative h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#ffb347_0%,#7a3a0c_22%,#05060a_62%)]">
        <ShaderScene frag={TESSERACT} progress={scrollYProgress} steps={1} />
        {/* Darkens the middle so the narration stays readable against the shelves. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,6,10,0.78)_0%,rgba(5,6,10,0.4)_42%,transparent_72%)]" />
        <Letterbox progress={scrollYProgress} />
        <div className="relative z-10 h-full">
          <SceneLine progress={scrollYProgress} from={0.04} to={0.28}>
            <p className={kicker}>Act IV — Tesseract</p>
            <h2 className={big}>사건의 지평선 안쪽,<br />시간이 책장이 됩니다.</h2>
          </SceneLine>
          {/* The years of the career fly past along the corridor. */}
          <motion.div aria-hidden style={{ x: yearsX, opacity: yearsOpacity, willChange: "transform, opacity" }} className="absolute inset-y-0 left-0 flex items-center gap-[10vw] whitespace-nowrap">
            {YEARS.map((y) => (
              <span key={y} className="tabular font-display text-[clamp(7rem,24vw,22rem)] font-black leading-none text-pad [text-shadow:0_0_60px_rgba(255,179,71,0.55)]">
                {y}
              </span>
            ))}
          </motion.div>
          <SceneLine progress={scrollYProgress} from={0.74} to={0.96}>
            <p className={kicker}>{total}</p>
            <h2 className={big}>모든 기록이<br />여기 꽂혀 있습니다.</h2>
            <p className={sub}>배경, 행동, 결과 순서로 하나씩 꺼내 보겠습니다.</p>
          </SceneLine>
        </div>
      </div>
    </section>
  );
}
