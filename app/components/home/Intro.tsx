"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { Sparkles } from "../Sparkles";
import { kf, Reveal } from "../scroll-utils";

const rolling = ["Web3 지갑을", "DEX를", "실시간 게임을", "데이팅 앱을", "AI 워크플로우를"];

const facts = [
  { label: "Based in", value: "서울 강남" },
  { label: "Experience", value: "9년+ · React / Next.js" },
  { label: "Now running", value: "ARVO TCG · dopamine.land · DATEBASE" },
  { label: "Working with", value: "Claude Code · MCP · Agent Harness" },
];

// 단어가 아래에서 굴러 올라오며 바뀌고, 너비는 새 단어에 맞춰 부드럽게 늘어난다.
const RollingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((value) => (value + 1) % rolling.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.span
      layout
      transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      className="relative inline-block overflow-hidden align-bottom"
    >
      <span className="invisible">{rolling[index]}</span>
      <AnimatePresence initial={false}>
        <motion.span
          key={rolling[index]}
          initial={{ y: "110%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="shimmer absolute left-0 top-0"
        >
          {rolling[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
};

export default function Intro() {
  return (
    // grid 한 칸에 장식 레이어와 본문을 겹친다. 본문 안의 Reveal(Scroll.Section)이 있어서
    // 바깥을 Scroll.Section이나 position 요소로 감쌀 수 없다.
    <section className="grid overflow-hidden bg-black">
      <Scroll.Section className="pointer-events-none relative col-start-1 row-start-1">
        <Sparkles count={90} className="absolute inset-0 h-full w-full" />
        {/* 뒤에서 은은하게 흐르는 큰 원 */}
        <Scroll.Item
          className="absolute -right-[20vw] top-1/2 h-[80vmin] w-[80vmin] -translate-y-1/2 rounded-full border border-white/[0.08]"
          keyframes={kf(({ section, container }) => ({
            [section.topAt("container-bottom")]: { rotateZ: 0, translateY: 120, scale: 0.8 },
            [section.bottomAt("container-top")]: { rotateZ: 60, translateY: -120, scale: 1.1 },
          }))}
        >
          <div className="absolute inset-[12%] rounded-full border border-dashed border-white/[0.08]" />
        </Scroll.Item>
      </Scroll.Section>

      <div className="col-start-1 row-start-1 mx-auto w-full max-w-6xl px-6 py-32 md:py-48">
        <Reveal y={40}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] text-apple-white/85 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <motion.span
                animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full bg-white"
              />
              <span className="relative h-2 w-2 rounded-full bg-white" />
            </span>
            새로운 팀과 프로젝트에 열려 있습니다
          </div>
        </Reveal>

        <Reveal y={60} className="mt-10">
          <h2 className="text-[36px] font-semibold leading-[1.15] tracking-[-0.03em] text-apple-white md:text-[72px] md:leading-[1.08]">
            안녕하세요.
            <br />
            <RollingWord /> 만드는
            <br />
            <span className="text-apple-dim">프론트엔드 엔지니어,</span> 김규현입니다.
          </h2>
        </Reveal>

        <Reveal y={40} className="mt-10 max-w-2xl">
          <p className="text-[19px] leading-relaxed text-apple-gray md:text-[22px]">
            {personalInfo.subtitle}. 복잡한 제품 요구사항을 UI, 데이터, 자동화 워크플로우로 분해해
            실제로 배포되는 결과물까지 밀고 갑니다.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-[18px] border border-white/10 bg-white/10 md:grid-cols-4">
          {facts.map((fact, index) => (
            <Reveal key={fact.label} y={30} delay={index * 40} itemClassName="h-full">
              <div className="shine group h-full bg-black p-6">
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-apple-gray">
                  {fact.label}
                </p>
                <p className="mt-3 text-[17px] font-semibold leading-snug text-apple-white">
                  {fact.value}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
