import Link from "next/link";
import type { TopicCatalogSection } from "@/lib/topics/catalog";
import { AdminTopicStatusPill } from "@/components/admin/admin-topic-status-pill";

function levelLabel(level: string) {
  switch (level) {
    case "foundation":
      return "Foundation";
    case "engineer":
      return "Engineer";
    case "advanced-engineer":
      return "Advanced";
    case "architect":
      return "Architect";
    case "leader-cto":
      return "Leader / CTO";
    default:
      return level;
  }
}

export function AdminTopicSectionCard({ section }: { section: TopicCatalogSection }) {
  return (
    <article className="card-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
              Section {section.code}
            </p>
            {section.rangeLabel ? (
              <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
                {section.rangeLabel}
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{section.title}</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            {section.topics.length} topics are mapped in this section. Use this page to track whether a topic is only planned, ready for upload, already drafted, or fully published.
          </p>
        </div>

        <Link
          href={`/admin/uploads?section=${section.code}`}
          className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
        >
          Upload into section
        </Link>
      </div>

      <div className="mt-6 grid gap-3">
        {section.topics.slice(0, 8).map((topic) => (
          <div
            key={`${section.code}-${topic.number}`}
            className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                  #{topic.number} · {topic.domain} · {levelLabel(topic.level)}
                </p>
                <h3 className="mt-2 text-base font-semibold">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">/{topic.slug}</p>
              </div>

              <AdminTopicStatusPill status={topic.status} />
            </div>
          </div>
        ))}
      </div>

      {section.topics.length > 8 ? (
        <p className="mt-4 text-sm text-[var(--foreground-soft)]">
          + {section.topics.length - 8} more topics in this section will appear once real catalog data is connected.
        </p>
      ) : null}
    </article>
  );
}
