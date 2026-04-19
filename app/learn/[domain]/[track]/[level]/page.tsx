import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnBreadcrumbs } from "@/components/learn/learn-breadcrumbs";
import { LearnCollectionCard } from "@/components/learn/learn-collection-card";
import {
  getCategoriesForLevel,
  getCategoryHref,
  getCategoryStats,
  getDomainBySlug,
  getLevelBySlugs,
  getLevelParams,
  getLevelStats,
  getTrackBySlugs,
} from "@/lib/data/learn";

type LevelPageProps = {
  params: Promise<{ domain: string; track: string; level: string }>;
};

export function generateStaticParams() {
  return getLevelParams();
}

export async function generateMetadata({ params }: LevelPageProps): Promise<Metadata> {
  const { domain: domainSlug, track: trackSlug, level: levelSlug } = await params;
  const level = getLevelBySlugs(domainSlug, trackSlug, levelSlug);

  if (!level) {
    return { title: "Level not found" };
  }

  return {
    title: level.title,
    description: level.summary,
  };
}

export default async function LevelPage({ params }: LevelPageProps) {
  const { domain: domainSlug, track: trackSlug, level: levelSlug } = await params;
  const domain = getDomainBySlug(domainSlug);
  const track = getTrackBySlugs(domainSlug, trackSlug);
  const level = getLevelBySlugs(domainSlug, trackSlug, levelSlug);

  if (!domain || !track || !level) {
    notFound();
  }

  const categories = getCategoriesForLevel(level.id);
  const stats = getLevelStats(level.id);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface p-8 sm:p-10 lg:p-12">
          <LearnBreadcrumbs
            items={[
              { label: "Learn", href: "/learn" },
              { label: domain.title, href: `/learn/${domain.slug}` },
              { label: track.title, href: `/learn/${domain.slug}/${track.slug}` },
              { label: level.title },
            ]}
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div>
              <span className="chip">Level view</span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">{level.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {level.summary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.categories}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Categories
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.subcategories}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Subcategories
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

      <section className="page-shell pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Categories</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose the category that matches this level&apos;s strongest learning need.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
            Categories keep one level from becoming a wall of topics. They let you split the learning path into clear capability areas before readers dive into subcategory detail.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {categories.map((category) => {
            const categoryStats = getCategoryStats(category.id);
            return (
              <LearnCollectionCard
                key={category.id}
                eyebrow="Category"
                title={category.title}
                summary={category.summary}
                href={getCategoryHref(domain, track, level, category)}
                metricLabel="Category volume"
                metricValue={`${categoryStats.subcategories} subcategory · ${categoryStats.topics} topics`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
