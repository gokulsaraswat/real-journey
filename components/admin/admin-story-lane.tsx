import type { AdminStoryCollection } from "@/lib/data/admin";
import { AdminBadge, getVisibilityTone } from "@/components/admin/admin-badge";

type AdminStoryLaneProps = {
  collection: AdminStoryCollection;
};

export function AdminStoryLane({ collection }: AdminStoryLaneProps) {
  return (
    <article className="card-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <AdminBadge tone={getVisibilityTone(collection.visibility)}>{collection.visibility}</AdminBadge>
          <h3 className="mt-4 text-lg font-semibold">{collection.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{collection.summary}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-3 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">Items</p>
          <p className="mt-2 text-2xl font-semibold">{collection.items}</p>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
        {collection.path}
      </div>
    </article>
  );
}
