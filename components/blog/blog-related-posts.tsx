import { BlogPostCard } from "@/components/blog/blog-post-card";
import type { BlogPost } from "@/lib/data/blog";

type BlogRelatedPostsProps = {
  posts: BlogPost[];
};

export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="page-shell pb-16 sm:pb-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Keep reading</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Related writing from the same system.</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--foreground-soft)]">
          These posts stay close to architecture, learning design, workflow, and the shape of the platform behind Real Journey.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
