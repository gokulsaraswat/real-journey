import type { Metadata } from "next";
import { OpsExportCard } from "@/components/admin/ops/ops-export-card";
import { OpsSummaryGrid } from "@/components/admin/ops/ops-summary-grid";
import { siteConfig } from "@/lib/config/site";
import { getOpsStatusSnapshot } from "@/lib/ops/status";

export const metadata: Metadata = {
  title: "Admin Ops",
  robots: {
    index: false,
    follow: false,
  },
};

const exportCards = [
  {
    eyebrow: "Manifest",
    title: "Export operations manifest",
    description:
      "One compact JSON file with site identity, environment readiness, storage bucket names, and export endpoints for recovery planning.",
    href: "/api/admin/ops/export/manifest",
    formatLabel: "JSON",
    note: "Use this first when moving environments or documenting the current release state.",
  },
  {
    eyebrow: "Bundle",
    title: "Export content bundle",
    description:
      "Download a structured JSON snapshot of seeded topics, blog posts, and stories with visibility markers and taxonomy trails.",
    href: "/api/admin/ops/export/content-bundle",
    formatLabel: "JSON",
    note: "Good for backups, audits, migration scripts, and cold-start recovery notes.",
  },
  {
    eyebrow: "Inventory",
    title: "Export public inventory CSV",
    description:
      "Get a spreadsheet-friendly CSV of public topics, blog posts, and public stories for quick review in Sheets or Excel.",
    href: "/api/admin/ops/export/public-inventory",
    formatLabel: "CSV",
    note: "Use this for public audits, QA checks, and release checklists.",
  },
  {
    eyebrow: "Search",
    title: "Export search snapshot",
    description:
      "Capture search totals, popular tags, and sample result sets for the built-in discovery queries.",
    href: "/api/admin/ops/export/search-snapshot",
    formatLabel: "JSON",
    note: "Useful when checking search quality before a release or before changing ranking logic.",
  },
] as const;

const recoverySteps = [
  "Export the manifest before changing environment variables or storage bucket names.",
  "Export the content bundle after major uploads, publish batches, or taxonomy migrations.",
  "Keep the public inventory CSV for quick human review during release QA.",
  "Use the search snapshot before changing search scoring or content ingestion rules.",
] as const;

export default function AdminOpsPage() {
  const status = getOpsStatusSnapshot();

  const summaryItems = [
    {
      label: "Total topics",
      value: String(status.content.topics),
      note: `${status.content.domains} domains across ${status.content.tracks} tracks and ${status.content.levels} levels.`,
    },
    {
      label: "Blog posts",
      value: String(status.content.blogPosts),
      note: "Portfolio and platform posts included in the current search surface.",
    },
    {
      label: "Stories",
      value: `${status.content.publicStories} public / ${status.content.privateStories} private`,
      note: "Private stories stay separated from the public reader and public exports.",
    },
    {
      label: "Search documents",
      value: String(status.content.searchDocuments),
      note: "Discovery surface currently indexes topics, blogs, and public stories.",
    },
  ];

  const readinessItems = [
    {
      label: "Supabase client",
      value: status.auth.supabaseConfigured ? "Ready" : "Missing",
      note: status.auth.supabaseConfigured
        ? "Publishable URL and key are present for auth-aware flows."
        : "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.",
    },
    {
      label: "Service role",
      value: status.auth.serviceRoleConfigured ? "Ready" : "Missing",
      note: status.auth.serviceRoleConfigured
        ? "Service role key is available for storage and admin-only automation."
        : "Add SUPABASE_SERVICE_ROLE_KEY before storage-heavy production tasks.",
    },
    {
      label: "Admin allowlist",
      value: status.auth.adminAllowlistConfigured ? `${status.auth.adminEmailsConfigured} configured` : "Missing",
      note: status.auth.adminAllowlistConfigured
        ? "Allowed admin emails can enter the protected workspace."
        : "Set ADMIN_EMAIL_ALLOWLIST before relying on admin-only routes.",
    },
    {
      label: "Feedback wiring",
      value: status.integrations.feedbackReady ? "Ready" : "Partial",
      note: status.integrations.feedbackReady
        ? "GitHub repo URL and feedback email are available for contribution flows."
        : "Check NEXT_PUBLIC_GITHUB_REPO_URL and NEXT_PUBLIC_FEEDBACK_EMAIL.",
    },
  ];

  return (
    <section className="page-shell py-12 sm:py-14">
      <div className="space-y-8">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
              Admin ops
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Backup exports, environment readiness, and calm recovery notes.
            </h1>
            <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              This workspace gives Real Journey a small operations surface: export the current content map,
              inspect configuration readiness, and keep lightweight recovery artifacts before big changes.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/api/admin/ops/export/manifest" className="btn-primary">
              Export manifest
            </a>
            <a href="/api/admin/ops/status" className="btn-secondary">
              View live status JSON
            </a>
          </div>
        </div>

        <OpsSummaryGrid items={summaryItems} />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-6">
            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Export studio</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">Download the current state before risky changes.</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
                These exports are branch-safe and environment-safe. They do not mutate content. They only package the current
                seeded structure so you can audit, migrate, or recover faster.
              </p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {exportCards.map((card) => (
                  <OpsExportCard key={card.href} {...card} />
                ))}
              </div>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Recovery sequence</p>
              <div className="mt-5 grid gap-4">
                {recoverySteps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                      Step {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 sm:text-base">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Readiness snapshot</p>
              <div className="mt-5 grid gap-4">
                {readinessItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-base font-semibold">{item.label}</p>
                      <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                        {item.value}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Storage buckets</p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Admin uploads
                  </p>
                  <p className="mt-3 font-mono text-sm sm:text-base">{status.storage.adminUploadBucket}</p>
                </div>
                <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Private stories
                  </p>
                  <p className="mt-3 font-mono text-sm sm:text-base">{status.storage.privateStoryBucket}</p>
                </div>
              </div>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Ops note</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">Keep exports small, stable, and human-readable.</p>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
                {siteConfig.name} is built to work with focused branches. These exports follow the same idea: short,
                understandable artifacts that help recovery without turning admin work into a fragile custom system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
