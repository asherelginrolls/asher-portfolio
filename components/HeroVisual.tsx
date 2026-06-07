import { youtubeSeries } from "@/lib/data";

// Static SVG growth-ridge. Used as the loading + reduced-motion + mobile
// fallback for the 3D scene, and as a safe always-render visual.
export function HeroVisual({ animated = false }: { animated?: boolean }) {
  const W = 320;
  const H = 210;
  const pad = 8;
  const n = youtubeSeries.length;
  const pts = youtubeSeries.map((v, i) => {
    const x = pad + (i / (n - 1)) * (W - pad * 2);
    const y = H - pad - v * (H - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const area = `${line} L${pts[n - 1][0]},${H} L${pts[0][0]},${H} Z`;
  const end = pts[n - 1];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="YouTube growth from 7K to 100K subscribers"
    >
      <defs>
        <linearGradient id="ridge" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#ff3b12" stopOpacity="0" />
          <stop offset="1" stopColor="#ff3b12" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* grid */}
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={pad}
          x2={W - pad}
          y1={H - pad - g * (H - pad * 2)}
          y2={H - pad - g * (H - pad * 2)}
          stroke="rgba(241,239,231,0.12)"
          strokeWidth="1"
        />
      ))}

      <path d={area} fill="url(#ridge)" />
      <path
        d={line}
        fill="none"
        stroke="#ff3b12"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "ridge-draw" : undefined}
      />

      <circle cx={pts[0][0]} cy={pts[0][1]} r="3" fill="#f1efe7" />
      <circle cx={end[0]} cy={end[1]} r="4.5" fill="#fff" />
      <circle
        cx={end[0]}
        cy={end[1]}
        r="4.5"
        fill="none"
        stroke="#ff3b12"
        strokeWidth="1.5"
      />

      <text
        x={pts[0][0]}
        y={pts[0][1] - 10}
        fill="rgba(241,239,231,0.7)"
        style={{ font: "600 11px var(--font-mono)" }}
      >
        7K
      </text>
      <text
        x={end[0] - 4}
        y={end[1] - 12}
        textAnchor="end"
        fill="#f1efe7"
        style={{ font: "700 13px var(--font-mono)" }}
      >
        100K
      </text>
    </svg>
  );
}
