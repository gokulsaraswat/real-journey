import { AdminTopicSectionCard } from "@/components/admin/admin-topic-section-card";
import type { TopicCatalogSection, TopicCatalogSummary } from "@/lib/topics/catalog";

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="card-surface p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{detail}</p>
    </article>
  );
}

export function AdminTopicCatalogShell({
  sections,
  summary,
}: {
  sections: TopicCatalogSection[];
  summary: TopicCatalogSummary;
}) {
  const domainHighlights = Object.entries(summary.byDomain)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Sections mapped"
          value={String(summary.totalSections)}
          detail="The admin catalog is ready to split the full master list into importable chunks."
        />
        <SummaryCard
          label="Topics staged"
          value={String(summary.totalTopics)}
          detail="This starter patch wires the catalog structure before the full 1000-topic seed lands."
        />
        <SummaryCard
          label="Published / ready"
          value={`${summary.byStatus.published + summary.byStatus.ready}`}
          detail="Use status to track which topics can already accept uploaded files versus which are only placeholders."
        />
        <SummaryCard
          label="Leader / CTO"
          value={String(summary.byLevel["leader-cto"])}
          detail="Senior roadmap topics stay visible in the same taxonomy so the app can scale beyond entry-level content."
        />
      </div>

      <section className="card-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          {domainHighlights.map(([domain, count]) => (
            <span
              key={domain}
              className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]"
            >
              {domain}: {count}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
          The catalog uses a parser-friendly structure so you can paste raw topic text, normalize it into sections and slugs, and then attach uploaded source files later without hardcoding hundreds of pages.
        </p>
      </section>

      <div className="grid gap-6">
        {sections.map((section) => (
          <AdminTopicSectionCard key={`${section.code}-${section.title}`} section={section} />
        ))}
      </div>
    </div>
  );
}
