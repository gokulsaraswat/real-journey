import Link from "next/link";
import type { BlogPost } from "@/lib/data/blog";
import { formatBlogDate } from "@/lib/data/blog";

type BlogPostCardProps = {
  post: BlogPost;
  variant?: "default" | "featured";
};

export function BlogPostCard({ post, variant = "default" }: BlogPostCardProps) {
  const isFeatured = variant === "featured";

  return (
    <article className={isFeatured ? "card-surface overflow-hidden p-8 sm:p-10" : "card-surface h-full p-6"}>
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
        <span>{post.category}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--foreground-soft)]/50" />
        <span>{formatBlogDate(post.publishedAt)}</span>
        <span className="h-1 w-1 rounded-full bg-[var(--foreground-soft)]/50" />
        <span>{post.readTime}</span>
      </div>

      <div className={isFeatured ? "mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]" : "mt-5"}>
        <div>
          <h2 className={isFeatured ? "text-3xl font-semibold tracking-tight sm:text-4xl" : "text-2xl font-semibold tracking-tight"}>
            <Link href={`/blog/${post.slug}`} className="transition hover:text-[var(--accent)]">
              {post.title}
            </Link>
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">{post.summary}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/blog/${post.slug}`} className="btn-primary">
              Read article
            </Link>
            <span className="text-sm text-[var(--foreground-soft)]">Written for {post.audience.toLowerCase()}.</span>
          </div>
        </div>

        {isFeatured ? (
          <div className="surface-muted p-6">
            <p className="section-eyebrow">Why this matters</p>
            <p className="mt-4 text-base leading-8 text-[var(--foreground-soft)]">{post.excerpt}</p>
            <div className="mt-6 grid gap-3">
              {post.takeaways.map((takeaway) => (
                <div key={takeaway} className="rounded-2xl border border-[color:var(--card-border)] px-4 py-4 text-sm leading-7 text-[var(--foreground-soft)]">
                  {takeaway}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
