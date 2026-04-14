import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type LearnBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function LearnBreadcrumbs({ items }: LearnBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[var(--foreground-soft)]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="transition hover:text-[var(--foreground)]">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-[var(--foreground)]" : undefined}>{item.label}</span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </div>
        );
      })}
    </nav>
  );
}
