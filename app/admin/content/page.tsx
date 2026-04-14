import { AdminContentTable } from "@/components/admin/admin-content-table";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { getAdminContentRows, getAdminPublishingHealth } from "@/lib/data/admin";

export default function AdminContentPage() {
  const rows = getAdminContentRows();
  const health = getAdminPublishingHealth();

  return (
    <>
      <AdminSectionCard
        eyebrow="Content"
        title="Drafts, review, and published entries"
        description="This table acts as the admin content library shell. Later it can hydrate from a database without changing the route or the screen purpose."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {health.map((item) => (
            <div key={item.label} className="surface-muted p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                {item.label}
              </p>
              <p className="mt-4 text-3xl font-semibold tracking-tight">{item.value}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Library"
        title="Seeded content registry"
        description="The rows below represent topics, blogs, stories, and private resources. Upload and publish branches can replace the seed with live data later."
      >
        <AdminContentTable rows={rows} />
      </AdminSectionCard>
    </>
  );
}
