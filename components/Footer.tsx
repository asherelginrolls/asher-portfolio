import { contact } from "@/lib/data";

export function Footer() {
  return (
    <footer className="rule-t">
      <div className="wrap flex flex-col gap-4 py-9 sm:flex-row sm:items-center sm:justify-between">
        <span className="mono text-[12px] text-muted">
          © 2026 Asher Elgin Rolls · San Francisco
        </span>
        <span className="mono flex items-center gap-4 text-[12px]">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={contact.linktree}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            Linktree
          </a>
        </span>
      </div>
    </footer>
  );
}
