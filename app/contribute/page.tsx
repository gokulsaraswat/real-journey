import { PlaceholderPage } from "@/components/shared/placeholder-page";
import { siteConfig } from "@/lib/config/site";

export default function ContributePage() {
  return (
    <PlaceholderPage
      eyebrow="Contribute"
      title="Feedback goes to GitHub and email"
      description="Real Journey will support Git-based contribution flows. Patch 1 keeps the public path ready and centralizes the repo and email placeholders in the site config."
      highlights={[
        "Use GitHub for issues, pull requests, and long-form suggestions",
        "Use email for direct feedback",
        "Patch 1 keeps contribution rules lightweight and branch-safe",
      ]}
      actions={[
        { label: "Open GitHub placeholder", href: siteConfig.githubRepoUrl, style: "primary", external: true },
        { label: "Send feedback email", href: siteConfig.feedbackEmailHref, style: "secondary", external: true },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Git-based contribution
          </p>
          <p className="mt-4 text-lg font-semibold">Issues, pull requests, and structured change history</p>
          <p className="mt-3 text-sm text-[var(--foreground-soft)]">
            Update the placeholder repository URL in `lib/config/site.ts` or your environment values before going live.
          </p>
        </div>
        <div className="card-surface p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Direct feedback
          </p>
          <p className="mt-4 text-lg font-semibold">Email path for quick notes and contact</p>
          <p className="mt-3 text-sm text-[var(--foreground-soft)]">
            Update the feedback email placeholder before deployment so the footer and this page use your real address.
          </p>
        </div>
      </div>
    </PlaceholderPage>
  );
}
