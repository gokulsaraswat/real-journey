import { AdminShell } from "@/components/admin/admin-shell";
import { PublishWorkflowStudio } from "@/components/admin/publish-workflow-studio";

const workflowSteps = [
  {
    title: "Review the imported draft",
    note: "Start from upload analysis when possible so parser warnings and normalization notes stay attached to the content packet.",
  },
  {
    title: "Generate the release files",
    note: "This branch produces canonical MDX, manifest metadata, and release notes so Git stays the source of truth before database publishing arrives.",
  },
  {
    title: "Commit through Git",
    note: "Open the suggested branch, add the files to the repo, and link the GitHub issue or email thread before merge.",
  },
] as const;

const outputCards = [
  {
    title: "Canonical MDX",
    note: "Reader-ready content with frontmatter that matches the shared Real Journey content contract.",
  },
  {
    title: "Manifest JSON",
    note: "Structured metadata for later indexing, storage sync, and admin automation.",
  },
  {
    title: "Release notes",
    note: "A small merge checklist that keeps Git history, review notes, and preview paths visible.",
  },
] as const;

export default function AdminPublishPage() {
  return (
    <AdminShell
      eyebrow="Admin / Publish"
      title="Git-ready publish workflow"
      description="Package uploads into reviewable content files before auth, storage persistence, and background jobs arrive. This keeps your Git-based workflow clean across multiple ChatGPT branches."
      actions={[
        { label: "Back to uploads", href: "/admin/uploads", style: "secondary" },
        { label: "Open content lanes", href: "/admin/content", style: "secondary" },
        { label: "Admin dashboard", href: "/admin", style: "primary" },
      ]}
    >
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <PublishWorkflowStudio />

        <div className="space-y-6">
          <div className="card-surface p-6">
            <p className="text-lg font-semibold">Workflow steps</p>
            <div className="mt-4 grid gap-3">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{step.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <p className="text-lg font-semibold">Packet outputs</p>
            <div className="mt-4 grid gap-3">
              {outputCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4"
                >
                  <p className="text-sm font-semibold">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{card.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-6">
            <p className="text-lg font-semibold">Why this branch matters</p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
              Your main chat stays light when side branches can package content independently. This workspace turns upload review into a merge-friendly packet instead of asking the main thread to hold raw content and metadata history.
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
