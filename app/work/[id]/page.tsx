import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { work, contact } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/Footer";

// Closed set of four case studies, prerendered. Anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ id: w.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = work.find((w) => w.id === id);
  if (!item) return { title: "Work · Asher Elgin Rolls" };
  return {
    title: `${item.study.headline} · Asher Elgin Rolls`,
    description: item.study.intro,
  };
}

export default async function WorkCase({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = work.find((w) => w.id === id);
  if (!item) notFound();
  const s = item.study;

  return (
    <div className="relative z-10">
      {/* minimal chrome: this page is for reading */}
      <header className="fixed inset-x-0 top-0 z-50 bg-paper/80 backdrop-blur-md rule-b">
        <div className="wrap flex h-14 items-center justify-between">
          <Link
            href="/"
            className="mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
          >
            {"<- Asher Elgin Rolls"}
          </Link>
          <span className="label hidden sm:block">Case study</span>
          <a
            href={`mailto:${contact.email}`}
            className="mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-accent"
          >
            {"Let's talk"}
          </a>
        </div>
      </header>

      <main className="pt-28 sm:pt-36">
        <article className="wrap max-w-5xl pb-24">
          <Reveal y={0}>
            <div className="label flex items-center gap-3 text-accent">
              <span className="h-px w-7 bg-accent" />
              {item.tag}
            </div>
            <div className="mono mt-3 text-[13px] text-muted">{item.role}</div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-8 max-w-[18ch] text-balance text-[clamp(2.1rem,5.4vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {s.headline}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink/85 sm:text-[19px]">
              {s.intro}
            </p>
          </Reveal>

          <div className="mt-16 border-t border-ink/15">
            {s.sections.map((sec) => (
              <Reveal key={sec.kicker}>
                <section className="grid grid-cols-1 gap-5 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-8 md:py-12">
                  <div className="md:col-span-4">
                    <div className="label text-accent">{sec.kicker}</div>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="max-w-[26ch] text-[clamp(1.3rem,2.3vw,1.8rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
                      {sec.title}
                    </h2>
                    <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-muted">
                      {sec.body}
                    </p>
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4">
              {s.numbers.map((num) => (
                <div key={num.l}>
                  <div className="mono text-[clamp(1.7rem,3vw,2.4rem)] font-bold leading-none tracking-tight">
                    {num.n}
                  </div>
                  <div className="label mt-2.5">{num.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {s.coda ? (
            <Reveal>
              <p className="mt-16 max-w-[44ch] border-l-2 border-accent pl-5 text-[clamp(1.05rem,1.8vw,1.3rem)] font-medium leading-snug">
                {s.coda}
              </p>
            </Reveal>
          ) : null}

          <Reveal>
            <div className="mt-16 flex flex-wrap items-center gap-3">
              <Link
                href="/#work"
                className="mono inline-flex items-center gap-2 border border-ink/40 px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {"<- All work"}
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="group mono inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-paper transition-colors hover:border-accent hover:bg-accent hover:text-white"
              >
                Start a conversation
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  {"->"}
                </span>
              </a>
            </div>
          </Reveal>
        </article>
      </main>

      <Footer />
    </div>
  );
}
