import Link from "next/link";
import type { SearchCounts, SearchResultType } from "@/lib/search/index";

type SearchTypeTabsProps = {
  query: string;
  activeType: SearchResultType;
  counts: SearchCounts;
};

const tabOrder: { type: SearchResultType; label: string }[] = [
  { type: "all", label: "All" },
  { type: "topic", label: "Topics" },
  { type: "blog", label: "Blog" },
  { type: "story", label: "Stories" },
];

function buildHref(query: string, type: SearchResultType) {
  const params = new URLSearchParams();
  params.set("q", query);
  if (type !== "all") {
    params.set("type", type);
  }
  return `/search?${params.toString()}`;
}

export function SearchTypeTabs({ query, activeType, counts }: SearchTypeTabsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabOrder.map((tab) => {
        const active = tab.type === activeType;
        return (
          <Link
            key={tab.type}
            href={buildHref(query, tab.type)}
            className={`inline-flex items-center gap-3 rounded-full border px-4 py-3 text-sm font-medium transition ${
              active
                ? "border-transparent bg-[var(--foreground)] text-[var(--background)]"
                : "border-[color:var(--card-border)] bg-[var(--card-strong)] hover:-translate-y-0.5"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                active ? "bg-white/12 text-current" : "bg-[var(--accent-soft)] text-[var(--foreground)]"
              }`}
            >
              {counts[tab.type]}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
