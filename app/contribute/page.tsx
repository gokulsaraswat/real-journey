import { ContributionGuide } from "@/components/contribute/contribution-guide";
import { FeedbackForm } from "@/components/contribute/feedback-form";
import { siteConfig } from "@/lib/config/site";

const highlights = [
  "Feedback can open GitHub and email drafts together.",
  "Pull requests stay Git-based so code and content keep a clean review history.",
  "Private notes should use the private visibility lane and avoid public issue threads.",
] as const;

export default function ContributePage() {
  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="space-y-6">
        <div className="card-surface-strong overflow-hidden p-8 sm:p-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground-soft)]">
              Contribute
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Feedback goes to GitHub and email. Code changes stay Git-based.
            </h1>
            <p className="mt-5 text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
              Real Journey now has a dedicated contribution surface: public feedback can start from one form, open the right GitHub issue draft, and prepare an email draft at the same time. Pull requests remain the main path for code, content, and structured improvements.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--accent-soft)] p-5"
              >
                <p className="text-sm leading-7">{highlight}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
            >
              Open GitHub repo
            </a>
            <a
              href={siteConfig.feedbackEmailHref}
              className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
            >
              Email feedback
            </a>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <FeedbackForm />

          <div className="space-y-6">
            <div className="card-surface p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                Fast path
              </p>
              <div className="mt-5 grid gap-4">
                <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                  <p className="text-lg font-semibold">Bug or broken route</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    Use the form, choose Bug report, keep the note public-safe, and open the GitHub draft.
                  </p>
                </div>
                <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                  <p className="text-lg font-semibold">Private note or access request</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    Choose Email only or GitHub + email with private visibility so the note stays out of public issue threads.
                  </p>
                </div>
                <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                  <p className="text-lg font-semibold">Code or content contribution</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">
                    Open the issue first when needed, create a focused branch, then send the actual implementation through a pull request.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-surface p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                Contribution contract
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-tight">Main chat stays minimal. Feature work stays in branch chats.</p>
              <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">
                This page mirrors the build workflow: main owns stable architecture and merge rules, while feature branches carry isolated code and content changes.
              </p>
            </div>
          </div>
        </div>

        <ContributionGuide />
      </div>
    </section>
  );
}
