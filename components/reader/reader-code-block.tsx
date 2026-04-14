"use client";

import { useEffect, useState } from "react";

type ReaderCodeBlockProps = {
  code: string;
  language: string;
  caption?: string;
};

export function ReaderCodeBlock({ code, language, caption }: ReaderCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[color:var(--card-border)] bg-[var(--background-elevated)]/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--card-border)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)] sm:px-5">
        <span>{language}</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
            } catch {
              setCopied(false);
            }
          }}
          className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] transition hover:bg-white/5"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto px-4 py-4 text-sm leading-7 sm:px-5">
        <code>{code}</code>
      </pre>

      {caption ? (
        <div className="border-t border-[color:var(--card-border)] px-4 py-3 text-sm leading-7 text-[var(--foreground-soft)] sm:px-5">
          {caption}
        </div>
      ) : null}
    </div>
  );
}
