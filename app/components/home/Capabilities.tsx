"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Scroll, useScrollValue } from "scrollex";
import { kf, pinRange, prefersReducedMotion } from "../scroll-utils";

const capabilities = [
  {
    title: "Web3 프로덕트를 끝까지 책임집니다.",
    body: "네오위즈 Neopin에서 지갑 익스텐션, DEX(Swap/Pool/Stake), Smart Contract 연동을 3년간 담당하며 블록체인 프론트엔드 전 영역을 실무로 다뤘습니다.",
  },
  {
    title: "AI를 기능이 아니라 작업 흐름으로 다룹니다.",
    body: "Claude Code, MCP 서버 연동, Agent Skills, Agent Harness, 간이 Eval을 실제 프로덕트 개발에 붙여 PR 단위 작업과 반복 파싱 작업을 맡겼고, 그 워크플로우로 5종을 출시했습니다.",
  },
  {
    title: "프론트엔드를 협업 인터페이스로 봅니다.",
    body: "Neopin에서 디자인 시스템과 스타일 가이드를 만들고, 기획·디자인·개발 간 반복 비용을 줄이는 프로세스를 문서화했습니다.",
  },
  {
    title: "끝까지 굴러가는 제품을 만듭니다.",
    body: "Next.js, Flutter, React Native, NestJS, Supabase, Docker를 오가며 시세 데이터 파이프라인, Stage 서버 구축, 앱스토어 출시, 마케팅 섭외까지 직접 진행했습니다.",
  },
];

const Track = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      distance.current = Math.max(0, track.scrollWidth - window.innerWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const raw = useScrollValue(({ section, position }) =>
    prefersReducedMotion() ? 0 : pinRange({ section }).progress(position)
  );
  const progress = useSpring(
    useTransform(raw, (value) => value ?? 0),
    { stiffness: 120, damping: 24, mass: 0.3 }
  );
  const x = useTransform(progress, (value) => -value * distance.current);

  return (
    <motion.div
      ref={trackRef}
      style={{ x }}
      className="flex w-max px-6 motion-reduce:w-full motion-reduce:flex-col md:px-[8vw] motion-reduce:md:flex-row motion-reduce:md:flex-wrap"
    >
      {capabilities.map((item, index) => (
        <article
          key={item.title}
          className="flex h-[52vh] w-[80vw] flex-none flex-col justify-between border-l border-apple-line py-2 pl-6 pr-10 motion-reduce:h-auto motion-reduce:py-10 sm:w-[56vw] md:pl-10 md:pr-16 lg:w-[34vw]"
        >
          <span className="text-[5rem] font-semibold leading-none tracking-[-0.04em] text-apple-line md:text-[7rem]">
            {index + 1}
          </span>
          <div>
            <h3 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-apple-ink md:text-[40px]">
              {item.title}
            </h3>
            <p className="mt-5 text-[17px] leading-relaxed text-apple-dim">{item.body}</p>
          </div>
        </article>
      ))}
    </motion.div>
  );
};

export default function Capabilities() {
  return (
    <Scroll.Section id="skills" className="relative h-[400vh] bg-apple-white motion-reduce:h-auto">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center gap-14 overflow-hidden motion-reduce:relative motion-reduce:h-auto motion-reduce:py-32">
        <Scroll.Item
          className="px-6 md:px-[8vw]"
          keyframes={kf(({ section, container }) => ({
            [section.topAt("container-bottom")]: { opacity: 0, translateY: 60 },
            [section.topAt("container-bottom") + container.height * 0.6]: {
              opacity: 1,
              translateY: 0,
            },
          }))}
        >
          <h2 className="text-[40px] font-semibold leading-tight tracking-[-0.03em] text-apple-ink md:text-[64px]">
            무엇을 잘하는가.
          </h2>
        </Scroll.Item>
        <Track />
      </div>
    </Scroll.Section>
  );
}
