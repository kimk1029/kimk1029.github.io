import type { Project } from "./data";

// Products the resume names as currently operated.
export const TRANSMITTING = ["arvo-tcg", "dopamine-land", "datebase"];

const FIELDS = ["#d4291a", "#1d3fbf"];

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
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${patchName(project.title)} 미션 패치`}>
      <defs>
        <path id={`${id}-top`} d="M 28 100 A 72 72 0 0 1 172 100" />
        <path id={`${id}-bottom`} d="M 25 100 A 75 75 0 0 0 175 100" />
      </defs>
      <circle cx="100" cy="100" r="99" fill="#111214" />
      <circle cx="100" cy="100" r="93" fill="none" stroke="#f2f1ec" strokeWidth="1.5" strokeDasharray="2.5 3" />
      <circle cx="100" cy="100" r="60" fill={field} />
      <ellipse cx="100" cy="100" rx="58" ry="17" fill="none" stroke="#f2f1ec" strokeWidth="2" transform="rotate(-24 100 100)" />
      <circle cx="146" cy="78" r="5" fill="#f2f1ec" />
      {[[70, 66], [128, 130], [84, 136]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#f2f1ec" />
      ))}
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="#f2f1ec"
        fontSize="38"
        style={{ fontFamily: "var(--font-stencil)", fontWeight: 900 }}
      >
        {initials(project.slug)}
      </text>
      <text fill="#f2f1ec" fontSize="15" letterSpacing="1.5" style={{ fontFamily: "var(--font-display), var(--font-hangul)", fontWeight: 900 }}>
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {patchName(project.title).toUpperCase()}
        </textPath>
      </text>
      <text fill="#f2f1ec" fontSize="11" letterSpacing="3" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
          {`MISSION ${year}`}
        </textPath>
      </text>
    </svg>
  );
}
