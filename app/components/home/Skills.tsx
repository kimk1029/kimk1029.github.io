"use client";

import { skills } from "@/app/data";
import { Reveal } from "../scroll-utils";

export default function Skills() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 md:py-48">
      <Reveal className="mb-16 max-w-4xl md:mb-24">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray">Toolkit</p>
        <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-apple-white md:text-7xl">
          블록체인부터 에이전트까지.
          <br />
          <span className="text-apple-gray">한 사람의 도구 상자.</span>
        </h2>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, index) => (
          <Reveal
            key={skill.category}
            delay={(index % 3) * 60}
            scale={0.92}
            className={index === 1 ? "lg:row-span-2" : undefined}
            itemClassName="h-full"
          >
            <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-apple-card p-8 transition-colors duration-500 hover:border-white/25">
              <skill.icon className="h-8 w-8 text-apple-white" strokeWidth={1.5} />
              <h3 className="mt-8 text-2xl font-bold tracking-tight text-apple-white">
                {skill.category}
              </h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white/[0.06] px-3 py-1.5 text-sm text-apple-gray"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
