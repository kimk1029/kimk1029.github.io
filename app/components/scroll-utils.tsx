"use client";

import React from "react";
import { Scroll, type KeyframesContext, type KeyframesFn } from "scrollex";

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 모션 최소화 설정이 켜져 있으면 이동·확대는 빼고 투명도 전환만 남긴다.
export const kf =
  (fn: KeyframesFn): KeyframesFn =>
  (ctx) => {
    const frames = fn(ctx);
    if (!prefersReducedMotion()) return frames;
    return Object.fromEntries(
      Object.entries(frames).map(([offset, style]) => [
        offset,
        style.opacity === undefined ? {} : { opacity: style.opacity },
      ])
    );
  };

// sticky로 고정된 섹션 구간(섹션 top이 컨테이너 top에 닿는 순간 ~ 섹션 bottom이 컨테이너 bottom에 닿는 순간)
export const pinRange = ({ section }: Pick<KeyframesContext, "section">) => {
  const start = section.topAt("container-top");
  const end = section.bottomAt("container-bottom");
  return {
    start,
    end,
    at: (t: number) => start + (end - start) * t,
    progress: (position: number) =>
      end === start ? 1 : clamp((position - start) / (end - start)),
  };
};

// 섹션이 화면 아래에서 들어오며 떠오르는 기본 리빌.
// 주의: scrollex는 Scroll.Section 위치를 offsetTop으로 계산하므로, 중첩된 섹션의 조상에
// position(relative 등)을 주면 기준점이 틀어져 애니메이션 타이밍이 어긋난다.
export const Reveal = ({
  children,
  className,
  itemClassName,
  y = 90,
  scale = 1,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  y?: number;
  scale?: number;
  delay?: number;
}) => (
  <Scroll.Section className={className}>
    <Scroll.Item
      className={itemClassName}
      keyframes={kf(({ section, container }) => ({
        [section.topAt("container-bottom") + delay]: {
          opacity: 0,
          translateY: y,
          scale,
        },
        [section.topAt("container-bottom") + container.height * 0.35 + delay]: {
          opacity: 1,
          translateY: 0,
          scale: 1,
        },
      }))}
    >
      {children}
    </Scroll.Item>
  </Scroll.Section>
);
