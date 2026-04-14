import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t header-border bg-[var(--chrome)]">
      <div className="page-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
              {siteConfig.name}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Portfolio, learning system, blog, and personal stories in one place.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
              Patch 1 keeps the shell stable so feature branches can move fast without bloating the main chat.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link className="rounded-2xl border border-[color:var(--card-border)] px-4 py-3 text-sm font-medium text-[var(--foreground-soft)] transition hover:bg-white/5 hover:text-[var(--foreground)]" href="/contribute">
              Contribute
            </Link>
            <Link className="rounded-2xl border border-[color:var(--card-border)] px-4 py-3 text-sm font-medium text-[var(--foreground-soft)] transition hover:bg-white/5 hover:text-[var(--foreground)]" href="/admin">
              Admin
            </Link>
            <a
              className="rounded-2xl border border-[color:var(--card-border)] px-4 py-3 text-sm font-medium text-[var(--foreground-soft)] transition hover:bg-white/5 hover:text-[var(--foreground)]"
              href={siteConfig.githubRepoUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub placeholder
            </a>
            <a
              className="rounded-2xl border border-[color:var(--card-border)] px-4 py-3 text-sm font-medium text-[var(--foreground-soft)] transition hover:bg-white/5 hover:text-[var(--foreground)]"
              href={siteConfig.feedbackEmailHref}
            >
              Email feedback
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--card-border)] pt-6 text-sm text-[var(--foreground-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {new Date().getFullYear()} {siteConfig.owner}. Built for a multi-branch workflow.
          </p>
          <p>Main chat owns architecture. Feature chats own isolated execution.</p>
        </div>
      </div>
    </footer>
  );
}
