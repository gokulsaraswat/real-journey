import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnBreadcrumbs } from "@/components/learn/learn-breadcrumbs";
import { LearnCollectionCard } from "@/components/learn/learn-collection-card";
import { LearnTopicCard } from "@/components/learn/learn-topic-card";
import {
  getDomainBySlug,
  getDomainHref,
  getDomainParams,
  getDomainStats,
  getFeaturedTopicsForDomain,
  getTopicHref,
  getTrackHref,
  getTrackStats,
  getTracksForDomain,
} from "@/lib/data/learn";

type DomainPageProps = {
  params: Promise<{ domain: string }>;
};

export function generateStaticParams() {
  return getDomainParams();
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const { domain: domainSlug } = await params;
  const domain = getDomainBySlug(domainSlug);

  if (!domain) {
    return { title: "Domain not found" };
  }

  return {
    title: `${domain.title} learning paths`,
    description: domain.summary,
  };
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { domain: domainSlug } = await params;
  const domain = getDomainBySlug(domainSlug);

  if (!domain) {
    notFound();
  }

  const tracks = getTracksForDomain(domain.id);
  const stats = getDomainStats(domain.id);
  const spotlightTopics = getFeaturedTopicsForDomain(domain.id, 4);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface p-8 sm:p-10 lg:p-12">
          <LearnBreadcrumbs
            items={[
              { label: "Learn", href: "/learn" },
              { label: domain.title },
            ]}
          />

          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-4xl">
              <span className="chip">Domain</span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">{domain.title}</h1>
              <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {domain.summary}
              </p>
            </div>

            <div className="grid min-w-full gap-4 sm:min-w-[22rem] sm:grid-cols-3 lg:min-w-[26rem] lg:grid-cols-1 xl:min-w-[20rem]">
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.tracks}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Tracks
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.levels}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Levels
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
            <p className="section-eyebrow">Tracks</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Pick the lane you want to travel inside {domain.title}.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
            The track layer lets you expand each domain later without breaking the URL contract or crowding learners with one giant index page.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {tracks.map((track) => {
            const trackStats = getTrackStats(track.id);
            return (
              <LearnCollectionCard
                key={track.id}
                eyebrow="Track"
                title={track.title}
                summary={track.summary}
                href={getTrackHref(domain, track)}
                metricLabel="Track volume"
                metricValue={`${trackStats.levels} levels · ${trackStats.topics} topics`}
              />
            );
          })}
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="card-surface p-6 sm:p-7">
            <p className="section-eyebrow">How to use this domain</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Start with a track, then narrow down by your current level.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
              This page is intentionally simple: one domain, a small set of tracks, and enough context to help a learner choose the right route without scanning every topic up front.
            </p>
            <div className="mt-6 rounded-3xl border border-[color:var(--card-border)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                Domain entry route
              </p>
              <p className="mt-2 text-sm leading-7">{getDomainHref(domain)}</p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Spotlight topics</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Examples inside {domain.title}.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
                Leaf topics already point to a dedicated topic route so the reader branch can attach later without changing taxonomy navigation.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {spotlightTopics.map(({ topic, context }) => (
                <LearnTopicCard
                  key={topic.id}
                  topic={topic}
                  href={getTopicHref(topic)}
                  contextLabel={`${context.track.title} · ${context.level.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
