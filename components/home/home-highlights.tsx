import Link from "next/link";
import { featuredDomains, platformPrinciples } from "@/lib/data/home";

export function HomeHighlights() {
  return (
    <section className="page-shell py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card-surface p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
            What this patch solves
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A stable shell first, feature branches after.
          </h2>
          <div className="mt-8 space-y-4">
            {platformPrinciples.map((item) => (
              <div key={item.title} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.summary}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contribute"
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
            >
              Feedback + contribute
            </Link>
            <Link
              href="/admin"
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Admin shell
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {featuredDomains.map((domain) => (
            <div key={domain.title} className="card-surface p-6">
              <p className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]">
                {domain.badge}
              </p>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight">{domain.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{domain.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
