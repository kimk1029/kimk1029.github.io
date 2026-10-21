"use client";

import { useEffect, useSyncExternalStore } from "react";

// 기기 성능 등급. low면 파티클·그레인·shimmer 같은 장식 효과를 끈다.
export type Tier = "high" | "low";

let current: Tier = "high";
const listeners = new Set<() => void>();

export const getTier = () => current;
export const subscribeTier = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const setTier = (tier: Tier) => {
  if (tier === current) return;
  current = tier;
  document.documentElement.dataset.tier = tier;
  listeners.forEach((listener) => listener());
};

export const useTier = () =>
  useSyncExternalStore(subscribeTier, getTier, () => "high" as Tier);

const staticLowSignals = () => {
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 4 ||
    (nav.deviceMemory ?? 8) <= 4 ||
    nav.connection?.saveData === true
  );
};

// 1) 코어 수·메모리 같은 정적 신호로 먼저 판단하고
// 2) 로드 직후 1.5초 동안 실제 프레임 간격을 재서 느리면 low로 내린다.
// ?tier=low / ?tier=high 로 강제할 수 있다(확인용).
export const PerfTierProbe = () => {
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).get("tier");
    if (forced === "low" || forced === "high") {
      setTier(forced);
      return;
    }
    document.documentElement.dataset.tier = current;
    if (staticLowSignals()) {
      setTier("low");
      return;
    }

    const deltas: number[] = [];
    let last = performance.now();
    let raf = 0;
    const started = last;
    const tick = (now: number) => {
      deltas.push(now - last);
      last = now;
      if (now - started < 1500) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const sorted = deltas.slice(5).sort((a, b) => a - b);
      const median = sorted[Math.floor(sorted.length / 2)] ?? 16;
      if (median > 26) setTier("low");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
};
