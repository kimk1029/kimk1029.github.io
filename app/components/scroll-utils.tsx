"use client";

import React from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import {
  Scroll,
  useScrollState,
  useScrollValue,
  type KeyframesContext,
  type KeyframesFn,
} from "scrollex";

export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 모션 최소화 설정이 켜져 있으면 이동·확대·회전은 빼고 투명도 전환만 남긴다.
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

// 섹션이 화면을 지나가는 전체 구간(아래에서 등장 ~ 위로 퇴장)의 진행도 0~1
export const traverseProgress = (
  { section }: Pick<KeyframesContext, "section">,
  position: number
) => {
  const start = section.topAt("container-bottom");
  const end = section.bottomAt("container-top");
  return end === start ? 1 : clamp((position - start) / (end - start));
};

// 고정(pin) 구간 진행도를 MotionValue<number>로. Scroll.Section 안에서만 사용.
export const usePinProgress = () => {
  const raw = useScrollValue(({ section, position }) =>
    prefersReducedMotion() ? 1 : pinRange({ section }).progress(position)
  );
  return useTransform(raw, (value) => value ?? 0);
};

export const useTraverseProgress = () => {
  const raw = useScrollValue(({ section, position }) =>
    prefersReducedMotion() ? 0.5 : traverseProgress({ section }, position)
  );
  return useTransform(raw, (value) => value ?? 0);
};

// 스크롤 속도에 따라 기울어지는 값(deg). 빠르게 넘길수록 글자가 뒤로 젖혀진다.
export const useVelocitySkew = (max = 8, axis: "x" | "y" = "y") => {
  const raw = useScrollValue(({ velocity }) =>
    prefersReducedMotion() ? 0 : clamp(velocity / 2500, -1, 1) * max * (axis === "y" ? -1 : 1)
  );
  return useSpring(
    useTransform(raw, (value) => value ?? 0),
    { stiffness: 300, damping: 30, mass: 0.4 }
  );
};

// 섹션이 화면 아래에서 들어오며 떠오르는 기본 리빌.
// 주의: scrollex는 Scroll.Section 위치를 offsetTop으로 계산하므로, 중첩된 섹션의 조상에
// position(relative 등)을 주면 기준점이 틀어져 애니메이션 타이밍이 어긋난다.
export const Reveal = ({
  children,
  className,
  itemClassName,
  y = 90,
  x = 0,
  scale = 1,
  rotateX = 0,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  y?: number;
  x?: number;
  scale?: number;
  rotateX?: number;
  delay?: number;
}) => (
  <Scroll.Section className={className} style={{ perspective: 1200 }}>
    <Scroll.Item
      className={itemClassName}
      style={{ transformOrigin: "50% 100%" }}
      keyframes={kf(({ section, container }) => ({
        [section.topAt("container-bottom") + delay]: {
          opacity: 0,
          translateY: y,
          translateX: x,
          scale,
          rotateX,
        },
        [section.topAt("container-bottom") + container.height * 0.4 + delay]: {
          opacity: 1,
          translateY: 0,
          translateX: 0,
          scale: 1,
          rotateX: 0,
        },
      }))}
    >
      {children}
    </Scroll.Item>
  </Scroll.Section>
);

// 화면 중앙 대비 위치에 따라 다른 속도로 흐르는 시차 레이어. Scroll.Section 안에서 사용.
export const Parallax = ({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) => (
  <Scroll.Item
    className={className}
    keyframes={kf(({ section, container }) => ({
      [section.topAt("container-bottom")]: { translateY: container.height * speed },
      [section.bottomAt("container-top")]: { translateY: -container.height * speed },
    }))}
  >
    {children}
  </Scroll.Item>
);

// 글자를 한 자씩 마스크 아래에서 밀어 올리는 리빌. 섹션이 화면의 지정 지점을 지나면 시차를 두고 올라온다.
// Scroll.Item을 글자마다 만들면 무거워서, 상태 하나로 CSS transition-delay만 조절한다.
export const MaskText = ({
  text,
  as: Tag = "span",
  className,
  charClassName,
  stagger = 28,
  duration = 900,
  trigger = 0.7,
  from = "110%",
}: {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  charClassName?: string;
  stagger?: number;
  duration?: number;
  trigger?: number;
  from?: string;
}) => {
  const shown = useScrollState(({ section, container, position }) =>
    prefersReducedMotion() ||
    position > section.topAt("container-bottom") + container.height * (1 - trigger)
  );
  const words = text.split(" ");
  let charIndex = 0;

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, index) => {
            const delay = charIndex++ * stagger;
            return (
              <span key={index} className="inline-block overflow-hidden align-bottom">
                <span
                  className={`inline-block ${charClassName ?? ""}`}
                  style={{
                    transform: shown ? "translateY(0)" : `translateY(${from})`,
                    transition: `transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

// 0에서 목표값까지 스크롤 진행도에 맞춰 올라가는 숫자
export const CountUp = ({
  to,
  progress,
  suffix = "",
  className,
}: {
  to: number;
  progress: MotionValue<number>;
  suffix?: string;
  className?: string;
}) => {
  const value = useTransform(progress, (p) => `${Math.round(clamp(p) * to)}${suffix}`);
  return <motion.span className={className}>{value}</motion.span>;
};
