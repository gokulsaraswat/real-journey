import Link from "next/link";

type LearnCollectionCardProps = {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  metricLabel?: string;
  metricValue?: string;
};

export function LearnCollectionCard({
  eyebrow,
  title,
  summary,
  href,
  metricLabel,
  metricValue,
}: LearnCollectionCardProps) {
  return (
    <Link
      href={href}
      className="card-surface group flex h-full flex-col justify-between p-6 transition hover:-translate-y-1"
    >
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">{summary}</p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-[color:var(--card-border)] pt-5">
        <div>
          {metricLabel && metricValue ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
                {metricLabel}
              </p>
              <p className="mt-2 text-xl font-semibold">{metricValue}</p>
            </>
          ) : null}
        </div>
        <span className="text-sm font-medium text-[var(--foreground-soft)] transition group-hover:text-[var(--foreground)]">
          Open route →
        </span>
      </div>
    </Link>
  );
}
