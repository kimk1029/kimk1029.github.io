"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { Letterbox, SceneLine, ShaderScene } from "./Cinema";
import { WORMHOLE } from "./shaders";

const kicker = "font-mono text-xs uppercase tracking-[0.3em] text-[#ff8a78] md:text-sm";
const big = "mt-4 font-hangul text-[clamp(2.2rem,6.5vw,6rem)] leading-[1.12] text-pad [text-shadow:0_2px_30px_rgba(5,6,10,0.9)]";
const sub = "mx-auto mt-5 max-w-[34ch] text-lg leading-relaxed text-pad/85 [text-shadow:0_1px_16px_rgba(5,6,10,1)] md:text-2xl";

// Act II: the career jumps galaxies. A lensing sphere grows, we fall through the tunnel, and come out the far side.
export default function Wormhole() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} data-act="ACT II · 웜홀" className="relative h-[520vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#1d3fbf_0%,#0a1240_35%,#05060a_70%)]">
        <ShaderScene frag={WORMHOLE} progress={scrollYProgress} steps={1} />
        <Letterbox progress={scrollYProgress} />
        <div className="relative z-10 h-full">
          <SceneLine progress={scrollYProgress} from={0.03} to={0.22}>
            <p className={kicker}>Act II — Wormhole</p>
            <h2 className={big}>토성 궤도 너머,<br />웜홀이 열렸습니다.</h2>
            <p className={sub}>한 은하에 머무르는 경력이 아니었습니다.</p>
          </SceneLine>
          <SceneLine progress={scrollYProgress} from={0.24} to={0.42}>
            <p className={kicker}>2016 — Trumpia</p>
            <h2 className={big}>첫 번째 은하,<br />풀스택.</h2>
            <p className={sub}>실리콘밸리 B2B 메시징 서비스에서 데이터 대시보드와 레거시 전환을 맡았습니다.</p>
          </SceneLine>
          <SceneLine progress={scrollYProgress} from={0.46} to={0.64}>
            <p className={kicker}>2020 — NEOWIZ Neopin</p>
            <h2 className={big}>Web2에서<br />Web3로.</h2>
            <p className={sub}>지갑 익스텐션, DEX, 디자인 시스템. 레퍼런스가 없는 곳을 통과했습니다.</p>
          </SceneLine>
          <SceneLine progress={scrollYProgress} from={0.68} to={0.88}>
            <p className={kicker}>2025 — Independent</p>
            <h2 className={big}>그리고<br />AI의 은하로.</h2>
            <p className={sub}>에이전트와 함께 6종을 만들어 5종을 출시했습니다.</p>
          </SceneLine>
        </div>
      </div>
    </section>
  );
}
