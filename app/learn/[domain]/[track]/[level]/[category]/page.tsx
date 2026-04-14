import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnBreadcrumbs } from "@/components/learn/learn-breadcrumbs";
import { LearnCollectionCard } from "@/components/learn/learn-collection-card";
import {
  getCategoryBySlugs,
  getCategoryParams,
  getCategoryStats,
  getDomainBySlug,
  getLevelBySlugs,
  getSubcategoriesForCategory,
  getSubcategoryHref,
  getSubcategoryStats,
  getTrackBySlugs,
} from "@/lib/data/learn";

type CategoryPageProps = {
  params: Promise<{ domain: string; track: string; level: string; category: string }>;
};

export function generateStaticParams() {
  return getCategoryParams();
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const {
    domain: domainSlug,
    track: trackSlug,
    level: levelSlug,
    category: categorySlug,
  } = await params;
  const category = getCategoryBySlugs(domainSlug, trackSlug, levelSlug, categorySlug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.title,
    description: category.summary,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const {
    domain: domainSlug,
    track: trackSlug,
    level: levelSlug,
    category: categorySlug,
  } = await params;
  const domain = getDomainBySlug(domainSlug);
  const track = getTrackBySlugs(domainSlug, trackSlug);
  const level = getLevelBySlugs(domainSlug, trackSlug, levelSlug);
  const category = getCategoryBySlugs(domainSlug, trackSlug, levelSlug, categorySlug);

  if (!domain || !track || !level || !category) {
    notFound();
  }

  const subcategories = getSubcategoriesForCategory(category.id);
  const stats = getCategoryStats(category.id);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="card-surface p-8 sm:p-10 lg:p-12">
          <LearnBreadcrumbs
            items={[
              { label: "Learn", href: "/learn" },
              { label: domain.title, href: `/learn/${domain.slug}` },
              { label: track.title, href: `/learn/${domain.slug}/${track.slug}` },
              { label: level.title, href: `/learn/${domain.slug}/${track.slug}/${level.slug}` },
              { label: category.title },
            ]}
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="chip">Category</span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">{category.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {category.summary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
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
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">Leaf</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Next view
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Subcategories</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Narrow the category into concrete study clusters.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
            Subcategories are where this platform starts to feel like a library instead of a curriculum outline. They organize the final topic set into focused reading shelves.
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {subcategories.map((subcategory) => {
            const subcategoryStats = getSubcategoryStats(subcategory.id);
            return (
              <LearnCollectionCard
                key={subcategory.id}
                eyebrow="Subcategory"
                title={subcategory.title}
                summary={subcategory.summary}
                href={getSubcategoryHref(domain, track, level, category, subcategory)}
                metricLabel="Leaf volume"
                metricValue={`${subcategoryStats.topics} topics`}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
