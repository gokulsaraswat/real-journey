"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { AdminNavigationItem, AdminQuickAction } from "@/lib/data/admin";
import { siteConfig } from "@/lib/config/site";

type AdminShellProps = {
  navigation: AdminNavigationItem[];
  quickActions: AdminQuickAction[];
  children: ReactNode;
};

export function AdminShell({ navigation, quickActions, children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <section className="page-shell py-10 sm:py-12">
      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
        <aside className="lg:sticky lg:top-24">
          <div className="card-surface overflow-hidden p-5">
            <div className="rounded-[1.25rem] border border-[color:var(--card-border)] bg-[var(--accent-soft)] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
                Admin workspace
              </p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">Real Journey Ops</h1>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                Stable admin routes now. Auth and file processing can plug in later without changing the dashboard paths.
              </p>
            </div>

            <div className="mt-5 rounded-[1.25rem] border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4">
              <p className="text-sm font-semibold">Owner</p>
              <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                {siteConfig.owner} · {siteConfig.ownerTitle}
              </p>
            </div>

            <nav className="mt-5 grid gap-2">
              {navigation.map((item) => {
                const active = item.href === "/admin" ? pathname === item.href : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-[1.25rem] border px-4 py-4 transition ${
                      active
                        ? "border-[color:var(--card-border)] bg-[var(--accent-soft)]"
                        : "border-[color:var(--card-border)] bg-[var(--card-strong)] hover:-translate-y-0.5"
                    }`}
                  >
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{item.description}</p>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5 grid gap-3">
              {quickActions.map((action) => {
                const className =
                  action.tone === "primary"
                    ? "btn-primary w-full"
                    : "btn-secondary w-full";

                return (
                  <a
                    key={action.href}
                    href={action.href}
                    className={className}
                    target={action.external && action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.external && action.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {action.label}
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="grid gap-6">{children}</div>
      </div>
    </section>
  );
}
