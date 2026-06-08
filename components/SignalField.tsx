"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SignalFallback } from "@/components/SignalFallback";

const SignalFieldGL = dynamic(() => import("@/components/SignalFieldGL"), {
  ssr: false,
  loading: () => <SignalFallback />,
});

// Fixed field behind all content. Mounts the GPU scene only on capable,
// motion-friendly, wide clients; everywhere else the static fallback stands in.
export function SignalField() {
  const [can3D, setCan3D] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
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

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {can3D ? <SignalFieldGL /> : <SignalFallback />}
    </div>
  );
}
