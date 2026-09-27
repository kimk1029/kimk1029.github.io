"use client";

import { useRef } from "react";
import { Scroll } from "scrollex";
import Capabilities from "./components/home/Capabilities";
import Finale, { Leadership } from "./components/home/Finale";
import Hero from "./components/home/Hero";
import Manifesto from "./components/home/Manifesto";
import Marquee from "./components/home/Marquee";
import Projects from "./components/home/Projects";
import SiteNav from "./components/home/SiteNav";
import Skills from "./components/home/Skills";
import Stats from "./components/home/Stats";
import Work from "./components/home/Work";

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-black text-apple-white selection:bg-apple-blue selection:text-white">
      <SiteNav containerRef={containerRef} />
      <Scroll.Container ref={containerRef} scrollAxis="y" className="h-[100dvh]">
        <Hero />
        <Manifesto />
        <Stats />
        <Capabilities />
        <Skills />
        <Work />
        <Marquee />
        <Projects />
        <Leadership />
        <Finale />
      </Scroll.Container>
    </main>
  );
}
