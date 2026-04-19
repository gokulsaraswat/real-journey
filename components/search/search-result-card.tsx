import Link from "next/link";
import type { SearchDocument } from "@/lib/search/index";

type SearchResultCardProps = {
  document: SearchDocument;
};

const kindLabel: Record<SearchDocument["kind"], string> = {
  topic: "Topic",
  blog: "Blog",
  story: "Story",
};

export function SearchResultCard({ document }: SearchResultCardProps) {
  const visibleMeta = document.meta.slice(0, 3);
  const visibleTags = document.tags.slice(0, 4);

  return (
    <Link
      href={document.href}
      className="card-surface block h-full p-6 transition hover:-translate-y-1"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip-subtle">{kindLabel[document.kind]}</span>
        {document.badges.map((badge) => (
          <span key={badge} className="chip-subtle">
            {badge}
          </span>
        ))}
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight">{document.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">{document.summary}</p>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
        {document.trail}
      </p>

      <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--foreground-soft)]">
        {visibleMeta.map((item) => (
          <span key={item} className="rounded-full border border-[color:var(--card-border)] px-3 py-1">
            {item}
          </span>
        ))}
        {document.displayDate ? (
          <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1">
            {document.displayDate}
          </span>
        ) : null}
      </div>

      {visibleTags.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </Link>
  );
}
