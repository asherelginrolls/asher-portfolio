"use client";

import { useEffect, useState } from "react";
import { nav, hero } from "@/lib/data";

export function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "bg-paper/80 backdrop-blur-md rule-b"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="wrap flex h-14 items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2" aria-label="Home">
          <span className="size-1.5 translate-y-[-1px] rounded-full bg-accent blink" />
          <span className="text-[15px] font-semibold tracking-tight">
            Asher Elgin Rolls
          </span>
          <span className="label ml-1 hidden sm:block">SF</span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2">
          <ul className="mr-2 hidden items-center gap-5 md:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${hero.email}`}
            className="group inline-flex items-center gap-2 border border-ink bg-ink px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] text-paper transition-colors hover:bg-accent hover:border-accent"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {"Let's talk"}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              {"->"}
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
