import { PlaceholderPage } from "@/components/shared/placeholder-page";

const uploadTypes = ["md", "mdx", "txt", "html", "pdf", "docx"];

export default function AdminPage() {
  return (
    <PlaceholderPage
      eyebrow="Admin"
      title="Admin shell reserved for content operations"
      description="This route will later handle upload, taxonomy mapping, publishing, and private story management. Patch 1 only keeps the space ready and documents the expected file types."
      highlights={[
        "Upload flow should normalize files into reader-ready content entries",
        "Multi-admin support is planned later",
        "Public and private content should remain separable",
      ]}
      actions={[
        { label: "Back home", href: "/", style: "secondary" },
        { label: "Contribute", href: "/contribute", style: "primary" },
      ]}
    >
      <div className="flex flex-wrap gap-3">
        {uploadTypes.map((type) => (
          <span
            key={type}
            className="rounded-full border border-[color:var(--card-border)] bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium"
          >
            .{type}
          </span>
        ))}
      </div>
    </PlaceholderPage>
  );
}
