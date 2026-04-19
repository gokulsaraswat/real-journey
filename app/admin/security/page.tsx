import Link from "next/link";
import { AdminSecurityChecklist } from "@/components/admin/admin-security-checklist";
import { AdminSecurityStatusGrid } from "@/components/admin/admin-security-status-grid";
import { AdminShell } from "@/components/admin/admin-shell";
import { siteConfig } from "@/lib/config/site";
import { getSecurityStatus, securityChecklist } from "@/lib/security/status";

export const dynamic = "force-dynamic";

export default function AdminSecurityPage() {
  const statusItems = getSecurityStatus();

  return (
    <AdminShell
      eyebrow="Admin"
      title="Security hardening"
      description="Review origin checks, admin protection, upload limits, and response headers before promoting the next production build."
      actions={[
        { label: "Back to admin", href: "/admin", style: "secondary" },
        { label: "Operations", href: "/admin/operations", style: "secondary" },
        { label: "GitHub repo", href: siteConfig.githubRepoUrl, style: "secondary", external: true },
      ]}
    >
      <div className="space-y-6">
        <AdminSecurityStatusGrid items={statusItems} />

        <section className="card-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-lg font-semibold">What changed in this patch</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
                Middleware now applies stronger default headers across the app. Sensitive write routes enforce same-origin requests,
                no-store responses, and starter rate limits. Admin upload flows also validate size, extension, and mime type before
                parsing or storage handoff.
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Check admin access
            </Link>
          </div>
        </section>

        <AdminSecurityChecklist items={securityChecklist} />
      </div>
    </AdminShell>
  );
}
