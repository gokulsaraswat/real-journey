import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Accessibility notes, keyboard support, reduced motion behavior, and contact paths for Real Journey.",
  alternates: {
    canonical: "/accessibility",
  },
};

const commitments = [
  "Keyboard-first navigation with a visible skip link and descriptive page titles.",
  "Dark and light themes with support for higher contrast and reduced motion preferences.",
  "Reader, search, and contribution flows designed to stay usable as the library grows.",
] as const;

const supportWays = [
  {
    title: "GitHub issue or pull request",
    copy: "Use the contribution path when the problem can be described publicly or fixed in code or content.",
    href: "/contribute",
    label: "Open contribution page",
  },
  {
    title: "Direct email",
    copy: "Use email when the report contains private details, access issues, or content that should stay off public threads.",
    href: siteConfig.feedbackEmailHref,
    label: "Email accessibility feedback",
  },
] as const;

export default function AccessibilityPage() {
  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="space-y-6">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10 lg:p-12">
          <div className="max-w-4xl">
            <p className="section-eyebrow">Accessibility</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
              Real Journey aims to stay readable, keyboard-friendly, and calm under scale.
            </h1>
            <p className="mt-6 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              This page explains how navigation, theme behavior, reader flows, and feedback work today.
              The goal is practical accessibility for portfolio pages, deep reading, long search sessions, and future contributor workflows.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {commitments.map((item) => (
              <div key={item} className="surface-muted p-5">
                <p className="text-sm leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="card-surface p-6 sm:p-7">
            <p className="section-eyebrow">Current support</p>
            <div className="mt-5 space-y-6 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Keyboard and navigation</h2>
                <p className="mt-3">
                  The site includes a skip link to jump directly to the main content area, route titles for screen-reader announcements, and visible focus styles on interactive controls.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Motion and theme</h2>
                <p className="mt-3">
                  Reduced-motion preferences disable most hover and transition effects. Dark and light mode are both supported, and stronger borders appear when higher contrast is requested by the operating system.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">Reader and search</h2>
                <p className="mt-3">
                  Topic pages expose clear headings, outline navigation, and source downloads. Search uses labeled controls and keeps private story-vault material out of the public index.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Need help?</p>
              <div className="mt-5 grid gap-4">
                {supportWays.map((item) => (
                  <div key={item.title} className="rounded-[1.5rem] border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                    <h2 className="text-xl font-semibold tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.copy}</p>
                    {item.href.startsWith("/") ? (
                      <Link href={item.href} className="btn-secondary mt-5">
                        {item.label}
                      </Link>
                    ) : (
                      <a href={item.href} className="btn-secondary mt-5">
                        {item.label}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">Roadmap note</p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">Performance and accessibility checks now belong in CI.</p>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                This patch adds browser checks for keyboard navigation and Lighthouse CI budgets so regressions get caught before they land on main.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
