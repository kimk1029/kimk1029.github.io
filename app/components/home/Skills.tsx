"use client";

import { skills } from "@/app/data";
import { MaskText, Reveal } from "../scroll-utils";

export default function Skills() {
  return (
    <section className="bg-apple-white text-apple-ink">
      <div className="mx-auto max-w-6xl px-6 pb-32 pt-8 md:pb-48">
        <Reveal className="mb-14 md:mb-20">
          <h2 className="text-[40px] font-semibold leading-tight tracking-[-0.03em] md:text-[64px]">
            <MaskText as="span" className="block" text="블록체인부터 에이전트까지." />
            <MaskText
              as="span"
              className="block text-apple-gray"
              text="한 사람의 도구 상자."
              stagger={34}
            />
          </h2>
        </Reveal>

        <div className="border-b border-apple-line">
          {skills.map((skill, index) => (
            <Reveal key={skill.category} y={40} x={index % 2 ? 140 : -140} rotateX={24}>
              <div className="grid gap-3 border-t border-apple-line py-8 md:grid-cols-[1fr_2fr] md:gap-10 md:py-10">
                <h3 className="text-2xl font-semibold tracking-[-0.02em] md:text-[28px]">
                  {skill.category}
                </h3>
                <p className="text-[17px] leading-relaxed text-apple-dim md:text-[19px]">
                  {skill.items.join(" · ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
