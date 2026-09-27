"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { kf, pinRange } from "../scroll-utils";

const taglines = ["Web3를 이해하고.", "AI와 함께 만들고.", "끝까지 출시합니다."];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <Scroll.Section id="intro" className="relative h-[320vh] bg-black">
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* 1막: 이름 */}
        <Scroll.Item
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0)]: { scale: 1, opacity: 1, translateY: 0 },
              [pin.at(0.3)]: { scale: 0.8, opacity: 0, translateY: -60 },
            };
          })}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="text-lg font-semibold text-apple-gray md:text-2xl"
          >
            Frontend Engineer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
            className="mt-2 text-[24vw] font-semibold leading-none tracking-[-0.04em] text-apple-white md:text-[13rem]"
          >
            김규현
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-apple-gray md:text-[21px]"
          >
            {personalInfo.subtitle}
          </motion.p>
        </Scroll.Item>

        {/* 2막: 태그라인이 한 줄씩 떠오른다 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center md:gap-2">
          {taglines.map((line, index) => (
            <Scroll.Item
              key={line}
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                const start = 0.3 + index * 0.14;
                return {
                  [pin.at(start)]: { opacity: 0, translateY: 60 },
                  [pin.at(start + 0.14)]: { opacity: 1, translateY: 0 },
                  [pin.at(0.9)]: { opacity: 1, translateY: 0 },
                  [pin.at(1)]: { opacity: 0, translateY: -40 },
                };
              })}
            >
              <p
                className={`text-5xl font-semibold tracking-[-0.03em] md:text-[6.5rem] md:leading-[1.05] ${
                  index === taglines.length - 1 ? "text-apple-white" : "text-apple-dim"
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
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { delay: 1.4, duration: 0.6 },
              y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
            }}
          >
            <ChevronDown className="h-6 w-6 text-apple-gray" strokeWidth={1.5} />
          </motion.div>
        </Scroll.Item>
      </div>
    </Scroll.Section>
  );
}
