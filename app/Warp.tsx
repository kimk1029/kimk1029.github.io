"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const LINES = ["AI 시대", "AI에 발맞추는 개발자가 되기 위한", "여정을 보여드립니다.", "궤도 진입!!"];
const TEXT_FROM = 0.18;
const BURST = 0.9; // the last line blows up here
const SLOT = (BURST - TEXT_FROM) / LINES.length;

function Line({ text, i, progress, last }: { text: string; i: number; progress: MotionValue<number>; last: React.RefObject<HTMLSpanElement> }) {
  const a = TEXT_FROM + i * SLOT;
  const isLast = i === LINES.length - 1;
  const opacity = useTransform(progress, isLast ? [a, a + 0.03, BURST, BURST + 0.01] : [a, a + 0.03, a + SLOT - 0.03, a + SLOT], [0, 1, 1, 0]);
  const y = useTransform(progress, [a, a + 0.03], [30, 0]);
  return (
    <motion.p style={{ opacity, y }} className="absolute inset-0 grid place-items-center px-5 text-center">
      <span ref={isLast ? last : undefined} className={`block font-hangul leading-[1.1] text-pad ${isLast ? "text-[clamp(3.5rem,11vw,10rem)]" : "text-[clamp(2.2rem,6.5vw,6rem)]"}`}>
        {text}
      </span>
    </motion.p>
  );
}

// Pins the hero, then zooms through it into hyperspace: lines change with scroll,
// the last one trembles and bursts, and the briefing planet forms out of the flash.
export default function Warp({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const last = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const heroScale = useTransform(scrollYProgress, [0.04, 0.16], [1, reduce ? 1 : 1.5]);
  const heroOpacity = useTransform(scrollYProgress, [0.04, 0.14], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0.04, 0.16], ["blur(0px)", "blur(12px)"]);
  const space = useTransform(scrollYProgress, [0.06, 0.16, 0.94, 1], [0, 1, 1, 0]);
  const flash = useTransform(scrollYProgress, [BURST - 0.01, BURST + 0.03, 1], [0, 1, 0]);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const stars = Array.from({ length: 700 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));
    const shakeFrom = TEXT_FROM + (LINES.length - 1) * SLOT + 0.03;

    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const p = scrollYProgress.get();
      const speed = reduce ? 0 : 0.0015 + Math.min(p, BURST) ** 2 * 0.07;
      const cx = w / 2;
      const cy = h / 2;
      const f = Math.max(w, h) * 0.25;
      const heat = Math.max(0, (p - 0.6) / (BURST - 0.6));
      ctx.fillStyle = "rgba(5,6,10,0.55)";
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = "round";
      for (const s of stars) {
        const z0 = s.z;
        s.z -= speed;
        if (s.z <= 0.02) {
          s.x = Math.random() * 2 - 1;
          s.y = Math.random() * 2 - 1;
          s.z = 1;
          continue;
        }
        // Tail drawn from where the star was a few frames back, so streaks grow with speed.
        const tail = Math.min(1, z0 + speed * 6);
        const a = Math.min(1, (1 - s.z) * 1.4);
        ctx.strokeStyle = heat > 0 ? `rgba(255,${242 - heat * 90},${236 - heat * 170},${a})` : `rgba(242,241,236,${a})`;
        ctx.lineWidth = (1 - s.z) * 2.4 + 0.3;
        ctx.beginPath();
        ctx.moveTo(cx + (s.x / tail) * f, cy + (s.y / tail) * f);
        ctx.lineTo(cx + (s.x / s.z) * f + 0.01, cy + (s.y / s.z) * f);
        ctx.stroke();
      }

      // The last line swells and trembles harder until it bursts.
      const t = last.current;
      if (t) {
        const k = Math.min(1, Math.max(0, (p - shakeFrom) / (BURST - shakeFrom)));
        const amp = reduce ? 0 : k * k * 16;
        t.style.transform = `translate(${(Math.random() - 0.5) * amp}px, ${(Math.random() - 0.5) * amp}px) scale(${1 + k * 0.35})`;
        t.style.textShadow = k ? `0 0 ${k * 40}px rgba(255,138,120,${k}), 0 0 ${k * 90}px rgba(255,179,71,${k * 0.8})` : "";
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(draw);
    });
    io.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce, scrollYProgress]);

  return (
    <section ref={ref} className="relative z-30 h-[700vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity, filter: heroBlur }} className="absolute inset-0">
          {children}
        </motion.div>
        <motion.div aria-hidden style={{ opacity: space }} className="pointer-events-none absolute inset-0 bg-vacuum">
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
          {LINES.map((text, i) => (
            <Line key={text} text={text} i={i} progress={scrollYProgress} last={last} />
          ))}
          <motion.div style={{ opacity: flash }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffffff_0%,#fff2d6_30%,#ffb347_60%,#05060a_100%)]" />
        </motion.div>
        <p className="sr-only">{LINES.join(" ")}</p>
      </div>
    </section>
  );
}
