import { marquee } from "@/lib/data";

// Meaningful context strip: real channels, clients, and outcomes, not filler.
export function Marquee() {
  return (
    <div
      className="marquee-host rule-t rule-b overflow-hidden bg-paper-2/50 py-3 text-ink backdrop-blur-sm"
      aria-label="Channels, clients, and outcomes"
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center"
            aria-hidden={dup === 1 ? true : undefined}
          >
            {marquee.map((item) => (
              <li
                key={item}
                className="flex items-center gap-6 whitespace-nowrap px-6"
              >
                <span className="mono text-[11px] uppercase tracking-[0.16em] text-ink/65">
                  {item}
                </span>
                <span className="text-accent" aria-hidden="true">
                  ✶
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
