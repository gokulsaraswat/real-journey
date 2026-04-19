import { AdminShell } from "@/components/admin/admin-shell";
import { AdminTopicCatalogShell } from "@/components/admin/admin-topic-catalog-shell";
import { topicCatalogSections, topicCatalogSummary } from "@/lib/data/topic-catalog-sample";

export const metadata = {
  title: "Admin Topic Catalog | Real Journey",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminTopicCatalogPage() {
  return (
    <AdminShell
      eyebrow="Admin / Topic catalog"
      title="Scale the knowledge map before content arrives"
      description="Use one catalog surface to normalize sections, generate slugs, and track which topics still need source files. This keeps the main branch lightweight while feature branches work on content and uploads separately."
      actions={[
        {
          label: "Open upload studio",
          href: "/admin/uploads",
          style: "primary",
        },
        {
          label: "View taxonomy",
          href: "/admin/taxonomy",
          style: "secondary",
        },
      ]}
    >
      <AdminTopicCatalogShell sections={topicCatalogSections} summary={topicCatalogSummary} />
    </AdminShell>
  );
}
