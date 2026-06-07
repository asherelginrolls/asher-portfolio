import { work } from "@/lib/data";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";

export function Work() {
  return (
    <section id="work" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHead
          index="02"
          eyebrow="Selected work"
          title={
            <>
              Proof I move{" "}
              <span className="text-accent">audiences and pipelines.</span>
            </>
          }
        />

        <div className="mt-12">
          {work.map((w) => (
            <Reveal key={w.id}>
              <article className="grid grid-cols-1 gap-7 border-t border-ink/15 py-12 lg:grid-cols-12 lg:gap-12">
                {/* meta column */}
                <div className="lg:col-span-4">
                  <div className="self-start lg:sticky lg:top-24">
                    <div className="label">{w.tag}</div>
                    <div className="mono mt-3 text-[13px] text-muted">
                      {w.role}
                    </div>

                    {w.journey ? (
                      <div className="mt-6">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="mono text-2xl font-semibold text-muted">
                            {w.journey.from}
                          </span>
                          <span className="mono text-xl text-accent">
                            {"->"}
                          </span>
                          <span className="mono text-[clamp(2.8rem,6vw,4.4rem)] font-bold leading-none tracking-tight">
                            {w.journey.to}
                          </span>
                        </div>
                        <span className="mono mt-3 inline-block border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          {w.journey.pill}
                        </span>
                      </div>
                    ) : (
                      <div className="mono mt-6 text-[clamp(2.8rem,7vw,4.6rem)] font-bold leading-none tracking-tight">
                        {w.metric}
                      </div>
                    )}
                  </div>
                </div>

                {/* content column */}
                <div className="lg:col-span-8">
                  <h3 className="max-w-[22ch] text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-[1.12] tracking-[-0.02em]">
                    {w.title}
                  </h3>
                  <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                    {w.body}
                  </p>

                  {w.chips ? (
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {w.chips.map((c) => (
                        <span
                          key={c}
                          className="mono border border-ink/20 px-3 py-1.5 text-[11.5px] text-ink/75"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {w.feature ? (
                    <div className="mt-7 border border-ink/20 bg-paper-2/50 p-6">
                      <div className="label text-accent">{w.feature.label}</div>
                      <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
                        {w.feature.text}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
                        {w.feature.stats.map((s) => (
                          <div key={s.l}>
                            <div className="mono text-2xl font-bold leading-none">
                              {s.n}
                            </div>
                            <div className="label mt-1.5">{s.l}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {w.duo ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {w.duo.map((d) => (
                        <div key={d.name} className="border border-ink/20 p-5">
                          <div className="mono text-[13px] font-semibold tracking-[0.04em] text-accent">
                            {d.name}
                          </div>
                          <h4 className="mt-2 text-[17px] font-semibold leading-snug">
                            {d.title}
                          </h4>
                          <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                            {d.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
