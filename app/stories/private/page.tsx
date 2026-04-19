import Link from "next/link";
import { StoryCard } from "@/components/stories/story-card";
import {
  getPrivateStories,
  getStoryCollectionSummaries,
} from "@/lib/data/stories";

export default function PrivateStoriesPage() {
  const privateStories = getPrivateStories();
  const privateCollections = getStoryCollectionSummaries("private");

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl">
            <p className="section-eyebrow">Private story vault</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Admin-only story packs for interviews, private study, and code-heavy working sets.
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              This lane is protected so sensitive material stays separate from the public story and
              learning surfaces. Use it for personal reflections, company-specific notes, and raw
              resources that may later evolve into cleaner public content.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Private collections</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{privateCollections.length}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Separate working lanes for interviews, certification stacks, and code labs.
              </p>
            </div>
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Private entries</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{privateStories.length}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Each item still gets a premium reader page and a generated source download.
              </p>
            </div>
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Promotion path</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">Private → public</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Once a private note becomes stable, promote the cleaned result into a public guide or story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Collection map</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Private collections behind the vault boundary
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {privateCollections.map((collection) => (
            <Link key={collection.id} href={collection.href} className="card-surface block p-6 transition hover:-translate-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip-subtle">{collection.status}</span>
                <span className="chip-subtle">{collection.count} entries</span>
              </div>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{collection.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                {collection.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {collection.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[var(--foreground-soft)]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Private stories</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Sensitive notes and working assets
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {privateStories.map((story) => (
            <StoryCard key={story.id} story={story} showVisibility />
          ))}
        </div>
      </section>
    </>
  );
}
