import type { Metadata } from "next";
import Link from "next/link";
import { LearnCollectionCard } from "@/components/learn/learn-collection-card";
import { LearnTopicCard } from "@/components/learn/learn-topic-card";
import {
  getAllDomains,
  getDomainHref,
  getDomainStats,
  getLearnOverviewStats,
  getSpotlightTopics,
  getTopicHref,
} from "@/lib/data/learn";

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Browse Real Journey by domain, track, level, category, subcategory, and topic without hardcoding hundreds of pages.",
};

export default function LearnPage() {
  const domains = getAllDomains();
  const stats = getLearnOverviewStats();
  const spotlightTopics = getSpotlightTopics(6);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-20">
        <div className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
          <span className="chip">Feature branch · learn taxonomy</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
            A route tree that can hold hundreds of learning topics cleanly.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            Real Journey now has a proper learning taxonomy: domain, track, level, category,
            subcategory, and topic routes. This patch is about navigation and structure first, so the
            future reader mode can plug into a stable content map.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/blog" className="btn-secondary">
              Open blog
            </Link>
            <Link href="/contribute" className="btn-primary">
              Suggest a path
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="surface-muted p-5">
              <p className="text-3xl font-semibold tracking-tight">{stats.domains}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                Domains
              </p>
            </div>
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
              <p className="text-3xl font-semibold tracking-tight">{stats.topics}+</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                Seed topics
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Domains</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start from the engineering stream you want to grow in.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
            Domain pages give you tracks, example topics, and the exact route shape that can later be
            driven by admin-managed content instead of seed data.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {domains.map((domain) => {
            const domainStats = getDomainStats(domain.id);
            return (
              <LearnCollectionCard
                key={domain.id}
                eyebrow="Domain"
                title={domain.title}
                summary={domain.summary}
                href={getDomainHref(domain)}
                metricLabel="Route volume"
                metricValue={`${domainStats.tracks} tracks · ${domainStats.topics} topics`}
              />
            );
          })}
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="card-surface p-6 sm:p-7">
            <p className="section-eyebrow">Why this patch matters</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              The content model is no longer tied to one flat learn page.
            </h2>
            <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
              This is the branch that makes 500+ topics realistic later. You can now route learners by
              domain, career track, current level, and focused topic cluster without rewriting the URL
              structure each time the library grows.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl border border-[color:var(--card-border)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Example ladder route
                </p>
                <p className="mt-2 text-sm leading-7">
                  /learn/it/engineering-ladder/job-ready-engineer/core-computing/http-deep-dive
                </p>
              </div>
              <div className="rounded-3xl border border-[color:var(--card-border)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Topic route
                </p>
                <p className="mt-2 text-sm leading-7">/topic/http-request-lifecycle</p>
              </div>
              <div className="rounded-3xl border border-[color:var(--card-border)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Next branch after merge
                </p>
                <p className="mt-2 text-sm leading-7">feature/reader</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Spotlight topics</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Sample leaves from the new taxonomy.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
                These are only seed nodes. The real benefit is the route contract, not the initial topic count.
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {spotlightTopics.map(({ topic, context }) => (
                <LearnTopicCard
                  key={topic.id}
                  topic={topic}
                  href={getTopicHref(topic)}
                  contextLabel={`${context.domain.title} · ${context.track.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
