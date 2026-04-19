import Link from "next/link";
import { StoryCard } from "@/components/stories/story-card";
import {
  getPublicStories,
  getStoryCollectionSummaries,
} from "@/lib/data/stories";
import { siteConfig } from "@/lib/config/site";

export default function StoriesPage() {
  const publicStories = getPublicStories();
  const publicCollections = getStoryCollectionSummaries("public");
  const featuredStories = publicStories.slice(0, 3);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl">
            <p className="section-eyebrow">Personal stories</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Public proof on the outside, private working material behind the vault.
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              Stories let Real Journey show the human side of the engineering path: build logs,
              certification trails, reflections, interview journeys, and personal assets that can
              live as both reader pages and downloadable files.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/stories/private" className="btn-primary">
              Open private vault
            </Link>
            <a href={siteConfig.feedbackEmailHref} className="btn-secondary">
              Send a story note
            </a>
            <a href={siteConfig.githubRepoUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              Git contribution path
            </a>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Public lane</p>
              <p className="mt-4 text-lg font-semibold">Portfolio proof and curated learning trails</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Best for build logs, public certification paths, and reflective essays that help
                learners understand your journey.
              </p>
            </div>
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Private lane</p>
              <p className="mt-4 text-lg font-semibold">Interview files, private notes, and raw working sets</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Best for company-specific prep, personal code packs, and assets that need auth and
                stricter separation.
              </p>
            </div>
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Reader + file</p>
              <p className="mt-4 text-lg font-semibold">Each story can act like an ebook and a download</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Read online in the premium interface, then keep a generated source file for offline
                reference or future edits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Public collections</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Collections visible to learners and recruiters
            </h2>
          </div>
          <span className="chip-subtle">{publicCollections.length} collections</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {publicCollections.map((collection) => (
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

      <section className="page-shell py-10 sm:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Featured public stories</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Reader-first entries with downloadable source files
            </h2>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="card-surface p-8 sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="section-eyebrow">Private separation</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Private stories stay separate by design.
              </h2>
              <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)]">
                The private vault is intended for sensitive interview notes, personal code packs,
                and revision material that should not be exposed on the public site. Patch 11 uses
                the auth boundary introduced in the earlier admin work so private routes are gated.
              </p>
            </div>

            <div className="grid gap-3">
              <Link href="/stories/private" className="btn-primary">
                Go to private vault
              </Link>
              <Link href="/login?reason=private-stories&next=/stories/private" className="btn-secondary">
                Login for private lane
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
