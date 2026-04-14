import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function BlogPage() {
  return (
    <PlaceholderPage
      eyebrow="Blog"
      title="Blog shell reserved for the feature branch"
      description="Patch 1 keeps the route stable while the blog list, filters, detail view, and MDX rendering arrive in a dedicated branch."
      highlights={[
        "Route contract is ready at /blog",
        "Premium card layout can evolve in feature/blog",
        "Reader-focused blog detail pages will land next",
      ]}
      actions={[
        { label: "Return home", href: "/", style: "secondary" },
        { label: "Explore learning", href: "/learn", style: "primary" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="card-surface p-5"
          >
            <div className="h-3 w-24 rounded-full bg-white/10 dark:bg-white/10" />
            <div className="mt-5 h-6 w-5/6 rounded-full bg-white/10 dark:bg-white/10" />
            <div className="mt-3 h-4 w-full rounded-full bg-white/10 dark:bg-white/10" />
            <div className="mt-2 h-4 w-4/5 rounded-full bg-white/10 dark:bg-white/10" />
          </div>
        ))}
      </div>
    </PlaceholderPage>
  );
}
