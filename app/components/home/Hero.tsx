"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { kf, pinRange } from "../scroll-utils";

const taglines = ["Web3를 이해하고.", "AI와 함께 만들고.", "끝까지 출시합니다."];

export default function Hero() {
  return (
    <Scroll.Section id="intro" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* 배경 글로우: 스크롤할수록 커지며 흐려진다 */}
        <Scroll.Item
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0)]: { scale: 1, opacity: 1 },
              [pin.at(0.45)]: { scale: 1.8, opacity: 0.55 },
              [pin.at(1)]: { scale: 2.6, opacity: 0.15 },
            };
          })}
        >
          <div className="glow-orb h-[70vmax] w-[70vmax] rounded-full" />
        </Scroll.Item>

        {/* 1막: 이름 */}
        <Scroll.Item
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0)]: { scale: 1, opacity: 1, translateY: 0 },
              [pin.at(0.3)]: { scale: 0.72, opacity: 0, translateY: -80 },
            };
          })}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-apple-gray md:text-base"
          >
            Frontend · AI Product Engineering
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 1.12, filter: "blur(24px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-gradient text-[26vw] font-extrabold leading-none tracking-tighter md:text-[15rem]"
          >
            김규현
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-apple-gray md:text-2xl"
          >
            {personalInfo.subtitle}
          </motion.p>
        </Scroll.Item>

        {/* 2막: 태그라인이 한 줄씩 떠오른다 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center md:gap-4">
          {taglines.map((line, index) => (
            <Scroll.Item
              key={line}
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                const start = 0.3 + index * 0.14;
                return {
                  [pin.at(start)]: { opacity: 0, translateY: 70, scale: 0.94 },
                  [pin.at(start + 0.14)]: { opacity: 1, translateY: 0, scale: 1 },
                  [pin.at(0.9)]: { opacity: 1, translateY: 0, scale: 1 },
                  [pin.at(1)]: { opacity: 0, translateY: -40, scale: 1 },
                };
              })}
            >
              <p
                className={`text-5xl font-extrabold tracking-tight md:text-8xl ${
                  index === taglines.length - 1 ? "text-gradient" : "text-apple-white"
                }`}
              >
                {line}
              </p>
            </Scroll.Item>
          ))}
        </div>

        {/* 스크롤 안내 */}
        <Scroll.Item
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0)]: { opacity: 1 },
              [pin.at(0.08)]: { opacity: 0 },
            };
          })}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1.4, duration: 0.6 },
              y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
            }}
            className="flex flex-col items-center gap-1 text-xs font-medium uppercase tracking-[0.25em] text-apple-gray"
          >
            Scroll
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Scroll.Item>
      </div>
    </Scroll.Section>
  );
}
