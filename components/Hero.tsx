"use client";

import { hero } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { HeroInstrument } from "@/components/HeroInstrument";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="wrap flex flex-1 flex-col pb-10 pt-24 sm:pt-28">
        {/* top meta */}
        <Reveal className="flex items-center justify-between" y={0}>
          <span className="label flex items-center gap-3 text-accent">
            <span className="h-px w-7 bg-accent" />
            {hero.kicker}
          </span>
          <span className="label hidden sm:block">[ folio / 2026 ]</span>
        </Reveal>

        {/* giant headline — type as architecture */}
        <Reveal delay={0.05}>
          <h1
            className="display mt-7 sm:mt-10"
            style={{ fontSize: "clamp(2.7rem, 11.2vw, 11.5rem)" }}
          >
            I get good products their first{" "}
            <span className="text-accent">100,000</span> users.
          </h1>
        </Reveal>

        {/* lower block */}
        <div className="mt-auto grid items-end gap-10 pt-12 lg:grid-cols-12">
          <Reveal delay={0.12} className="lg:col-span-7">
            <p className="max-w-2xl text-balance text-lg leading-snug sm:text-2xl">
              <strong className="font-semibold">
                AI-native growth operator.
              </strong>{" "}
              <span className="text-muted">
                I find the channel, build the engine that feeds it, and run the
                data that makes it{" "}
              </span>
              <span className="text-ink underline decoration-accent decoration-2 underline-offset-4">
                compound
              </span>
              <span className="text-muted">.</span>
            </p>
            <p className="mt-4 max-w-md text-sm text-muted">{hero.sub}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${hero.email}`}
                className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:border-accent hover:bg-accent"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Start a conversation
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {"->"}
                </span>
              </a>
              <a
                href="#work"
                className="inline-flex items-center border border-ink px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-paper"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                See the work
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {hero.contexts.map((c) => (
                <span
                  key={c}
                  className="border border-ink/25 px-3 py-1.5 text-[10.5px] uppercase tracking-[0.1em] text-muted"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          {/* the live 3D data instrument */}
          <Reveal delay={0.2} className="lg:col-span-5">
            <HeroInstrument />
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
