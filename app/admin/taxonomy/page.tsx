import { AdminSectionCard } from "@/components/admin/admin-section-card";
import {
  getAdminLevelLabels,
  getAdminTaxonomyPrinciples,
  getAdminTaxonomySummary,
} from "@/lib/data/admin";
import { getAllDomains } from "@/lib/data/learn";

export default function AdminTaxonomyPage() {
  const summary = getAdminTaxonomySummary();
  const principles = getAdminTaxonomyPrinciples();
  const levels = getAdminLevelLabels();
  const domains = getAllDomains();

  return (
    <>
      <AdminSectionCard
        eyebrow="Taxonomy"
        title="Scale the content tree without hardcoded pages"
        description="This screen keeps the hierarchy visible for future edits. The goal is to let new sectors, levels, and topics enter through data instead of ad hoc route work."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="surface-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Current summary
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p>Domains · {summary.domains}</p>
              <p>Tracks · {summary.tracks}</p>
              <p>Levels · {summary.levels}</p>
              <p>Categories · {summary.categories}</p>
              <p>Subcategories · {summary.subcategories}</p>
              <p>Topics · {summary.topics}</p>
            </div>
          </div>
          <div className="surface-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Active domains
            </p>
            <div className="mt-4 grid gap-3">
              {domains.map((domain) => (
                <div key={domain.id} className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-3">
                  <p className="font-medium">{domain.title}</p>
                  <p className="mt-1 text-sm text-[var(--foreground-soft)]">/{domain.slug}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-muted p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Career ladder labels
            </p>
            <div className="mt-4 grid gap-3">
              {levels.map((level, index) => (
                <div key={level} className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-3">
                  <p className="font-medium">Level {index + 1}</p>
                  <p className="mt-1 text-sm text-[var(--foreground-soft)]">{level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Governance"
        title="Rules that keep the structure merge-safe"
        description="These principles are especially important because you want multiple ChatGPT feature branches to work in parallel without stepping on the same route contracts."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <article key={principle.title} className="card-surface p-5">
              <h3 className="text-lg font-semibold">{principle.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{principle.body}</p>
            </article>
          ))}
        </div>
      </AdminSectionCard>
    </>
  );
}
