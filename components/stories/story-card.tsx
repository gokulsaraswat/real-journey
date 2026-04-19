import Link from "next/link";
import type { StoryEntry } from "@/lib/data/stories";
import { buildStoryHref, formatStoryDate } from "@/lib/data/stories";

type StoryCardProps = {
  story: StoryEntry;
  showVisibility?: boolean;
};

export function StoryCard({ story, showVisibility = false }: StoryCardProps) {
  return (
    <Link
      href={buildStoryHref(story)}
      className="card-surface block h-full p-6 transition hover:-translate-y-1"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
        <span className="chip-subtle">{story.categoryLabel}</span>
        <span className="chip-subtle">{story.readTime}</span>
        <span className="chip-subtle">{story.format}</span>
        {showVisibility ? <span className="chip-subtle">{story.visibility}</span> : null}
      </div>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight">{story.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">{story.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {story.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--foreground-soft)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--foreground-soft)]">
        <span>{formatStoryDate(story.updatedAt)}</span>
        <span>•</span>
        <span>{story.assetCount} assets</span>
        <span>•</span>
        <span>{story.audience}</span>
      </div>
    </Link>
  );
}
