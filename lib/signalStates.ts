// =============================================================================
// The signal line's vocabulary. Five states, one per chapter of the arc:
//   horizon  — the media years. Flat, patient, barely breathing.
//   growth   — the real YouTube 7K -> 100K series. The loudest moment.
//   pipeline — four descending enterprise plateaus (Daikin first).
//   system   — the three prior shapes superposed into one calm carrier wave.
//   settle   — a quiet baseline low in the frame. The story has landed.
// Pure math, no React, no three.js. Shared by the GL renderer and any
// SVG fallback so both speak the same shape.
// =============================================================================

import { youtubeSeries, pipeline, type SignalState } from "@/lib/data";

export const SIG_INDEX: Record<SignalState, number> = {
  horizon: 0,
  growth: 1,
  pipeline: 2,
  system: 3,
  settle: 4,
};

export type StateParams = {
  /** lane centre in ortho world y (camera spans -1..1) */
  base: number;
  /** vertical reach around the lane centre */
  amp: number;
  /** accent span in u, lerped continuously so one highlight travels */
  focal: [number, number];
  /** line opacity target */
  opacity: number;
  /** bloom strength target */
  bloom: number;
};

// Lane choreography. The hero horizon sits in the open band between the nav
// and the bottom-anchored headline; growth climbs out of the basement;
// settle sinks to a dim floor once the story is told.
export const PARAMS: StateParams[] = [
  { base: 0.38, amp: 0.05, focal: [0.97, 1.0], opacity: 0.55, bloom: 0.5 }, // horizon
  { base: -0.12, amp: 0.52, focal: [0.86, 1.0], opacity: 0.5, bloom: 0.65 }, // growth
  { base: 0.0, amp: 0.34, focal: [0.0, 0.25], opacity: 0.5, bloom: 0.6 }, // pipeline
  { base: 0.0, amp: 0.18, focal: [0.45, 0.6], opacity: 0.5, bloom: 0.55 }, // system
  { base: -0.62, amp: 0.03, focal: [0.0, 0.03], opacity: 0.28, bloom: 0.4 }, // settle
];

const pipeW = pipeline.map((p) => p.w);

// cosine-interpolated sample of a normalized series: no polyline kinks,
// no overshoot, the climb still reads as the real data
function sampleSeries(series: number[], u: number): number {
  const x = u * (series.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = series[Math.min(i, series.length - 1)];
  const b = series[Math.min(i + 1, series.length - 1)];
  const g = (1 - Math.cos(f * Math.PI)) / 2;
  return a + (b - a) * g;
}

function horizon(u: number, t: number): number {
  // held breath, nothing more (~2px of swell at viewport scale)
  return 0.5 + Math.sin(u * 5 + t * 0.2) * 0.04;
}

function growth(u: number): number {
  return sampleSeries(youtubeSeries, u);
}

function pipeStep(u: number): number {
  const k = Math.min(pipeW.length - 1, Math.floor(u * pipeW.length));
  return pipeW[k];
}

function system(u: number, t: number): number {
  // the arc, superposed: a slow carrier + a whisper of the growth curve
  // + a whisper of the pipeline steps. Deterministic, slow phase drift only.
  return (
    0.5 +
    Math.sin(u * Math.PI * 6 + t * 0.15) * 0.1 +
    (growth(u) - 0.5) * 0.1 +
    (pipeStep(u) - 0.5) * 0.08
  );
}

function settle(u: number, t: number): number {
  return horizon(u, t);
}

export const ELEV: ((u: number, t: number) => number)[] = [
  horizon,
  (u) => growth(u),
  (u) => pipeStep(u),
  system,
  settle,
];

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
