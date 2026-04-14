import Link from "next/link";
import type { ReactNode } from "react";

type Action = {
  label: string;
  href: string;
  style: "primary" | "secondary";
  external?: boolean;
};

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
  actions?: Action[];
  children?: ReactNode;
};

function ActionLink({ action }: { action: Action }) {
  const className =
    action.style === "primary"
      ? "inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
      : "inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5";

  if (action.external || action.href.startsWith("mailto:")) {
    return (
      <a
        href={action.href}
        className={className}
        target={action.href.startsWith("http") ? "_blank" : undefined}
        rel={action.href.startsWith("http") ? "noreferrer" : undefined}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link href={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  highlights = [],
  actions = [],
  children,
}: PlaceholderPageProps) {
  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="card-surface overflow-hidden p-8 sm:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground-soft)]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">{description}</p>
        </div>

        {highlights.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <div key={highlight} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--accent-soft)] p-5">
                <p className="text-sm leading-7">{highlight}</p>
              </div>
            ))}
          </div>
        ) : null}

        {actions.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {actions.map((action) => (
              <ActionLink key={`${action.label}-${action.href}`} action={action} />
            ))}
          </div>
        ) : null}

        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
