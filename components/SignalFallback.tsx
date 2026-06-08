// Static signal field for reduced-motion, no-WebGL, and small screens.
// The same idea held still: a calm horizon with one luminous focal point.
// No animation, no GPU. The site stands entirely on its own with this.

export function SignalFallback() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="sf-glow" cx="86%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#ff3b12" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff3b12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#edeae0" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#edeae0" stopOpacity="0.55" />
          <stop offset="92%" stopColor="#ff3b12" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff3b12" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle cx="1240" cy="430" r="260" fill="url(#sf-glow)" />
      {/* a quiet growth curve resolving toward the focal point */}
      <path
        d="M 0 520 C 360 516, 720 500, 980 450 S 1300 300, 1440 250"
        fill="none"
        stroke="url(#sf-line)"
        strokeWidth="2"
      />
      <circle cx="1440" cy="250" r="3.5" fill="#ff3b12" />
    </svg>
  );
}
