import { claimright } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function ClaimRight() {
  const cr = claimright;
  return (
    <section id="claimright" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="border border-ink/20 bg-paper-2/40 p-6 sm:p-10 lg:p-14">
            <div className="label flex items-center gap-3 text-accent">
              <span className="grid size-5 place-items-center border border-accent text-[9px] leading-none">
                03
              </span>
              {cr.eyebrow}
            </div>

            <h2 className="mt-5 max-w-[24ch] text-[clamp(1.7rem,3.4vw,2.7rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
              {cr.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted">
              {cr.lead}
            </p>

            <p className="mt-7 border-l-2 border-accent pl-5 text-[clamp(1.05rem,1.8vw,1.35rem)] font-medium leading-snug">
              {cr.origin}
            </p>

            {/* citation-gated pipeline */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cr.steps.map((s, i) => (
                <div
                  key={s.n}
                  className={[
                    "relative bg-paper p-5",
                    s.gate
                      ? "border-2 border-accent"
                      : "border border-ink/20",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "label",
                      s.gate ? "text-accent" : "",
                    ].join(" ")}
                  >
                    {s.n} / {s.k}
                  </div>
                  <h3 className="mono mt-3 text-[15px] font-semibold">{s.h}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    {s.p}
                  </p>
                  {s.gate ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="mono border border-ink/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.06em]">
                        pass
                      </span>
                      <span className="mono border border-accent/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.06em] text-accent">
                        {"unsupported -> cut"}
                      </span>
                    </div>
                  ) : null}
                  {i < cr.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="mono absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 bg-paper-2 px-0.5 text-ink/50 lg:block"
                    >
                      {"->"}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <p className="mono mt-5 text-[12.5px] text-muted">{cr.note}</p>

            {/* stack */}
            <div className="mt-9 flex flex-wrap gap-2.5">
              {cr.stack.map((t) => (
                <span
                  key={t}
                  className="mono border border-ink/20 px-3 py-1.5 text-[11.5px] text-ink/75"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* stats */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-8 sm:grid-cols-4">
              {cr.stats.map((s) => (
                <div key={s.s}>
                  <div className="mono text-[clamp(1.6rem,2.6vw,2.1rem)] font-bold leading-none tracking-tight">
                    {s.b}
                  </div>
                  <div className="label mt-2">{s.s}</div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <a
                href={cr.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="group mono inline-flex items-center gap-2 border border-ink px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-paper"
              >
                Read the code on GitHub
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {"->"}
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
