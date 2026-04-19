import type { Metadata } from "next";
import Link from "next/link";
import { SearchDiscoveryGroup } from "@/components/search/search-discovery-group";
import { SearchQueryForm } from "@/components/search/search-query-form";
import { SearchResultCard } from "@/components/search/search-result-card";
import { SearchTypeTabs } from "@/components/search/search-type-tabs";
import {
  getSearchDiscovery,
  normalizeSearchType,
  searchDocuments,
  type SearchResultType
} from "@/lib/search/index";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[];
    type?: string | string[];
    page?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Real Journey across learning topics, blog posts, and public stories from one discovery surface.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: "/search"
  }
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePage(raw: string | undefined) {
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function buildSearchHref(query: string, type: SearchResultType, page: number) {
  const params = new URLSearchParams();
  params.set("q", query);
  if (type !== "all") {
    params.set("type", type);
  }
  if (page > 1) {
    params.set("page", String(page));
  }
  return `/search?${params.toString()}`;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (firstValue(params.q) ?? "").trim();
  const type = normalizeSearchType(firstValue(params.type));
  const page = parsePage(firstValue(params.page));
  const discovery = getSearchDiscovery();
  const resultBundle = query ? searchDocuments({ query, type, page, pageSize: 12 }) : null;

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-20">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
            <div>
              <p className="chip">Feature branch · search discovery</p>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
                Search across guides, writing, and public story trails from one place.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
                This patch adds one public discovery surface for topics, blog posts, and public stories.
                Private story-vault assets stay separate by design and are not indexed here.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{discovery.totals.topic}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Searchable topics
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{discovery.totals.blog}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Blog posts
                </p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{discovery.totals.story}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  Public stories
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[1.75rem] border border-[color:var(--card-border)] bg-[var(--card)] p-5 sm:p-6">
            <SearchQueryForm query={query} type={type} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {discovery.quickQueries.map((item) => (
              <Link key={item} href={`/search?q=${encodeURIComponent(item)}`} className="chip-subtle">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {resultBundle ? (
        <section className="page-shell pb-16 sm:pb-20">
          <div className="card-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-eyebrow">Search results</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {resultBundle.total} result{resultBundle.total === 1 ? "" : "s"} for “{resultBundle.query}”
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                  Topics, blogs, and public stories are ranked together by title, summary, tags, and
                  structural context.
                </p>
                <p role="status" aria-live="polite" className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  Showing {resultBundle.results.length} item{resultBundle.results.length === 1 ? "" : "s"} on this page.
                </p>
              </div>
              <div className="text-sm leading-7 text-[var(--foreground-soft)]">
                Page {resultBundle.page} of {Math.max(resultBundle.totalPages, 1)}
              </div>
            </div>

            <div className="mt-6">
              <SearchTypeTabs query={resultBundle.query} activeType={resultBundle.type} counts={resultBundle.counts} />
            </div>

            {resultBundle.results.length ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {resultBundle.results.map((document) => (
                  <SearchResultCard key={document.id} document={document} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[1.5rem] border border-dashed border-[color:var(--card-border)] p-8 text-center">
                <p className="text-xl font-semibold tracking-tight">No results yet</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                  Try a broader phrase like HTTP, architecture, certification, workflow, or incident response.
                </p>
              </div>
            )}

            {resultBundle.totalPages > 1 ? (
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--card-border)] pt-6">
                {resultBundle.page > 1 ? (
                  <Link
                    href={buildSearchHref(resultBundle.query, resultBundle.type, resultBundle.page - 1)}
                    className="btn-secondary"
                  >
                    Previous page
                  </Link>
                ) : (
                  <span />
                )}

                {resultBundle.page < resultBundle.totalPages ? (
                  <Link
                    href={buildSearchHref(resultBundle.query, resultBundle.type, resultBundle.page + 1)}
                    className="btn-secondary"
                  >
                    Next page
                  </Link>
                ) : null}
              </div>
            ) : null}

            {resultBundle.suggestions.length ? (
              <div className="mt-8 border-t border-[color:var(--card-border)] pt-6">
                <p className="section-eyebrow">Try next</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {resultBundle.suggestions.map((item) => (
                    <Link
                      key={item}
                      href={`/search?q=${encodeURIComponent(item)}`}
                      className="chip-subtle"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : (
        <>
          <section className="page-shell pb-6">
            <div className="card-surface p-8 sm:p-10">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="section-eyebrow">Discovery notes</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Search stays public, while private vault material remains separate.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">
                    Use public search for learning topics, blog writing, and public stories.
                    Personal vault items stay under the protected stories lane instead of leaking into search.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/learn" className="btn-primary">
                    Browse learn routes
                  </Link>
                  <Link href="/stories/private" className="btn-secondary">
                    Private vault
                  </Link>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {discovery.popularTags.map((tag) => (
                  <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="chip-subtle">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <SearchDiscoveryGroup
            eyebrow="Featured topics"
            title="Good places to start when the library gets large"
            description="Use curated entry points when you do not yet know the exact topic name."
            items={discovery.featuredTopics}
          />

          <SearchDiscoveryGroup
            eyebrow="Recent writing"
            title="Architecture and workflow notes"
            description="Writing stays separate from guides, but search lets both surfaces feel connected."
            items={discovery.recentBlogPosts}
          />

          <SearchDiscoveryGroup
            eyebrow="Public stories"
            title="Story trails that connect the human side of the work"
            description="Stories can be read online and still act like downloadable assets without mixing private vault material into the public index."
            items={discovery.storyTrails}
          />
        </>
      )}
    </>
  );
}
