import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <div className="max-w-4xl">
      <Reveal y={0}>
        <div className="label flex items-center gap-3 text-accent">
          <span className="grid size-5 place-items-center border border-accent text-[9px] leading-none">
            {index}
          </span>
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-5 text-balance text-[clamp(2rem,5vw,3.7rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
