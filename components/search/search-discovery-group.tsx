import type { SearchDocument } from "@/lib/search/index";
import { SearchResultCard } from "@/components/search/search-result-card";

type SearchDiscoveryGroupProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: SearchDocument[];
};

export function SearchDiscoveryGroup({
  eyebrow,
  title,
  description,
  items,
}: SearchDiscoveryGroupProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="page-shell py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[var(--foreground-soft)]">{description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <SearchResultCard key={item.id} document={item} />
        ))}
      </div>
    </section>
  );
}
