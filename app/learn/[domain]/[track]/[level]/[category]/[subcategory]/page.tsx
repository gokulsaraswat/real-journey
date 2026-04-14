import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnBreadcrumbs } from "@/components/learn/learn-breadcrumbs";
import { LearnTopicCard } from "@/components/learn/learn-topic-card";
import {
  getDomainBySlug,
  getLevelBySlugs,
  getSubcategoryBySlugs,
  getSubcategoryParams,
  getSubcategoryStats,
  getTopicHref,
  getTopicsForSubcategory,
  getTrackBySlugs,
  getCategoryBySlugs,
} from "@/lib/data/learn";

type SubcategoryPageProps = {
  params: Promise<{
    domain: string;
    track: string;
    level: string;
    category: string;
    subcategory: string;
  }>;
};

export function generateStaticParams() {
  return getSubcategoryParams();
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const {
    domain: domainSlug,
    track: trackSlug,
    level: levelSlug,
    category: categorySlug,
    subcategory: subcategorySlug,
  } = await params;
  const subcategory = getSubcategoryBySlugs(
    domainSlug,
    trackSlug,
    levelSlug,
    categorySlug,
    subcategorySlug,
  );

  if (!subcategory) {
    return { title: "Subcategory not found" };
  }

  return {
    title: subcategory.title,
    description: subcategory.summary,
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const {
    domain: domainSlug,
    track: trackSlug,
    level: levelSlug,
    category: categorySlug,
    subcategory: subcategorySlug,
  } = await params;
  const domain = getDomainBySlug(domainSlug);
  const track = getTrackBySlugs(domainSlug, trackSlug);
  const level = getLevelBySlugs(domainSlug, trackSlug, levelSlug);
  const category = getCategoryBySlugs(domainSlug, trackSlug, levelSlug, categorySlug);
  const subcategory = getSubcategoryBySlugs(
    domainSlug,
    trackSlug,
    levelSlug,
    categorySlug,
    subcategorySlug,
  );

  if (!domain || !track || !level || !category || !subcategory) {
    notFound();
  }

  const topics = getTopicsForSubcategory(subcategory.id);
  const stats = getSubcategoryStats(subcategory.id);

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
              { label: category.title, href: `/learn/${domain.slug}/${track.slug}/${level.slug}/${category.slug}` },
              { label: subcategory.title },
            ]}
          />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div>
              <span className="chip">Subcategory shelf</span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">{subcategory.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                {subcategory.summary}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{stats.topics}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Topics
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">Reader</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Next branch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Topics</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Final leaves inside this shelf.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">
            Topic routes exist now so you can attach a richer reading surface later without changing how learners browse the taxonomy.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
            <LearnTopicCard
              key={topic.id}
              topic={topic}
              href={getTopicHref(topic)}
              contextLabel={`${domain.title} · ${track.title}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
