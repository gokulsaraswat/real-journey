import Link from "next/link";
import { LoaderSlot } from "@/components/ui/loader-slot";
import { heroStats } from "@/lib/data/home";
import { siteConfig } from "@/lib/config/site";

export function HomeHero() {
  return (
    <section className="page-shell py-10 sm:py-14 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
        <div className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground-soft)]">
              Premium dark professional starter
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {siteConfig.owner}
              <span className="mt-2 block text-[var(--foreground-soft)]">{siteConfig.ownerTitle}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              Real Journey is a portfolio-first learning platform designed to grow from student foundations to architect, manager, and CTO-level systems thinking.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
            >
              Explore learning
            </Link>
            <Link
              href="/blog"
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Visit blog
            </Link>
            <Link
              href="/stories"
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Open stories
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <LoaderSlot />
          <div className="card-surface p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
              Resume snapshot
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
              <li>Portfolio-led homepage with your identity and future resume highlights.</li>
              <li>Structured learning architecture for 500+ topics.</li>
              <li>Blogs, downloadable files, and reading-first topic pages.</li>
              <li>ChatGPT multi-branch friendly project workflow from day one.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
