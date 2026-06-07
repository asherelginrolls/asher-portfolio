"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { HeroVisual } from "@/components/HeroVisual";

const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => <HeroVisual />,
});

type View = {
  label: string;
  badge: string;
  axis: [string, string, string];
};

const VIEWS: View[] = [
  { label: "YouTube growth", badge: "+14×", axis: ["Nov 2023", "Subscribers", "Aug 2024"] },
  { label: "Campaign Instagram", badge: "10K→107K", axis: ["Nov 2025", "Followers", "Jun 2026"] },
  { label: "Enterprise pipeline", badge: "$1M+", axis: ["Mar 2025", "C-suite stage", "Oct 2025"] },
];

export function HeroInstrument() {
  const [view, setView] = useState(0);
  const [paused, setPaused] = useState(false);
  const [can3D, setCan3D] = useState(false);

  // Only mount the GPU scene on capable, motion-friendly, non-mobile clients.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setCan3D(!reduce && wide && webgl);
  }, []);

  // Auto-cycle the three data views.
  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setView((v) => (v + 1) % VIEWS.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const v = VIEWS[view];

  return (
    <div
      className="border border-ink bg-ink text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2.5">
        <span
          className="text-[10.5px] uppercase tracking-[0.16em] text-paper/70"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {v.label}
        </span>
        <span
          className="bg-accent px-2 py-0.5 text-[11px] font-bold text-white"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {v.badge}
        </span>
      </div>

      <div className="relative h-[300px] w-full sm:h-[340px] lg:h-[360px]">
        {can3D ? <Hero3D view={view} /> : <HeroVisual />}
      </div>

      <div
        className="flex items-center justify-between border-t border-paper/15 px-4 py-2 text-[10px] uppercase tracking-[0.1em] text-paper/45"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <span>{v.axis[0]}</span>
        <span>{v.axis[1]}</span>
        <span>{v.axis[2]}</span>
      </div>

      <div className="flex items-center justify-center gap-2 border-t border-paper/15 py-3">
        {VIEWS.map((view2, i) => (
          <button
            key={view2.label}
            onClick={() => setView(i)}
            aria-label={view2.label}
            aria-pressed={i === view}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === view ? "w-6 bg-accent" : "w-1.5 bg-paper/30 hover:bg-paper/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
