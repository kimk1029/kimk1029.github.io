"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Scroll-driven hyperspace jump between the hero and the briefing:
// stars stream out of the centre, stretch into streaks as you scroll, then flash.
export default function Warp() {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const label = useTransform(scrollYProgress, [0.35, 0.55, 0.75, 0.88], [0, 1, 1, 0]);
  const labelScale = useTransform(scrollYProgress, [0.35, 0.88], [0.9, 1.15]);
  const flash = useTransform(scrollYProgress, [0.78, 0.9], [0, 1]);
  // After the flash the whole jump dissolves, so the briefing's own sky shows through without a seam.
  const fade = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const stars = Array.from({ length: 700 }, () => ({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() }));

    const resize = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const p = scrollYProgress.get();
      const speed = reduce ? 0 : 0.0015 + p * p * 0.06;
      const cx = w / 2;
      const cy = h / 2;
      const f = Math.max(w, h) * 0.5;
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
        // Tail drawn from where the star would have been a few frames back, so streaks grow with speed.
        const tail = Math.min(1, z0 + speed * 6);
        const x1 = cx + (s.x / s.z) * f * 0.5;
        const y1 = cy + (s.y / s.z) * f * 0.5;
        const x0 = cx + (s.x / tail) * f * 0.5;
        const y0 = cy + (s.y / tail) * f * 0.5;
        const a = Math.min(1, (1 - s.z) * 1.4);
        ctx.strokeStyle = p > 0.6 ? `rgba(255,${200 - (p - 0.6) * 150},${170 - (p - 0.6) * 250},${a})` : `rgba(242,241,236,${a})`;
        ctx.lineWidth = (1 - s.z) * 2.4 + 0.3;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1 + 0.01, y1);
        ctx.stroke();
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
    <section ref={ref} aria-hidden className="relative h-[220vh]">
      <motion.div style={{ opacity: fade }} className="sticky top-0 h-screen overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <motion.p style={{ opacity: label, scale: labelScale }} className="absolute inset-0 grid place-items-center font-display text-[clamp(2.5rem,8vw,7rem)] font-black uppercase tracking-[0.2em] text-pad">
          궤도 진입
        </motion.p>
        <motion.div style={{ opacity: flash }} className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#fff7e6_0%,#ffd9a8_35%,#05060a_85%)]" />
      </motion.div>
    </section>
  );
}
