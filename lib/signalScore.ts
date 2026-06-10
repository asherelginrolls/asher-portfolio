// =============================================================================
// The score: which shape the signal line holds at every scroll position.
// Sections carry data-signal="horizon|growth|pipeline|system|settle".
// While the viewport anchor line sits inside a tagged section the line DWELLS
// (shape steady); it morphs only in the gaps between sections, eased. This is
// what makes the motion read as narration instead of decoration.
// Framework-free: measured from the DOM, consumed inside a rAF loop.
// =============================================================================

import type { SignalState } from "@/lib/data";
import { SIG_INDEX } from "@/lib/signalStates";

export type Hold = { state: number; from: number; to: number };
export type Score = Hold[];

// fraction of the viewport height where the "reading line" sits
const ANCHOR = 0.55;
// a hold begins/ends this fraction inside the section, so dwell zones
// breathe instead of snapping exactly at the border
const INSET = 0.15;

export function buildScore(): Score {
  const vh = window.innerHeight;
  const anchor = vh * ANCHOR;
  const holds: Hold[] = [];

  const els = document.querySelectorAll<HTMLElement>("[data-signal]");
  els.forEach((el) => {
    const name = el.dataset.signal as SignalState | undefined;
    if (!name || !(name in SIG_INDEX)) return;
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY;
    holds.push({
      state: SIG_INDEX[name],
      from: top + r.height * INSET - anchor,
      to: top + r.height * (1 - INSET) - anchor,
    });
  });

  holds.sort((a, b) => a.from - b.from);

  // merge adjacent holds of the same state into one dwell zone
  const merged: Score = [];
  for (const h of holds) {
    const last = merged[merged.length - 1];
    if (last && last.state === h.state) {
      last.to = Math.max(last.to, h.to);
    } else {
      merged.push({ ...h });
    }
  }

  if (merged.length > 0) {
    merged[0].from = Math.min(merged[0].from, 0);
    for (const m of merged) m.to = Math.max(m.to, m.from + 1);
  }
  return merged;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export type Sample = { s0: number; s1: number; e: number };

export function sampleScore(score: Score, y: number): Sample {
  if (score.length === 0) return { s0: 0, s1: 0, e: 0 };
  if (y <= score[0].from) {
    return { s0: score[0].state, s1: score[0].state, e: 0 };
  }
  for (let i = 0; i < score.length; i++) {
    const h = score[i];
    if (y >= h.from && y <= h.to) {
      return { s0: h.state, s1: h.state, e: 0 };
    }
    const next = score[i + 1];
    if (next && y > h.to && y < next.from) {
      const t = (y - h.to) / (next.from - h.to);
      return { s0: h.state, s1: next.state, e: easeInOutCubic(t) };
    }
  }
  const last = score[score.length - 1];
  return { s0: last.state, s1: last.state, e: 0 };
}
