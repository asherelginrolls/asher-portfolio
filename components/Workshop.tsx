import { tools } from "@/lib/data";
import { SectionHead } from "@/components/SectionHead";
import { Reveal } from "@/components/Reveal";

export function Workshop() {
  return (
    <section id="tools" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <SectionHead
          index="04"
          eyebrow="The workshop"
          title={
            <>
              Ten tools shipped.{" "}
              <span className="text-accent">Open and try them.</span>
            </>
          }
          lead="More than ten shipped AI tools, 200+ interactions across them. These are live. Open one."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.06}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-[176px] flex-col border border-ink/20 bg-paper p-6 transition-colors hover:border-ink/45 hover:bg-paper-2"
              >
                <div className="mono text-[15px] font-semibold tracking-[0.01em]">
                  {t.name}
                </div>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {t.desc}
                </p>
                <span className="mono mt-5 inline-flex items-center gap-2 text-[12px] text-accent">
                  {t.cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    {"->"}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
