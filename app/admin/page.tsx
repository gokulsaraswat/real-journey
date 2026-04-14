import Link from "next/link";
import { AdminQueueList } from "@/components/admin/admin-queue-list";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import {
  getAdminNavigation,
  getAdminOverviewStats,
  getAdminPublishingHealth,
  getAdminQueue,
} from "@/lib/data/admin";

export default function AdminPage() {
  const stats = getAdminOverviewStats();
  const health = getAdminPublishingHealth();
  const queue = getAdminQueue();
  const routes = getAdminNavigation().filter((item) => item.href !== "/admin");

  return (
    <>
      <AdminSectionCard
        eyebrow="Overview"
        title="Operations dashboard shell"
        description="This branch sets the admin route structure, dashboard surfaces, and route-safe places for uploads, taxonomy work, and private stories. Real auth and processing can land later without changing these URLs."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <AdminStatCard
              key={item.label}
              label={item.label}
              value={item.value}
              description={item.description}
            />
          ))}
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Publishing health"
        title="What needs attention next"
        description="Use this as the calm operating layer: drafts stay safe, review work stays visible, and published pages remain traceable."
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
        eyebrow="Queue"
        title="Current operating queue"
        description="These are seeded examples so the UI has stable cards now. The uploads branch can later replace them with real records from storage or a database."
      >
        <AdminQueueList items={queue} />
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Routes"
        title="Reserved admin lanes for the next branches"
        description="Each card below is already route-safe. That means future branches can focus on the feature itself instead of renegotiating URLs."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="card-surface p-5 transition hover:-translate-y-0.5"
            >
              <p className="text-lg font-semibold">{route.label}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{route.description}</p>
              <p className="mt-4 text-sm font-medium text-[var(--foreground-soft)]">{route.href}</p>
            </Link>
          ))}
        </div>
      </AdminSectionCard>
    </>
  );
}
