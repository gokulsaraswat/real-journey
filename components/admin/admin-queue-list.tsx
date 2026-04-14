import type { AdminQueueEntry } from "@/lib/data/admin";
import { AdminBadge, getKindTone, getStatusTone } from "@/components/admin/admin-badge";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

type AdminQueueListProps = {
  items: AdminQueueEntry[];
};

export function AdminQueueList({ items }: AdminQueueListProps) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article key={item.id} className="surface-muted p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-2">
                <AdminBadge tone={getKindTone(item.kind)}>{item.kind}</AdminBadge>
                <AdminBadge tone={getStatusTone(item.status)}>{item.status}</AdminBadge>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.nextStep}</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
              <p>Owner · {item.owner}</p>
              <p className="mt-1">Updated · {formatDate(item.updatedAt)}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
