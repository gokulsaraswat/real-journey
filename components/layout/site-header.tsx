"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/lib/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems = useMemo(
    () => siteConfig.mainNav.filter((item) => !item.hideInPrimaryNav),
    [],
  );

  return (
    <header className="sticky top-0 z-50 border-b header-border bg-[var(--chrome)] backdrop-blur-xl">
      <div className="page-shell">
        <div className="flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] text-sm font-semibold">
              RJ
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-[0.22em] text-[var(--foreground-soft)] uppercase">
                {siteConfig.name}
              </p>
              <p className="truncate text-sm text-[var(--foreground-soft)]">
                {siteConfig.owner} - {siteConfig.ownerTitle}
              </p>
            </div>
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                      : "text-[var(--foreground-soft)] hover:bg-white/5 hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link
              href="/login"
              className="rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {open ? (
          <div id="mobile-navigation" className="card-surface mb-4 p-4 lg:hidden">
            <nav aria-label="Mobile primary navigation" className="grid gap-2">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-[var(--accent-soft)] text-[var(--foreground)]"
                        : "text-[var(--foreground-soft)] hover:bg-white/5 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-[color:var(--card-border)] pt-4">
              <ThemeToggle compact />
              <Link
                href="/login"
                className="rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 py-2 text-sm font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
