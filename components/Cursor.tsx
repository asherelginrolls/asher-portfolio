"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    document.body.classList.add("cursor-none");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest(
        "a, button, input, textarea, [data-cursor]",
      );
      if (interactive !== hovering) {
        hovering = interactive;
        ring.style.setProperty("--s", hovering ? "2.4" : "1");
        ring.style.setProperty("--o", hovering ? "1" : "0.6");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(var(--s, 1))`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cur"
        aria-hidden
        style={{
          width: 34,
          height: 34,
          borderRadius: 9999,
          border: "1px solid #fff",
          opacity: "var(--o, 0.6)" as unknown as number,
          transition: "opacity 0.25s ease",
        }}
      />
      <div
        ref={dotRef}
        className="cur"
        aria-hidden
        style={{
          width: 6,
          height: 6,
          borderRadius: 9999,
          background: "#fff",
        }}
      />
    </>
  );
}
