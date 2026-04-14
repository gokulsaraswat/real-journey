import type { ReactNode } from "react";

type AdminSectionCardProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function AdminSectionCard({
  eyebrow,
  title,
  description,
  children,
}: AdminSectionCardProps) {
  return (
    <section className="card-surface overflow-hidden p-6 sm:p-7">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
          {description}
        </p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}
