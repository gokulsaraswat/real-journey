import Link from "next/link";
import type { StoryEntry } from "@/lib/data/stories";
import {
  buildStoryDownloadHref,
  buildStoryHref,
  formatStoryDate,
  getRelatedStories,
} from "@/lib/data/stories";
import { StoryCard } from "@/components/stories/story-card";

type StoryReaderShellProps = {
  story: StoryEntry;
};

function buildBreadcrumbs(story: StoryEntry) {
  const rootHref = story.visibility === "private" ? "/stories/private" : "/stories";
  const segments = [
    { label: "Stories", href: "/stories" },
    ...(story.visibility === "private" ? [{ label: "Private", href: "/stories/private" }] : []),
    ...story.slugSegments.slice(0, -1).map((segment, index) => {
      const segmentPath = story.slugSegments.slice(0, index + 1).map((value) => encodeURIComponent(value)).join("/");
      const href = story.visibility === "private" ? `/stories/private/${segmentPath}` : `/stories/${segmentPath}`;
      return {
        label: segment.replace(/-/g, " "),
        href,
      };
    }),
  ];

  return {
    items: segments,
    rootHref,
  };
}

export function StoryReaderShell({ story }: StoryReaderShellProps) {
  const relatedStories = getRelatedStories(story, 3);
  const breadcrumbs = buildBreadcrumbs(story);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <article className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <Link href={breadcrumbs.rootHref} className="chip-subtle">
                {story.visibility === "private" ? "Back to private vault" : "Back to stories"}
              </Link>
              <span className="chip">{story.categoryLabel}</span>
              <span className="chip-subtle">{story.format}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--foreground-soft)]">
              <span>{formatStoryDate(story.updatedAt)}</span>
              <span>•</span>
              <span>{story.readTime}</span>
              <span>•</span>
              <span>{story.assetCount} assets</span>
              <span>•</span>
              <span>{story.visibility}</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{story.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              {story.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="surface-muted p-6">
                <p className="section-eyebrow">Story path</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--foreground-soft)]">
                  {breadcrumbs.items.map((item, index) => (
                    <span key={`${item.href}-${index}`} className="inline-flex items-center gap-2">
                      <Link href={item.href} className="rounded-full border border-[color:var(--card-border)] px-3 py-1.5 hover:bg-white/5">
                        {item.label}
                      </Link>
                      {index < breadcrumbs.items.length - 1 ? <span>›</span> : null}
                    </span>
                  ))}
                </div>
              </div>
              <div className="surface-muted p-6">
                <p className="section-eyebrow">Lead note</p>
                <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">{story.lead}</p>
              </div>
            </div>

            <div className="mt-12 space-y-10 border-t border-[color:var(--card-border)] pt-12">
              {story.sections.map((section) => (
                <section key={section.title} className="space-y-5">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
                  <div className="space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul className="grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-2xl border border-[color:var(--card-border)] px-4 py-4 text-sm leading-7 text-[var(--foreground-soft)]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.callout ? (
                    <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--accent-soft)] p-5 text-sm leading-7 text-[var(--foreground-soft)]">
                      {section.callout}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </article>

          <aside className="grid gap-4 self-start xl:sticky xl:top-24">
            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Collection</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{story.collectionTitle}</h2>
              <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
                {story.collectionSummary}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                {story.collectionStatus}
              </p>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Actions</p>
              <div className="mt-5 grid gap-3">
                <a href={buildStoryDownloadHref(story)} className="btn-primary">
                  Download source
                </a>
                <Link href={buildStoryHref(story)} className="btn-secondary">
                  Refresh reader
                </Link>
              </div>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Story role</p>
              <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
                {story.visibility === "private"
                  ? "This item lives in the private story vault and is separated from public learners by the auth boundary."
                  : "This item is public and can act as portfolio proof, reflective writing, or a guided reader page with a downloadable attachment."}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {relatedStories.length ? (
        <section className="page-shell pb-16 sm:pb-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="section-eyebrow">Related stories</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                More from this {story.visibility} lane
              </h2>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {relatedStories.map((relatedStory) => (
              <StoryCard key={relatedStory.id} story={relatedStory} showVisibility />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
