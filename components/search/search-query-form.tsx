import Link from "next/link";
import type { SearchResultType } from "@/lib/search/index";

type SearchQueryFormProps = {
  query: string;
  type: SearchResultType;
};

const typeOptions: { value: SearchResultType; label: string }[] = [
  { value: "all", label: "All content" },
  { value: "topic", label: "Topics" },
  { value: "blog", label: "Blog posts" },
  { value: "story", label: "Public stories" },
];

export function SearchQueryForm({ query, type }: SearchQueryFormProps) {
  return (
    <form
      action="/search"
      method="get"
      role="search"
      aria-label="Search public Real Journey content"
      className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_14rem_auto]"
    >
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[var(--foreground-soft)]">Search query</span>
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search topics, blog posts, or public stories"
          aria-describedby="search-form-help"
          autoComplete="off"
          className="h-14 rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 text-base outline-none transition focus:border-[color:var(--accent)]"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-[var(--foreground-soft)]">Content type</span>
        <select
          name="type"
          defaultValue={type}
          className="h-14 rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] px-4 text-sm font-medium outline-none transition focus:border-[color:var(--accent)]"
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end gap-3">
        <button type="submit" className="btn-primary h-14 min-w-[8rem]">
          Search
        </button>
        {query ? (
          <Link href="/search" className="btn-secondary h-14 min-w-[7rem]">
            Clear
          </Link>
        ) : null}
      </div>

      <p id="search-form-help" className="lg:col-span-3 text-sm leading-7 text-[var(--foreground-soft)]">
        Search includes public topics, blog posts, and public stories. Private vault material is excluded.
      </p>
    </form>
  );
}
