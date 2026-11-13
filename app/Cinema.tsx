"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { useTier } from "./perf-tier";

const VERT = "attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }";

// Runs one full-screen fragment shader, driven by scroll progress. Raw WebGL: a single
// triangle and five uniforms don't need three.js. Draws only while on screen, at a capped
// pixel count, because a full-screen ray shader is the most expensive thing on the page.
export function ShaderScene({
  frag,
  progress,
  center,
  steps = 72,
  className = "",
}: {
  frag: string;
  progress: MotionValue<number>;
  center?: MotionValue<{ x: number; y: number }>; // 0..1 of the canvas, y down
  steps?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const tier = useTier();

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const gl = c.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return; // the CSS fallback behind the canvas stays visible

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    const prog = gl.createProgram()!;
    if (!vs || !fs) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uP = u("uP");
    const uCenter = u("uCenter");
    const uSteps = u("uSteps");
    c.style.opacity = "1";

    const low = tier === "low";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxPixels = low ? 240_000 : 720_000;
    const frameGap = low ? 1000 / 30 : 0;

    const resize = () => {
      const w = c.clientWidth;
      const h = c.clientHeight;
      const s = Math.min(1, Math.sqrt(maxPixels / Math.max(1, w * h)));
      c.width = Math.max(1, Math.round(w * s));
      c.height = Math.max(1, Math.round(h * s));
      gl.viewport(0, 0, c.width, c.height);
    };

    const paint = (time: number) => {
      const ctr = center?.get() ?? { x: 0.5, y: 0.5 };
      gl.uniform2f(uRes, c.width, c.height);
      gl.uniform1f(uTime, reduce ? 0 : time / 1000);
      gl.uniform1f(uP, progress.get());
      gl.uniform2f(uCenter, ctr.x, 1 - ctr.y);
      gl.uniform1f(uSteps, low ? Math.round(steps * 0.6) : steps);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let visible = false;
    let last = 0;
    const tick = (time: number) => {
      if (visible && !reduce) raf = requestAnimationFrame(tick);
      if (time - last < frameGap) return;
      last = time;
      paint(time);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      paint(performance.now());
    });
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(c);
    // With reduced motion there is no loop, so repaint when the scroll position changes.
    const off = reduce ? progress.on("change", () => visible && paint(0)) : undefined;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      off?.();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [frag, progress, center, steps, tier]);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 h-full w-full opacity-0 ${className}`} />;
}

// Cinema bars that close in at the start of a pinned scene and open at the end.
export function Letterbox({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 0.06, 0.94, 1], [0, 1, 1, 0]);
  return (
    <>
      <motion.div aria-hidden style={{ scaleY, willChange: "transform" }} className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[9vh] origin-top bg-black" />
      <motion.div aria-hidden style={{ scaleY, willChange: "transform" }} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[9vh] origin-bottom bg-black" />
    </>
  );
}

// One line of narration, visible between `from` and `to` of the scene's progress.
export function SceneLine({
  progress,
  from,
  to,
  className = "",
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  className?: string;
  children: React.ReactNode;
}) {
  const fade = Math.min(0.04, (to - from) / 3);
  const opacity = useTransform(progress, [from, from + fade, to - fade, to], [0, 1, 1, 0]);
  const y = useTransform(progress, [from, from + fade, to - fade, to], [36, 0, 0, -36]);
  return (
    <motion.div style={{ opacity, y, willChange: "transform, opacity" }} className={`absolute inset-0 grid place-items-center px-6 text-center ${className}`}>
      <div>{children}</div>
    </motion.div>
  );
}
