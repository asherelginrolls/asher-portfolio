"use client";

import { useEffect, useRef, useState } from "react";
import { acts, pipeline } from "@/lib/data";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";

// The Sales act carries the live pipeline: bars draw in when scrolled into view.
function PipelineBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRun(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-8 space-y-3.5">
      {pipeline.map((p, i) => (
        <div
          key={p.name}
          className="grid grid-cols-[96px_1fr_auto] items-center gap-3 sm:grid-cols-[130px_1fr_auto] sm:gap-4"
        >
          <span className="mono truncate text-[11px] uppercase tracking-[0.08em] text-muted">
            {p.name}
          </span>
          <span className="relative h-[7px] overflow-hidden bg-ink/10">
            <span
              className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-[900ms] ease-out"
              style={{
                width: run ? `${Math.round(p.w * 100)}%` : "0%",
                transitionDelay: `${i * 110}ms`,
              }}
            />
          </span>
          <span className="mono whitespace-nowrap text-[10.5px] uppercase tracking-[0.08em] text-muted">
            {p.stage}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ScrollStory() {
  return (
    <section id="story" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHead
          index="01"
          eyebrow="The story"
          title={
            <>
              One line runs through <span className="text-accent">all of it.</span>
            </>
          }
          lead="Attention has been my craft from the start. I learned how it moves, spent years moving it, learned to sell hard things with it, and built the AI systems that make it scale. The surfaces changed. The work stayed the same."
        />

        <div className="mt-14 border-t border-ink/15">
          {acts.map((act, i) => (
            <Reveal key={act.no}>
              <div className="relative grid grid-cols-1 gap-5 overflow-hidden border-b border-ink/15 py-9 md:grid-cols-12 md:gap-8 md:py-11">
                {/* oversized ghost index */}
                <span
                  aria-hidden="true"
                  className="mono pointer-events-none absolute -bottom-6 right-1 select-none text-[110px] font-bold leading-none text-ink/[0.045] sm:text-[150px]"
                >
                  {act.no}
                </span>

                <div className="relative z-10 md:col-span-4">
                  <div className="label text-accent">
                    {act.no} / {act.kicker}
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="mono text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold leading-none tracking-tight">
                      {act.stat.k}
                    </span>
                    <span className="mono text-xs uppercase tracking-[0.1em] text-muted">
                      {act.stat.v}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 md:col-span-8">
                  <h3 className="max-w-[24ch] text-[clamp(1.4rem,2.5vw,2rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
                    {act.title}
                  </h3>
                  <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-muted">
                    {act.body}
                  </p>
                  {i === 2 ? <PipelineBars /> : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
