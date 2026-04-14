import Link from "next/link";
import { previewBlogs, storyCollections } from "@/lib/data/home";

export function HomeWritingPreview() {
  return (
    <section className="page-shell py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="card-surface p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-eyebrow">Writing preview</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                A homepage preview of the blog without coupling this patch to the blog branch.
              </h2>
            </div>
            <Link href="/blog" className="btn-secondary">
              Open blog route
            </Link>
          </div>

          <div className="mt-8 grid gap-4 xl:grid-cols-3">
            {previewBlogs.map((post) => (
              <article key={post.title} className="surface-muted flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{post.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-[var(--foreground-soft)]">{post.summary}</p>
                <p className="mt-5 text-sm font-medium">{post.status}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card-surface p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-eyebrow">Personal stories</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                Private and public collections can live side by side.
              </h2>
            </div>
            <Link href="/stories" className="chip-subtle">
              View stories route
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {storyCollections.map((collection) => (
              <article key={collection.title} className="surface-muted p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{collection.title}</h3>
                  <span className="chip-subtle">{collection.visibility}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{collection.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collection.examples.map((example) => (
                    <span key={example} className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]">
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
