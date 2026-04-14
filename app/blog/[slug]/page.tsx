import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogContributeCard } from "@/components/blog/blog-contribute-card";
import { BlogRelatedPosts } from "@/components/blog/blog-related-posts";
import { BlogRichContent } from "@/components/blog/blog-rich-content";
import {
  formatBlogDate,
  getAdjacentBlogPosts,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/data/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      title: post.title,
      description: post.summary,
      card: "summary_large_image",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post);
  const { previous, next } = getAdjacentBlogPosts(post.slug);

  return (
    <>
      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
          <article className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/blog" className="chip-subtle">
                Back to blog
              </Link>
              <span className="chip">{post.category}</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--foreground-soft)]">
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.audience}</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">{post.summary}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="surface-muted p-6">
                <p className="section-eyebrow">Article intent</p>
                <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">{post.excerpt}</p>
              </div>
              <div className="surface-muted p-6">
                <p className="section-eyebrow">Key takeaways</p>
                <ul className="mt-4 grid gap-3">
                  {post.takeaways.map((takeaway) => (
                    <li key={takeaway} className="rounded-2xl border border-[color:var(--card-border)] px-4 py-4 text-sm leading-7 text-[var(--foreground-soft)]">
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-[color:var(--card-border)] pt-12">
              <BlogRichContent sections={post.sections} />
            </div>
          </article>

          <aside className="grid gap-4 self-start xl:sticky xl:top-24">
            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Reading notes</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">Why this route matters</h2>
              <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
                The article page is reader-first today and can later move to MDX, richer references, code blocks, and dual reader modes without changing the route contract.
              </p>
            </div>

            <BlogContributeCard compact />

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Article navigation</p>
              <div className="mt-5 grid gap-3">
                {previous ? (
                  <Link href={`/blog/${previous.slug}`} className="rounded-3xl border border-[color:var(--card-border)] px-4 py-4 transition hover:-translate-y-0.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">Previous</p>
                    <p className="mt-2 text-sm font-medium leading-7">{previous.title}</p>
                  </Link>
                ) : null}

                {next ? (
                  <Link href={`/blog/${next.slug}`} className="rounded-3xl border border-[color:var(--card-border)] px-4 py-4 transition hover:-translate-y-0.5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">Next</p>
                    <p className="mt-2 text-sm font-medium leading-7">{next.title}</p>
                  </Link>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BlogRelatedPosts posts={relatedPosts} />
    </>
  );
}
