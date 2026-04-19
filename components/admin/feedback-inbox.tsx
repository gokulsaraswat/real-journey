import {
  feedbackCategoryLabels,
  feedbackDeliveryLabels,
} from "@/lib/data/contribute";
import {
  formatFeedbackDate,
  listFeedbackSubmissions,
} from "@/lib/feedback/index";

function statusLabel(value: "new" | "triaged" | "queued"): string {
  switch (value) {
    case "triaged":
      return "Triaged";
    case "queued":
      return "Queued";
    default:
      return "New";
  }
}

export async function FeedbackInbox() {
  const items = await listFeedbackSubmissions(12);
  const newCount = items.filter((item) => item.status === "new").length;
  const privateCount = items.filter((item) => item.visibility === "private").length;
  const bothCount = items.filter((item) => item.delivery === "both").length;
  const showingSeedData = items.every((item) => item.source === "seed");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
            New items
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{newCount}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            Fresh notes waiting for review or GitHub follow-up.
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
            Private notes
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{privateCount}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            Keep these away from public issue threads and open email first.
          </p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
            Dual handoffs
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{bothCount}</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            Feedback prepared for both GitHub and email delivery.
          </p>
        </div>
      </div>

      {showingSeedData ? (
        <div className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-5 text-sm leading-6 text-amber-100 dark:text-amber-50">
          Supabase feedback persistence is not active yet, so this inbox is showing seeded example data. Run the feedback migration and set the service-role key to store real submissions.
        </div>
      ) : null}

      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id} className="card-surface p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground-soft)]">
              <span className="chip-subtle">{feedbackCategoryLabels[item.category]}</span>
              <span className="chip-subtle">{feedbackDeliveryLabels[item.delivery]}</span>
              <span className="chip-subtle">{item.visibility}</span>
              <span className="chip-subtle">{statusLabel(item.status)}</span>
            </div>

            <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-3xl">
                <h2 className="text-2xl font-semibold tracking-tight">{item.subject}</h2>
                <p className="mt-2 text-sm text-[var(--foreground-soft)]">
                  {item.name} • {item.email} • {formatFeedbackDate(item.createdAt)}
                </p>
                {item.pageUrl ? (
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">Page: {item.pageUrl}</p>
                ) : null}
                <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">{item.message}</p>
              </div>

              <div className="flex flex-wrap gap-3 xl:justify-end">
                <a
                  href={item.githubIssueUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
                >
                  Open GitHub
                </a>
                <a
                  href={item.emailHref}
                  className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
                >
                  Open email
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
