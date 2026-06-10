import { contact } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const c = contact;
  return (
    <section id="contact" className="py-20 sm:py-28 lg:py-32">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden border border-ink/15 bg-paper-2/60 p-7 text-ink backdrop-blur-md sm:p-12 lg:p-16">
            {/* accent corner rule */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 h-24 w-24 border-r-2 border-t-2 border-accent/50"
            />

            <span className="mono inline-flex items-center gap-2.5 border border-ink/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink/80">
              <span className="h-px w-5 bg-accent" aria-hidden="true" />
              {c.status}
            </span>

            <h2 className="mt-7 max-w-[20ch] text-[clamp(1.9rem,4.2vw,3.3rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              {c.heading}
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/65">
              {c.body}
            </p>
            <p className="mono mt-5 text-[13px] text-ink/45">{c.metaLine}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${c.email}`}
                className="group mono inline-flex items-center gap-2 bg-ink px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-accent hover:text-white"
              >
                {c.email}
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {"->"}
                </span>
              </a>
              {[
                { label: "LinkedIn", href: c.linkedin },
                { label: "GitHub", href: c.github },
                { label: "Linktree", href: c.linktree },
                { label: c.phone, href: `tel:${c.tel}` },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mono inline-flex items-center border border-ink/25 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink/10"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
