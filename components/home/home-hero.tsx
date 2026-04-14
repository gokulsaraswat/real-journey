import Link from "next/link";
import { LoaderSlot } from "@/components/ui/loader-slot";
import { heroLabels, heroPills, heroStats, resumeSnapshot } from "@/lib/data/home";
import { siteConfig } from "@/lib/config/site";

export function HomeHero() {
  return (
    <section className="page-shell py-10 sm:py-14 lg:py-20">
      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <div className="card-surface overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip">Premium dark professional</span>
              <span className="text-sm text-[var(--foreground-soft)]">
                {siteConfig.owner} · {siteConfig.ownerTitle}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Build depth.
              <span className="mt-2 block text-[var(--foreground-soft)]">
                Learn with structure. Ship with calm systems thinking.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              {siteConfig.name} is Gokul Saraswat&apos;s portfolio-first learning platform for engineers who want
              a serious path from student foundations to architect, manager, and CTO-level thinking.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/learn" className="btn-primary">
                Explore learning
              </Link>
              <Link href="/blog" className="btn-secondary">
                Read the blog
              </Link>
              <Link href="/stories" className="btn-secondary">
                Personal stories
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroPills.map((pill) => (
                <span key={pill} className="chip-subtle">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {heroStats.map((item) => (
              <div key={item.label} className="surface-muted p-5">
                <p className="text-3xl font-semibold tracking-tight">{item.value}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <LoaderSlot />

          <div className="card-surface p-6 sm:p-8">
            <p className="section-eyebrow">Resume snapshot</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              Engineer-first identity. Learning system second.
            </h2>
            <div className="mt-6 grid gap-4">
              {resumeSnapshot.map((item) => (
                <div key={item.title} className="surface-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground)]">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6 sm:p-8">
            <p className="section-eyebrow">Current positioning</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {heroLabels.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[color:var(--card-border)] px-4 py-4">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
