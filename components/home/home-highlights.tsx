import Link from "next/link";
import { featuredDomains, platformPrinciples, portfolioPillars } from "@/lib/data/home";

export function HomeHighlights() {
  return (
    <section className="page-shell py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-surface p-8 sm:p-10">
          <p className="section-eyebrow">Engineering profile</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A homepage that reads like a focused resume, not just a landing page.
          </h2>
          <p className="mt-5 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
            This patch turns the homepage into a sharper portfolio surface while keeping the learning platform
            vision visible underneath it.
          </p>

          <div className="mt-8 grid gap-4">
            {portfolioPillars.map((item) => (
              <div key={item.title} className="surface-muted p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="chip-subtle">{item.badge}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.summary}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contribute" className="btn-primary">
              Feedback + contribute
            </Link>
            <Link href="/stories" className="btn-secondary">
              Open personal stories
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="card-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="section-eyebrow">Featured learning paths</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Stronger entry points for IT, AI, and Cyber Security.
                </h3>
              </div>
              <Link href="/learn" className="chip-subtle">
                View all paths
              </Link>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {featuredDomains.map((domain) => (
                <article key={domain.title} className="surface-muted p-5">
                  <p className="chip-subtle">{domain.badge}</p>
                  <h4 className="mt-4 text-xl font-semibold tracking-tight">{domain.title}</h4>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{domain.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {domain.topics.map((topic) => (
                      <span key={topic} className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]">
                        {topic}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {platformPrinciples.map((item) => (
              <div key={item.title} className="card-surface p-6">
                <p className="section-eyebrow">{item.kicker}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
