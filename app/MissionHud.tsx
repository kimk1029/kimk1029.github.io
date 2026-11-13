"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CAREER_MONTHS = 104; // 8 years 8 months

// Bottom-left readout: which act is on screen, and a mission clock that runs
// from T+0 to the full length of the career as the page is scrolled.
export default function MissionHud() {
  const [act, setAct] = useState("");
  const { scrollYProgress } = useScroll();
  const clock = useTransform(scrollYProgress, (v) => {
    const m = Math.round(Math.min(1, Math.max(0, v)) * CAREER_MONTHS);
    return `T+ ${String(Math.floor(m / 12)).padStart(2, "0")}Y ${String(m % 12).padStart(2, "0")}M`;
  });

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-act]"));
    // A thin band across the middle of the viewport decides which act is "current".
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setAct((e.target as HTMLElement).dataset.act ?? "");
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-4 left-4 z-40 hidden font-mono text-[11px] uppercase tracking-[0.18em] text-pad/80 mix-blend-difference md:block">
      <motion.p key={act} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {act}
      </motion.p>
      <motion.p className="tabular mt-1 text-pad/60">{clock}</motion.p>
    </div>
  );
}
