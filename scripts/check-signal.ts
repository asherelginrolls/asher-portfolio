// One-shot sanity harness for the signal choreography. Runs in Node, no DOM:
// feeds a synthetic score through sampleScore and checks lanes, dwell zones,
// eased transitions, and elevation ranges for every state.
import { PARAMS, ELEV, lerp } from "../lib/signalStates";
import { sampleScore, type Score } from "../lib/signalScore";

let failures = 0;
function check(name: string, ok: boolean, detail = "") {
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " :: " + detail : ""}`);
}

// synthetic page: holds shaped like the measured layout (vh=900, anchor=495)
const score: Score = [
  { state: 0, from: -300, to: 800 }, // hero+media horizon
  { state: 1, from: 1200, to: 1900 }, // growth
  { state: 2, from: 2300, to: 3100 }, // pipeline
  { state: 3, from: 3500, to: 4200 }, // system
  { state: 4, from: 4600, to: 20000 }, // settle
];

// 1. dwell: inside each hold the sample is pure (e === 0, s0 === s1)
for (const h of score) {
  const mid = (h.from + h.to) / 2;
  const s = sampleScore(score, mid);
  check(
    `dwell state ${h.state}`,
    s.s0 === h.state && s.s1 === h.state && s.e === 0,
    JSON.stringify(s)
  );
}

// 2. transition: between holds the blend moves 0 -> 1 monotonically
const t25 = sampleScore(score, 800 + 0.25 * 400);
const t50 = sampleScore(score, 800 + 0.5 * 400);
const t75 = sampleScore(score, 800 + 0.75 * 400);
check(
  "transition pair horizon->growth",
  t50.s0 === 0 && t50.s1 === 1,
  JSON.stringify(t50)
);
check(
  "transition eased + monotone",
  t25.e > 0 && t25.e < t50.e && t50.e < t75.e && t75.e < 1,
  `${t25.e.toFixed(3)} < ${t50.e.toFixed(3)} < ${t75.e.toFixed(3)}`
);
check("transition midpoint ~0.5", Math.abs(t50.e - 0.5) < 0.01, t50.e.toFixed(3));

// 3. before page start and after page end: clamped to first/last state
check("clamp start", sampleScore(score, -5000).s0 === 0);
check("clamp end", sampleScore(score, 99999).s0 === 4);

// 4. lanes: world y stays inside the camera frustum (-1..1) for every state
//    across the full line, and the hero lane clears the headline band
for (let s = 0; s < PARAMS.length; s++) {
  let min = Infinity;
  let max = -Infinity;
  for (let i = 0; i <= 200; i++) {
    const u = i / 200;
    for (const t of [0, 1.7, 9.3, 42.1]) {
      const y = PARAMS[s].base + (ELEV[s](u, t) - 0.5) * 2 * PARAMS[s].amp;
      min = Math.min(min, y);
      max = Math.max(max, y);
    }
  }
  check(
    `state ${s} inside frustum`,
    min > -1 && max < 1,
    `y in [${min.toFixed(3)}, ${max.toFixed(3)}]`
  );
  if (s === 0)
    check(
      "hero horizon clears headline band (y > 0.2)",
      min > 0.2,
      `min ${min.toFixed(3)}`
    );
  if (s === 4)
    check("settle sits low (max y < -0.5)", max < -0.5, `max ${max.toFixed(3)}`);
}

// 5. growth reads as a climb: right end far above left end
{
  const yl = PARAMS[1].base + (ELEV[1](0, 0) - 0.5) * 2 * PARAMS[1].amp;
  const yr = PARAMS[1].base + (ELEV[1](1, 0) - 0.5) * 2 * PARAMS[1].amp;
  check("growth climbs left->right", yr - yl > 0.6, `${yl.toFixed(2)} -> ${yr.toFixed(2)}`);
}

// 6. pipeline steps descend
{
  const ys = [0.1, 0.35, 0.6, 0.85].map(
    (u) => PARAMS[2].base + (ELEV[2](u, 0) - 0.5) * 2 * PARAMS[2].amp
  );
  check(
    "pipeline plateaus descend",
    ys[0] > ys[1] && ys[1] > ys[2] && ys[2] > ys[3],
    ys.map((y) => y.toFixed(2)).join(" > ")
  );
}

// 7. mid-transition lane interpolation stays in frustum (horizon -> growth)
{
  const s = sampleScore(score, 1000);
  const base = lerp(PARAMS[s.s0].base, PARAMS[s.s1].base, s.e);
  const amp = lerp(PARAMS[s.s0].amp, PARAMS[s.s1].amp, s.e);
  let ok = true;
  for (let i = 0; i <= 100; i++) {
    const u = i / 100;
    const elev = lerp(ELEV[s.s0](u, 3), ELEV[s.s1](u, 3), s.e);
    const y = base + (elev - 0.5) * 2 * amp;
    if (y <= -1 || y >= 1) ok = false;
  }
  check("mid-transition stays in frustum", ok);
}

console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
