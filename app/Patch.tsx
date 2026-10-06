import type React from "react";
import type { Project } from "./data";

// Products the resume names as currently operated.
export const TRANSMITTING = ["arvo-tcg", "dopamine-land", "datebase"];

const FIELDS = ["#d4291a", "#1d3fbf"];


// One drawn emblem per mission; archive work falls back to stenciled initials.
const P = { fill: "none", stroke: "#f2f1ec", strokeWidth: 4, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
const EMBLEMS: Record<string, React.ReactNode> = {
  // trading card with a star
  "arvo-tcg": (
    <g transform="rotate(-12 100 100)">
      <rect x="76" y="64" width="48" height="72" rx="4" {...P} />
      <path d="M100 82 l6 13 14 1 -11 9 4 14 -13 -8 -13 8 4 -14 -11 -9 14 -1 z" fill="#f2f1ec" />
    </g>
  ),
  // tetromino stack
  "dopamine-land": (
    <g fill="#f2f1ec">
      {[[70, 106], [90, 106], [110, 106], [90, 86], [110, 126], [130, 126], [130, 106]].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="17" height="17" />
      ))}
    </g>
  ),
  // map pin holding a heart
  datebase: (
    <g>
      <path d="M100 146 C 82 122, 72 108, 72 92 a 28 28 0 0 1 56 0 c 0 16 -10 30 -28 54 z" {...P} />
      <path d="M100 104 c -14 -9 -16 -22 -7 -24 c 4 -1 6 2 7 4 c 1 -2 3 -5 7 -4 c 9 2 7 15 -7 24 z" fill="#f2f1ec" />
    </g>
  ),
  // banded ball
  "poke-30": (
    <g>
      <circle cx="100" cy="100" r="30" {...P} />
      <path d="M70 100 h 20 M110 100 h 20" {...P} />
      <circle cx="100" cy="100" r="9" {...P} />
    </g>
  ),
  // radar sweep
  "cop-vs-robbers": (
    <g>
      <circle cx="100" cy="100" r="34" {...P} />
      <circle cx="100" cy="100" r="18" {...P} strokeWidth={2.5} />
      <path d="M100 100 L 126 78" {...P} />
      <circle cx="116" cy="114" r="4.5" fill="#f2f1ec" />
    </g>
  ),
  // briefcase
  fiesta: (
    <g>
      <rect x="70" y="84" width="60" height="42" rx="3" {...P} />
      <path d="M88 84 v -8 h 24 v 8 M70 102 h 60" {...P} />
    </g>
  ),
  // speech bubble
  "church-community": (
    <g>
      <path d="M68 76 h 64 v 40 h -36 l -14 14 v -14 h -14 z" {...P} />
      <path d="M84 92 h 32 M84 102 h 20" {...P} strokeWidth={3} />
    </g>
  ),
};

export const patchName = (title: string) => title.replace(/\s*\(.*\)\s*/, "");

const initials = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

export function Patch({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  const field = FIELDS[index % FIELDS.length];
  const id = `patch-${project.slug}`;
  const year = project.period.slice(0, 4);

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${patchName(project.title)} 엠블럼`}>
      <defs>
        <path id={`${id}-top`} d="M 28 100 A 72 72 0 0 1 172 100" />
        <path id={`${id}-bottom`} d="M 25 100 A 75 75 0 0 0 175 100" />
      </defs>
      <circle cx="100" cy="100" r="99" fill="#111214" />
      <circle cx="100" cy="100" r="93" fill="none" stroke="#f2f1ec" strokeWidth="1.5" strokeDasharray="2.5 3" />
      <circle cx="100" cy="100" r="60" fill={field} />
      {EMBLEMS[project.slug] ?? (
        <text x="100" y="114" textAnchor="middle" fill="#f2f1ec" fontSize="40" style={{ fontFamily: "var(--font-stencil)", fontWeight: 900 }}>
          {initials(project.slug)}
        </text>
      )}
      <text fill="#f2f1ec" fontSize="15" letterSpacing="1.5" style={{ fontFamily: "var(--font-display), var(--font-hangul)", fontWeight: 900 }}>
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {patchName(project.title).toUpperCase()}
        </textPath>
      </text>
      <text fill="#f2f1ec" fontSize="11" letterSpacing="3" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
          {year}
        </textPath>
      </text>
    </svg>
  );
}
