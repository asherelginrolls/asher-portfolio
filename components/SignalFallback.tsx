// Static signal field for reduced-motion, no-WebGL, and small screens.
// The same idea held still: a calm horizon in the open band above the
// headline, with one luminous focal point at its tip. No animation, no GPU.
// The lane matches the GL hero state (PARAMS[0] in lib/signalStates).

export function SignalFallback() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sf-glow" cx="92%" cy="31%" r="32%">
          <stop offset="0%" stopColor="#ff3b12" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff3b12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#edeae0" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#edeae0" stopOpacity="0.5" />
          <stop offset="93%" stopColor="#ff3b12" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff3b12" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx="1325" cy="278" r="220" fill="url(#sf-glow)" />
      {/* the horizon, holding its breath */}
      <path
        d="M 0 282 C 360 281, 720 280, 1000 279 S 1320 277, 1440 276"
        fill="none"
        stroke="url(#sf-line)"
        strokeWidth="2"
      />
      <circle cx="1432" cy="276" r="3.5" fill="#ff3b12" />
    </svg>
  );
}
