"use client";

import { Scroll } from "scrollex";
import { kf } from "../scroll-utils";

const rows = [
  ["3년 Web3 프론트엔드", "Lighthouse 20% 개선", "데이터 페칭 34% 개선"],
  ["UI 반복 4~5회 → 1~2회", "6종 진행 · 5종 출시", "Claude Code · MCP · Harness"],
];

// 스크롤 방향에 맞춰 두 줄의 문장이 서로 반대로 흘러간다.
export default function Marquee() {
  return (
    <Scroll.Section className="relative overflow-hidden py-24 md:py-40">
      {rows.map((row, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const line = [...row, ...row, ...row].join("  ·  ");
        return (
          <Scroll.Item
            key={index}
            className="whitespace-nowrap"
            keyframes={kf(({ section }) => ({
              [section.topAt("container-bottom")]: {
                translateX: direction < 0 ? "0%" : "-40%",
              },
              [section.bottomAt("container-top")]: {
                translateX: direction < 0 ? "-40%" : "0%",
              },
            }))}
          >
            <p
              className={`text-6xl font-extrabold tracking-tight md:text-9xl ${
                index % 2 === 0 ? "text-apple-white" : "text-outline"
              }`}
            >
              {line}
            </p>
          </Scroll.Item>
        );
      })}
    </Scroll.Section>
  );
}
