import { AdminShell } from "@/components/admin/admin-shell";
import { FeedbackInbox } from "@/components/admin/feedback-inbox";
import { siteConfig } from "@/lib/config/site";

export default function AdminFeedbackPage() {
  return (
    <AdminShell
      eyebrow="Admin / Feedback"
      title="Shared inbox for GitHub and email contribution handoffs"
      description="Patch 12 turns public feedback into a real admin surface. The contribute page now prepares GitHub issue drafts and email drafts together, while this inbox shows saved submissions when Supabase persistence is configured."
      actions={[
        { label: "Open contribute page", href: "/contribute", style: "secondary" },
        { label: "Open GitHub repo", href: siteConfig.githubRepoUrl, style: "primary", external: true },
        { label: "Email feedback", href: siteConfig.feedbackEmailHref, style: "secondary", external: true },
      ]}
    >
      <FeedbackInbox />
    </AdminShell>
  );
}
