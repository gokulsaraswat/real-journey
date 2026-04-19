type OpsExportCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  formatLabel: string;
  note: string;
};

export function OpsExportCard({
  eyebrow,
  title,
  description,
  href,
  formatLabel,
  note,
}: OpsExportCardProps) {
  return (
    <article className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">{eyebrow}</p>
        <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
          {formatLabel}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{description}</p>
      <p className="mt-4 text-sm leading-7">{note}</p>

      <div className="mt-5">
        <a href={href} className="btn-secondary">
          Download export
        </a>
      </div>
    </article>
  );
}
