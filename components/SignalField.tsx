"use client";

import { useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { SignalFallback } from "@/components/SignalFallback";

const SignalFieldGL = dynamic(() => import("@/components/SignalFieldGL"), {
  ssr: false,
  loading: () => <SignalFallback />,
});

// Capability gate as an external-store subscription: the GPU scene mounts only
// on wide, motion-friendly, WebGL-capable clients, and it responds live if the
// viewport or the motion preference changes. Everywhere else (and on the
// server) the static fallback stands in.
let webglCache: boolean | null = null;
function webglAvailable(): boolean {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

function subscribe(onChange: () => void): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wide = window.matchMedia("(min-width: 768px)");
  reduce.addEventListener("change", onChange);
  wide.addEventListener("change", onChange);
  return () => {
    reduce.removeEventListener("change", onChange);
    wide.removeEventListener("change", onChange);
  };
}

function getSnapshot(): boolean {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.matchMedia("(min-width: 768px)").matches &&
    webglAvailable()
  );
}

function getServerSnapshot(): boolean {
  return false;
}

export function SignalField() {
  const can3D = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      {can3D ? <SignalFieldGL /> : <SignalFallback />}
    </div>
  );
}
