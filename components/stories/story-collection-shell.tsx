import Link from "next/link";
import type { StoryEntry, StoryVisibility } from "@/lib/data/stories";
import { StoryCard } from "@/components/stories/story-card";

type StoryCollectionShellProps = {
  stories: StoryEntry[];
  visibility: StoryVisibility;
  segments: string[];
};

function toLabel(value: string) {
  return value.replace(/-/g, " ");
}

export function StoryCollectionShell({ stories, visibility, segments }: StoryCollectionShellProps) {
  const firstStory = stories[0];
  const rootHref = visibility === "private" ? "/stories/private" : "/stories";
  const title = segments.length >= 3 ? firstStory.collectionTitle : `${toLabel(segments[segments.length - 1] ?? "stories")} collection`;
  const description =
    segments.length >= 3
      ? firstStory.collectionSummary
      : `Browse ${visibility} story entries that match the path ${segments.map(toLabel).join(" → ")}.`;

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl">
            <p className="section-eyebrow">{visibility} story collection</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{title}</h1>
            <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              {description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-[var(--foreground-soft)]">
            <Link href={rootHref} className="chip-subtle">
              Back to {visibility === "private" ? "private vault" : "stories"}
            </Link>
            {segments.map((segment, index) => (
              <span key={`${segment}-${index}`} className="chip-subtle">
                {toLabel(segment)}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Entries</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{stories.length}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Reader pages currently mapped to this story path.
              </p>
            </div>
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Visibility</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{visibility}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                {visibility === "private"
                  ? "Protected by the auth boundary and intended for sensitive or unfinished material."
                  : "Visible on the public site as portfolio proof, reflection, or guided reading."}
              </p>
            </div>
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Formats</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(new Set(stories.map((story) => story.format))).map((format) => (
                  <span key={format} className="chip-subtle">
                    {format}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} showVisibility />
          ))}
        </div>
      </section>
    </>
  );
}
