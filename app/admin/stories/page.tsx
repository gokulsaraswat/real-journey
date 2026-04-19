import { AdminShell } from "@/components/admin/admin-shell";
import { StoriesVaultManager } from "@/components/admin/stories-vault-manager";
import {
  getPrivateStories,
  getPublicStories,
  getStoryCollectionSummaries,
} from "@/lib/data/stories";
import { siteConfig } from "@/lib/config/site";

export default function AdminStoriesPage() {
  const publicStories = getPublicStories();
  const privateStories = getPrivateStories();
  const publicCollections = getStoryCollectionSummaries("public");
  const privateCollections = getStoryCollectionSummaries("private");

  return (
    <AdminShell
      eyebrow="Admin / Stories"
      title="Manage public stories and the private vault"
      description="Patch 11 turns the story area into a real content lane with separated public and private reader pages, generated source downloads, and a cleaner admin inventory for future storage-backed uploads."
      actions={[
        { label: "Open stories", href: "/stories", style: "secondary" },
        { label: "Open private vault", href: "/stories/private", style: "secondary" },
        { label: "Send feedback", href: siteConfig.feedbackEmailHref, style: "primary", external: true },
      ]}
    >
      <StoriesVaultManager
        publicCollections={publicCollections}
        privateCollections={privateCollections}
        publicStories={publicStories}
        privateStories={privateStories}
      />
    </AdminShell>
  );
}
