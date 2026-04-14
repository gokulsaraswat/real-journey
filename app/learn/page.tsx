import { PlaceholderPage } from "@/components/shared/placeholder-page";

const learningPath = [
  "IT -> job-ready engineer -> core computing -> HTTP deep dive",
  "AI -> senior engineer -> model systems -> evaluation pipelines",
  "Cyber Security -> architect -> platform defense -> detection engineering",
];

export default function LearnPage() {
  return (
    <PlaceholderPage
      eyebrow="Learn"
      title="Nested learning structure starts here"
      description="Patch 1 creates the public entry route. Dynamic domain, track, level, category, subcategory, and topic routes should be built in the dedicated taxonomy branch."
      highlights={[
        "Designed for 500+ topics without hardcoding pages",
        "Supports domain -> track -> level -> category -> subcategory -> topic",
        "Ready for ebook mode + docs mode later",
      ]}
      actions={[
        { label: "View structure on home", href: "/#structure", style: "secondary" },
        { label: "Open stories", href: "/stories", style: "primary" },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {learningPath.map((path) => (
          <div key={path} className="card-surface p-5">
            <p className="text-sm font-medium text-[var(--foreground-soft)]">Example path</p>
            <p className="mt-3 text-base font-semibold leading-7">{path}</p>
          </div>
        ))}
      </div>
    </PlaceholderPage>
  );
}
