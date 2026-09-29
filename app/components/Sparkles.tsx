"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  drift: number;
};

// 4각 별 모양 파티클이 저마다의 리듬으로 반짝이며 천천히 떠오른다. 화면 밖이면 멈춘다.
export const Sparkles = ({
  count = 70,
  color = "255, 255, 255",
  className,
}: {
  count?: number;
  color?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = false;

    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 1.2 + Math.random() * 3.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.6,
      drift: 0.004 + Math.random() * 0.012,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawStar = (x: number, y: number, size: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.quadraticCurveTo(x, y, x + size, y);
      ctx.quadraticCurveTo(x, y, x, y + size);
      ctx.quadraticCurveTo(x, y, x - size, y);
      ctx.quadraticCurveTo(x, y, x, y - size);
      ctx.fill();
    };

    const frame = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgb(${color})`;
      for (const star of stars) {
        const twinkle = reduced
          ? 0.5
          : Math.pow((Math.sin((time / 1000) * star.speed + star.phase) + 1) / 2, 3);
        if (!reduced) {
          star.y -= star.drift / 60;
          if (star.y < -0.02) {
            star.y = 1.02;
            star.x = Math.random();
          }
        }
        drawStar(star.x * width, star.y * height, star.size * (0.5 + twinkle * 0.7), twinkle);
      }
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduced) start();
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersection.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersection.disconnect();
    };
  }, [count, color]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className ?? ""}`} />;
};
