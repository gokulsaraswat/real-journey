import type { Metadata } from "next";
import Link from "next/link";
import { BlogContributeCard } from "@/components/blog/blog-contribute-card";
import { BlogPostCard } from "@/components/blog/blog-post-card";
import { getAllBlogPosts, getBlogCategories, getFeaturedBlogPost } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing on architecture, workflow, reader design, taxonomy, and building Real Journey as a structured learning platform.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const featured = getFeaturedBlogPost();
  const remainingPosts = posts.filter((post) => post.slug !== featured.slug);
  const categories = getBlogCategories();

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-20">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
            <span className="chip">Feature branch · blog</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Writing that explains the system behind the product.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              This branch turns <code>/blog</code> into a real reading surface for Real Journey. The focus is calm technical writing around architecture, workflow, reader design, and deeper learning systems.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="btn-primary">
                Explore learning routes
              </Link>
              <Link href="/contribute" className="btn-secondary">
                Feedback + contribute
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{posts.length}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">Seed articles</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">Enough to establish the route, card system, and article page before MDX ingestion later.</p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{categories.length}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">Writing lanes</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">Architecture, workflow, reader design, taxonomy, and brand systems can all grow here without changing the route rules.</p>
              </div>
              <div className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">Git + mail</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">Feedback flow</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">Readers can respond through GitHub and email now, with richer contribution flows later.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Writing lanes</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Clear categories without overbuilding the filter system yet.
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
                Search, filtering, and MDX-backed publishing can land later. This patch focuses on a premium list page and strong article detail pages first.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category} className="chip-subtle">
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <BlogContributeCard compact />
          </div>
        </div>
      </section>

      <section className="page-shell py-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Featured article</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start with the post that best explains the product shape.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
            The featured post frames the bigger architecture problem first, so future articles can go deeper without repeating the same foundations.
          </p>
        </div>

        <div className="mt-6">
          <BlogPostCard post={featured} variant="featured" />
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">More writing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Recent posts for the rest of the system.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
            Every article is static for now, route-safe, and ready to be replaced by admin-managed content later without changing the page contract.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {remainingPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
