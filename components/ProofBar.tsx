import { proof } from "@/lib/data";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";

export function ProofBar() {
  return (
    <section aria-label="Proof in numbers" className="rule-t rule-b bg-paper-2/40">
      <div className="wrap grid grid-cols-2 lg:grid-cols-4">
        {proof.map((s, i) => (
          <Reveal
            key={s.cap}
            delay={i * 0.06}
            className={[
              "px-5 py-9 sm:px-7",
              i % 2 === 1 ? "border-l border-ink/15" : "",
              i >= 2 ? "border-t border-ink/15" : "",
              "lg:border-t-0",
              i > 0 ? "lg:border-l lg:border-ink/15" : "lg:border-l-0",
            ].join(" ")}
          >
            <div className="mono text-[clamp(2.4rem,4.4vw,3.6rem)] font-bold leading-none tracking-tight">
              <Counter value={s.target} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-3 max-w-[26ch] text-[13.5px] leading-snug text-muted">
              {s.cap}
            </div>
            <div className="label mt-3">{s.src}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
