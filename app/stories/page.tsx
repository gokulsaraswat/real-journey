import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StoriesPage() {
  return (
    <PlaceholderPage
      eyebrow="Personal Stories"
      title="Mixed visibility stories with public and private paths"
      description="This section is reserved for your certifications, interviews, notes, code, and personal documents. Public showcases and private storage can stay separated in later patches."
      highlights={[
        "Public stories can act like guided reading collections",
        "Private material remains separate from public learning pages",
        "Downloadable files and reader pages can coexist",
      ]}
      actions={[
        { label: "Back home", href: "/", style: "secondary" },
        { label: "Contribute ideas", href: "/contribute", style: "primary" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Public path example
          </p>
          <p className="mt-4 text-lg font-semibold">Personal -&gt; Certification Prep -&gt; Java 17</p>
          <p className="mt-3 text-sm text-[var(--foreground-soft)]">
            Great for visible study trails, resume proof, and curated resource pages.
          </p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Private path example
          </p>
          <p className="mt-4 text-lg font-semibold">Personal -&gt; Interview -&gt; Google -&gt; private files</p>
          <p className="mt-3 text-sm text-[var(--foreground-soft)]">
            Great for sensitive notes, drafts, or materials that should require access control later.
          </p>
        </div>
      </div>
    </PlaceholderPage>
  );
}
