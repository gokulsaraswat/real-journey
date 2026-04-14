import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnBreadcrumbs } from "@/components/learn/learn-breadcrumbs";
import { LearnCollectionCard } from "@/components/learn/learn-collection-card";
import { LearnTopicCard } from "@/components/learn/learn-topic-card";
import {
  getDomainBySlug,
  getFeaturedTopicsForTrack,
  getLevelHref,
  getLevelsForTrack,
  getTopicHref,
  getTrackBySlugs,
  getTrackParams,
  getTrackStats,
} from "@/lib/data/learn";

type TrackPageProps = {
  params: Promise<{ domain: string; track: string }>;
};

export function generateStaticParams() {
  return getTrackParams();
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { domain: domainSlug, track: trackSlug } = await params;
  const track = getTrackBySlugs(domainSlug, trackSlug);

  if (!track) {
    return { title: "Track not found" };
  }

  return {
    title: track.title,
    description: track.summary,
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { domain: domainSlug, track: trackSlug } = await params;
  const domain = getDomainBySlug(domainSlug);
  const track = getTrackBySlugs(domainSlug, trackSlug);

  if (!domain || !track) {
    notFound();
  }

  const levels = getLevelsForTrack(track.id);
  const stats = getTrackStats(track.id);
  const spotlightTopics = getFeaturedTopicsForTrack(track.id, 4);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface p-8 sm:p-10 lg:p-12">
          <LearnBreadcrumbs
            items={[
              { label: "Learn", href: "/learn" },
              { label: domain.title, href: `/learn/${domain.slug}` },
              { label: track.title },
            ]}
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <div>
              <span className="chip">Track</span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">{track.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {track.summary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.levels}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Levels
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.categories}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Categories
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.topics}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Topics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Levels</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Move through this track one level at a time.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
            Each level page narrows the learner further into categories and subcategories, keeping the system easy to expand without overwhelming the first click.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {levels.map((level, index) => (
            <LearnCollectionCard
              key={level.id}
              eyebrow={`Level ${index + 1}`}
              title={level.title}
              summary={level.summary}
              href={getLevelHref(domain, track, level)}
              metricLabel="Next step"
              metricValue="Open categories"
            />
          ))}
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="card-surface p-6 sm:p-7">
            <p className="section-eyebrow">Design note</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Levels are where the curriculum begins to feel personal.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
              Someone can enter the same domain and choose a different level immediately. That keeps the library relevant for students, senior engineers, and leadership-minded readers inside one system.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Track highlights</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Topics seeded inside this track.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
                Topic pages are route-safe now and can gain the ebook/docs reader experience in the next branch.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {spotlightTopics.map(({ topic, context }) => (
                <LearnTopicCard
                  key={topic.id}
                  topic={topic}
                  href={getTopicHref(topic)}
                  contextLabel={`${context.level.title} · ${context.category.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
