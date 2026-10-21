"use client";

import { useEffect, useRef } from "react";
import { useTier } from "./perf-tier";

// Three depth layers of stars; nearer layers drift faster with scroll.
const LAYERS = [
  { count: 260, speed: 0.08, size: 0.8, alpha: 0.55 },
  { count: 120, speed: 0.22, size: 1.3, alpha: 0.8 },
  { count: 40, speed: 0.5, size: 2, alpha: 1 },
];

export default function Starfield() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const tier = useTier();

  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const low = tier === "low";
    // 1–2px squares don't need a 2x canvas, and this one is full-screen and always on.
    const dpr = 1;
    // Twinkle at 30fps; on weak devices also thin the field.
    const frameGap = 1000 / 30;
    const scaleCount = low ? 0.5 : 1;
    let w = 0;
    let h = 0;
    let raf = 0;
    let lastTime = 0;
    const stars = LAYERS.flatMap((l) =>
      Array.from({ length: Math.round(l.count * scaleCount) }, () => ({ x: Math.random(), y: Math.random(), t: Math.random() * 6.28, l })),
    );

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      ctx.fillStyle = "#f2f1ec";
      for (const s of stars) {
        const y = (((s.y * h - sy * s.l.speed) % h) + h) % h;
        const twinkle = reduce ? 1 : 0.6 + 0.4 * Math.sin(time / 900 + s.t);
        ctx.globalAlpha = s.l.alpha * twinkle;
        ctx.fillRect(s.x * w, y, s.l.size, s.l.size);
      }
    };

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - lastTime < frameGap) return;
      lastTime = time;
      paint(time);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (!reduce && !document.hidden) raf = requestAnimationFrame(draw);
    };

    resize();
    paint(0);
    start();
    const onScroll = () => reduce && paint(0);
    const onVisibility = () => (document.hidden ? cancelAnimationFrame(raf) : start());
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [tier]);

  return (
    <>
      <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 bg-vacuum [background-image:radial-gradient(60vw_40vw_at_85%_10%,rgba(29,63,191,0.28),transparent_70%),radial-gradient(50vw_40vw_at_5%_70%,rgba(120,40,160,0.22),transparent_70%),radial-gradient(40vw_30vw_at_70%_95%,rgba(212,41,26,0.16),transparent_70%)]"
      />
    </>
  );
}
