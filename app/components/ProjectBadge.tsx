const badgeStyles: Record<string, { text: string; className: string }> = {
  "Personal Project": {
    text: "Personal",
    className: "border-[#d7ff4f]/40 bg-[#d7ff4f]/10 text-[#d7ff4f]",
  },
  NEOWIZ: {
    text: "NEOWIZ",
    className: "border-sky-400/40 bg-sky-400/10 text-sky-300",
  },
  Trumpia: {
    text: "Trumpia",
    className: "border-violet-400/40 bg-violet-400/10 text-violet-300",
  },
};

export const ProjectBadge = ({ company }: { company: string }) => {
  const badge = badgeStyles[company] ?? {
    text: company,
    className: "border-white/20 bg-white/5 text-white/70",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${badge.className}`}
    >
      {badge.text}
    </span>
  );
};
