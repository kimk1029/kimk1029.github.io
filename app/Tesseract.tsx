"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Letterbox, ShaderScene } from "./Cinema";
import { TESSERACT } from "./shaders";

const kicker = "font-mono text-xs uppercase tracking-[0.3em] text-[#ffb347] md:text-sm";
const big = "mt-4 font-hangul text-[clamp(2.2rem,6.5vw,6rem)] leading-[1.12] text-pad [text-shadow:0_2px_30px_rgba(5,6,10,0.95)]";
const sub = "mx-auto mt-5 max-w-[34ch] text-lg leading-relaxed text-pad/90 [text-shadow:0_1px_16px_rgba(5,6,10,1)] md:text-2xl";

// Each year hangs somewhere different in the lattice and faces a different way.
const YEARS = [
  { y: "2016", x: "-22vw", top: "-12vh", turn: 38 },
  { y: "2018", x: "20vw", top: "14vh", turn: -34 },
  { y: "2020", x: "-12vw", top: "16vh", turn: 26 },
  { y: "2022", x: "24vw", top: "-14vh", turn: -40 },
  { y: "2024", x: "-20vw", top: "2vh", turn: 32 },
  { y: "2026", x: "0vw", top: "0vh", turn: 0 },
];

// A year starts far down the corridor, flies toward the camera and passes through it.
function Year({ item, i, progress }: { item: (typeof YEARS)[number]; i: number; progress: MotionValue<number> }) {
  const from = 0.26 + i * 0.07;
  const to = from + 0.2;
  const z = useTransform(progress, [from, to], [-3200, 900]);
  const opacity = useTransform(progress, [from, from + 0.04, to - 0.04, to], [0, 1, 1, 0]);
  return (
    <motion.span
      aria-hidden
      style={{ z, opacity, x: item.x, y: item.top, rotateY: item.turn, willChange: "transform, opacity" }}
      className="tabular absolute font-display text-[clamp(6rem,20vw,18rem)] font-black leading-none text-pad [text-shadow:0_0_60px_rgba(255,179,71,0.6)]"
    >
      {item.y}
    </motion.span>
  );
}

// A panel of narration that swings in from deep in the scene, faces us, then passes behind.
function Panel({ progress, from, to, turn, children }: { progress: MotionValue<number>; from: number; to: number; turn: number; children: React.ReactNode }) {
  const span = [from, from + 0.07, to - 0.07, to];
  const z = useTransform(progress, span, [-1400, 0, 0, 700]);
  const rotateY = useTransform(progress, span, [turn, 0, 0, -turn]);
  const rotateX = useTransform(progress, span, [18, 0, 0, -14]);
  const opacity = useTransform(progress, span, [0, 1, 1, 0]);
  return (
    <motion.div style={{ z, rotateY, rotateX, opacity, willChange: "transform, opacity" }} className="absolute px-6 text-center">
      {/* Dark plate behind the words; the lattice is busy. */}
      <div aria-hidden className="absolute -inset-x-28 -inset-y-20 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_45%,transparent_72%)]" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// Act IV: inside the black hole, time is laid out like shelves in every direction.
// The shader flies the camera through that lattice; the narration and the years live in the
// same space as CSS 3D, sharing the camera's lean, so the page feels threaded through it.
export default function Tesseract({ total }: { total: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The whole 3D stage leans with the pointer, the same way the shader's camera does.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const leanY = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 60, damping: 18 });
  const leanX = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 60, damping: 18 });
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);
  // And it slowly rolls with the camera as we travel.
  const roll = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-5, 5]);

  return (
    <section ref={ref} data-act="ACT IV · 테서랙트" className="relative -mt-px h-[520vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#7a3a0c_0%,#1a0d05_30%,#000_62%)]">
        <ShaderScene frag={TESSERACT} progress={scrollYProgress} steps={72} />
        <Letterbox progress={scrollYProgress} />
        <div className="absolute inset-0 z-10" style={{ perspective: 900 }}>
          <motion.div style={{ rotateX: leanX, rotateY: leanY, rotateZ: roll, transformStyle: "preserve-3d" }} className="grid h-full w-full place-items-center">
            <Panel progress={scrollYProgress} from={0.05} to={0.27} turn={55}>
              <p className={kicker}>Act IV — Tesseract</p>
              <h2 className={big}>지평선 안쪽,<br />시간이 책장이 됩니다.</h2>
            </Panel>
            {YEARS.map((item, i) => (
              <Year key={item.y} item={item} i={i} progress={scrollYProgress} />
            ))}
            <Panel progress={scrollYProgress} from={0.78} to={0.985} turn={-55}>
              <p className={kicker}>{total}</p>
              <h2 className={big}>모든 기록이<br />여기 꽂혀 있습니다.</h2>
              <p className={sub}>배경, 행동, 결과 순서로 하나씩 꺼내 보겠습니다.</p>
            </Panel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
