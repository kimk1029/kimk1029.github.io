"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/app/data";

const bars = [0.9, 0.62, 0.74, 0.48];

const Bar = ({ width, index, reveal, className }: { width: number; index: number; reveal: MotionValue<number>; className: string }) => {
  const scaleX = useTransform(reveal, [0.35 + index * 0.08, 0.7 + index * 0.08], [0, 1]);
  return (
    <motion.div
      style={{ scaleX, width: `${width * 100}%` }}
      className={`h-3 origin-left rounded-full ${className}`}
    />
  );
};

const Chip = ({ label, index, reveal, className }: { label: string; index: number; reveal: MotionValue<number>; className: string }) => {
  const opacity = useTransform(reveal, [0.6 + index * 0.06, 0.85 + index * 0.06], [0, 1]);
  return (
    <motion.span style={{ opacity }} className={`rounded-full px-3 py-1 text-[11px] ${className}`}>
      {label}
    </motion.span>
  );
};

// 프로젝트 데이터로 만든 모노톤 브라우저 목업. 실제 스크린샷(project.image)이 있으면 그걸 쓴다.
// reveal: 0~1, 열리는 정도. 내부 요소들이 시차를 두고 채워진다.
export const ProjectVisual = ({
  project,
  reveal,
  dark = false,
}: {
  project: Project;
  reveal: MotionValue<number>;
  dark?: boolean;
}) => {
  const headlineY = useTransform(reveal, [0.25, 0.7], ["60%", "0%"]);
  const headlineOpacity = useTransform(reveal, [0.25, 0.6], [0, 1]);

  if (project.image) {
    return (
      <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover" />
    );
  }

  const host = project.url?.replace(/^https?:\/\//, "") ?? `${project.slug}.app`;
  const headline = project.title.replace(/\s*\(.*\)$/, "");
  const frame = dark ? "bg-[#1d1d1f] text-apple-white" : "bg-white text-apple-ink";
  const chrome = dark ? "border-white/10" : "border-apple-line";
  const muted = dark ? "bg-white/10" : "bg-[#e8e8ed]";
  const mutedText = dark ? "text-white/60" : "text-apple-gray";

  return (
    <div className={`flex h-full w-full flex-col ${frame}`}>
      <div className={`flex items-center gap-3 border-b px-4 py-3 ${chrome}`}>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className={`h-2.5 w-2.5 rounded-full ${muted}`} />
          ))}
        </div>
        <div className={`flex-1 rounded-md px-3 py-1 text-[11px] ${muted} ${mutedText}`}>{host}</div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div className="overflow-hidden">
          <motion.p
            style={{ y: headlineY, opacity: headlineOpacity }}
            className="text-[9vw] font-semibold leading-none tracking-[-0.05em] md:text-[4.2rem]"
          >
            {headline}
          </motion.p>
        </div>
        <div className="grid gap-3">
          {bars.map((width, index) => (
            <Bar key={width} width={width} index={index} reveal={reveal} className={muted} />
          ))}
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech, index) => (
              <Chip key={tech} label={tech} index={index} reveal={reveal} className={`${muted} ${mutedText}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
