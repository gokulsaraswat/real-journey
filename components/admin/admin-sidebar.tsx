"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/admin-sign-out-button";
import { adminNav } from "@/lib/data/admin";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
      <div className="card-surface p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
          Admin navigation
        </p>

        <div className="mt-4 grid gap-3">
          {adminNav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-3xl border px-4 py-4 transition ${
                  active
                    ? "border-transparent bg-[var(--accent-soft)]"
                    : "border-[color:var(--card-border)] bg-[var(--card-strong)] hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">{item.label}</p>
                  {item.badge ? (
                    <span className="rounded-full border border-[color:var(--card-border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="card-surface p-5">
        <p className="text-sm font-semibold">Storage model</p>
        <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">
          Source uploads can now be saved to Supabase Storage. Private items are routed to a separate bucket so story assets can stay isolated from the public learning path.
        </p>
      </div>

      <AdminSignOutButton />
    </aside>
  );
}
