import type { TopicStatus } from "@/lib/topics/catalog";

const labelMap: Record<TopicStatus, string> = {
  planned: "Planned",
  ready: "Ready",
  draft: "Draft",
  published: "Published",
};

const classMap: Record<TopicStatus, string> = {
  planned: "border-[color:var(--card-border)] bg-[var(--card-strong)] text-[var(--foreground-soft)]",
  ready: "border-transparent bg-[var(--accent-soft)] text-[var(--foreground)]",
  draft: "border-transparent bg-[rgba(255,255,255,0.08)] text-[var(--foreground)]",
  published: "border-transparent bg-[rgba(16,185,129,0.14)] text-[var(--foreground)]",
};

export function AdminTopicStatusPill({ status }: { status: TopicStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${classMap[status]}`}>
      {labelMap[status]}
    </span>
  );
}
