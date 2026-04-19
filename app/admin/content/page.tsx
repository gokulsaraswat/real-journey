import { AdminReleaseChecklist } from "@/components/admin/admin-release-checklist";
import { AdminShell } from "@/components/admin/admin-shell";
import { contentLanes, releaseChecklist } from "@/lib/data/admin";

const publishBenefits = [
  "Generate Git-ready MDX instead of pasting large content blobs back into the main branch chat.",
  "Keep upload analysis, route decisions, and release notes together before database persistence exists.",
  "Make branch handoffs safer because every packet includes a suggested branch name, commit message, and review notes.",
] as const;

export default function AdminContentPage() {
  return (
    <AdminShell
      eyebrow="Admin / Content"
      title="Editorial pipeline"
      description="Manage draft, review, scheduled, and published content for blogs, guides, and story-driven resources without changing route contracts."
      actions={[
        { label: "Open uploads", href: "/admin/uploads", style: "secondary" },
        { label: "Publish workspace", href: "/admin/publish", style: "primary" },
      ]}
    >
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
        <div className="card-surface p-6 sm:p-7">
          <p className="text-lg font-semibold">Status lanes</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            Keep one workflow for blogs, learning topics, and downloadable resources. That makes future search, scheduling, and analytics easier to add.
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {contentLanes.map((lane) => (
              <div
                key={lane.label}
                className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-base font-semibold">{lane.label}</p>
                  <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs font-medium text-[var(--foreground-soft)]">
                    {lane.count}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{lane.note}</p>
                <ul className="mt-4 grid gap-2 text-sm text-[var(--foreground-soft)]">
                  {lane.items.map((item) => (
                    <li key={item} className="rounded-2xl border border-[color:var(--card-border)] px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <AdminReleaseChecklist items={releaseChecklist} />

          <div className="card-surface p-6">
            <p className="text-lg font-semibold">Why the publish workspace matters</p>
            <div className="mt-4 grid gap-3">
              {publishBenefits.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4"
                >
                  <p className="text-sm leading-6 text-[var(--foreground-soft)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
