"use client";

import { hero } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="wrap flex flex-1 flex-col pb-10 pt-28 sm:pt-32">
        {/* top meta */}
        <Reveal className="flex items-center justify-between" y={0}>
          <span className="label flex items-center gap-3 text-accent">
            <span className="h-px w-7 bg-accent" />
            {hero.kicker}
          </span>
          <span className="label hidden sm:block">[ folio / 2026 ]</span>
        </Reveal>

        {/* headline, set over the live signal field */}
        <div className="mt-auto pt-16">
          <Reveal delay={0.05}>
            <h1
              className="display max-w-[16ch]"
              style={{ fontSize: "clamp(2.3rem, 7.4vw, 7rem)" }}
            >
              <span className="block">
                I take products to their first{" "}
                <span className="text-accent">{hero.figure}</span> {hero.leadB}
              </span>
              <span className="mt-1 block text-ink/55">{hero.line2}</span>
            </h1>
          </Reveal>
        </div>

        {/* lower block */}
        <div className="mt-12 grid items-end gap-10 lg:grid-cols-12">
          <Reveal delay={0.26} className="lg:col-span-8">
            <p className="max-w-2xl text-balance text-base leading-snug text-ink/85 sm:text-xl">
              {hero.dek}
            </p>
            <p className="mt-4 max-w-md text-sm text-muted">{hero.sub}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${hero.email}`}
                className="group mono inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                Start a conversation
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {"->"}
                </span>
              </a>
              <a
                href="#work"
                className="mono inline-flex items-center border border-ink/40 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                See the work
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.32} className="lg:col-span-4">
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {hero.contexts.map((c) => (
                <span
                  key={c}
                  className="mono border border-ink/20 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.1em] text-muted"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <div className="wrap pb-5">
        <span
          className="label inline-flex items-center gap-2"
          aria-hidden="true"
        >
          <span className="inline-block h-3 w-px bg-ink/40" />
          scroll
        </span>
      </div>
    </section>
  );
}
