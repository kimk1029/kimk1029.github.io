"use client";

import type { RefObject } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { personalInfo } from "@/app/data";

const navItems = [
  ["Intro", "intro"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

// Scroll.Container가 자체 스크롤 영역이라 앵커 이동도 해당 컨테이너 안에서 처리한다.
const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function SiteNav({ containerRef }: { containerRef: RefObject<HTMLDivElement> }) {
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-black/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
        <button
          onClick={() => scrollToSection("intro")}
          className="text-sm font-semibold tracking-tight text-apple-white"
        >
          Kyu-hyun Kim
        </button>
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-xs text-apple-white/80 transition-colors hover:text-apple-white"
            >
              {label}
            </button>
          ))}
        </nav>
        <a
          href={`mailto:${personalInfo.email}`}
          className="rounded-full bg-apple-blue px-3 py-1 text-xs text-white"
        >
          연락하기
        </a>
      </div>
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-apple-white/60"
      />
    </header>
  );
}
