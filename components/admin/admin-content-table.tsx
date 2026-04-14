import type { AdminContentRow } from "@/lib/data/admin";
import {
  AdminBadge,
  getKindTone,
  getStatusTone,
  getVisibilityTone,
} from "@/components/admin/admin-badge";

type AdminContentTableProps = {
  rows: AdminContentRow[];
};

export function AdminContentTable({ rows }: AdminContentTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[color:var(--card-border)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--card-strong)] text-[var(--foreground-soft)]">
            <tr>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Visibility</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Route</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-[color:var(--card-border)] bg-[var(--card)] align-top">
                <td className="px-4 py-4 font-medium">{row.title}</td>
                <td className="px-4 py-4">
                  <AdminBadge tone={getKindTone(row.kind)}>{row.kind}</AdminBadge>
                </td>
                <td className="px-4 py-4">
                  <AdminBadge tone={getStatusTone(row.status)}>{row.status}</AdminBadge>
                </td>
                <td className="px-4 py-4">
                  <AdminBadge tone={getVisibilityTone(row.visibility)}>{row.visibility}</AdminBadge>
                </td>
                <td className="px-4 py-4 uppercase text-[var(--foreground-soft)]">.{row.sourceType}</td>
                <td className="px-4 py-4 text-[var(--foreground-soft)]">{row.route}</td>
                <td className="px-4 py-4 text-[var(--foreground-soft)]">{row.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
