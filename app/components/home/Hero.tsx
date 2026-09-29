"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Scroll } from "scrollex";
import { personalInfo } from "@/app/data";
import { Sparkles } from "../Sparkles";
import { kf, pinRange } from "../scroll-utils";

const name = ["김", "규", "현"];
const taglines = ["Web3를 이해하고.", "AI와 함께 만들고.", "끝까지 출시합니다."];
const ease = [0.16, 1, 0.3, 1] as const;

// 글자마다 다른 방향으로 흩어지는 값
const scatter = [
  { x: -220, y: -140, r: -18 },
  { x: 0, y: -260, r: 6 },
  { x: 220, y: -140, r: 18 },
];

const rings = [0.35, 0.55, 0.78, 1];

export default function Hero() {
  return (
    <Scroll.Section id="intro" className="relative h-[360vh] bg-black">
      <div
        className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden"
        style={{ perspective: 1400 }}
      >
        <Sparkles count={110} className="absolute inset-0 h-full w-full" />

        {/* 배경: 스크롤에 따라 회전·확대되는 동심원. 색 없이 가는 선만 */}
        <Scroll.Item
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          keyframes={kf((ctx) => {
            const pin = pinRange(ctx);
            return {
              [pin.at(0)]: { scale: 0.9, rotateZ: 0, opacity: 1 },
              [pin.at(0.5)]: { scale: 1.6, rotateZ: 40, opacity: 0.6 },
              [pin.at(1)]: { scale: 2.8, rotateZ: 90, opacity: 0 },
            };
          })}
        >
          <div className="relative h-[120vmin] w-[120vmin]">
            {rings.map((ratio, index) => (
              <div
                key={ratio}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.14]"
                style={{
                  width: `${ratio * 100}%`,
                  height: `${ratio * 100}%`,
                  borderStyle: index % 2 ? "dashed" : "solid",
                }}
              />
            ))}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.08]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.08]" />
          </div>
        </Scroll.Item>

        {/* 1막: 이름. 로드 시 글자가 뒤집히며 등장하고, 스크롤하면 세 글자가 각자 흩어진다 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <Scroll.Item
            keyframes={kf((ctx) => {
              const pin = pinRange(ctx);
              return {
                [pin.at(0)]: { opacity: 1, translateY: 0 },
                [pin.at(0.18)]: { opacity: 0, translateY: -40 },
              };
            })}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease }}
              className="text-lg font-semibold text-apple-gray md:text-2xl"
            >
              Frontend Engineer
            </motion.p>
          </Scroll.Item>

          <h1 className="mt-2 flex text-[24vw] font-semibold leading-none tracking-[-0.04em] text-apple-white md:text-[13rem]">
            {name.map((char, index) => (
              <Scroll.Item
                key={char}
                style={{ transformStyle: "preserve-3d" }}
                keyframes={kf((ctx) => {
                  const pin = pinRange(ctx);
                  const s = scatter[index];
                  return {
                    [pin.at(0.02 + index * 0.02)]: {
                      opacity: 1, translateX: 0, translateY: 0, rotateZ: 0, scale: 1,
                    },
                    [pin.at(0.3 + index * 0.02)]: {
                      opacity: 0, translateX: s.x, translateY: s.y, rotateZ: s.r, scale: 0.6,
                    },
                  };
                })}
              >
                <motion.span
                  initial={{ opacity: 0, rotateX: 90, y: 60 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 1.3, delay: 0.1 + index * 0.12, ease }}
                  className="shimmer inline-block"
                  style={{ transformOrigin: "50% 100%", animationDelay: `${index * 0.18}s` }}
                >
                  {char}
                </motion.span>
              </Scroll.Item>
            ))}
          </h1>

          <Scroll.Item
            keyframes={kf((ctx) => {
              const pin = pinRange(ctx);
              return {
                [pin.at(0)]: { opacity: 1, translateY: 0 },
                [pin.at(0.2)]: { opacity: 0, translateY: 60 },
              };
            })}
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-apple-gray md:text-[21px]"
            >
              {personalInfo.subtitle}
            </motion.p>
          </Scroll.Item>
        </div>

        {/* 2막: 태그라인이 아래에서 젖혀진 채 일어서며 한 줄씩 등장 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-6 text-center md:gap-2"
          style={{ perspective: 1200 }}
        >
          {taglines.map((line, index) => (
            <Scroll.Item
              key={line}
              style={{ transformOrigin: "50% 100%" }}
              keyframes={kf((ctx) => {
                const pin = pinRange(ctx);
                const start = 0.32 + index * 0.13;
                return {
                  [pin.at(start)]: { opacity: 0, translateY: 120, rotateX: 70, scale: 0.9 },
                  [pin.at(start + 0.13)]: { opacity: 1, translateY: 0, rotateX: 0, scale: 1 },
                  [pin.at(0.86)]: { opacity: 1, translateY: 0, rotateX: 0, scale: 1 },
                  [pin.at(1)]: {
                    opacity: 0,
                    translateY: -160 - index * 40,
                    rotateX: -30,
                    scale: 1.1 + index * 0.05,
                  },
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
              [pin.at(0.06)]: { opacity: 0 },
            };
          })}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              opacity: { delay: 1.6, duration: 0.6 },
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
