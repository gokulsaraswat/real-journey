import { siteConfig } from "@/lib/config/site";
import {
  contactLanes,
  contributionRules,
  contributionTracks,
  pullRequestChecklist,
} from "@/lib/data/contribute";

export function ContributionGuide() {
  return (
    <div className="space-y-6">
      <div className="card-surface p-6 sm:p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
          Contribution lanes
        </p>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {contactLanes.map((lane) => (
            <div
              key={lane.title}
              className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
            >
              <p className="text-lg font-semibold tracking-tight">{lane.title}</p>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{lane.description}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                Best for
              </p>
              <p className="mt-2 text-sm leading-6">{lane.bestFor}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={siteConfig.githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
          >
            Open repository
          </a>
          <a
            href={siteConfig.feedbackEmailHref}
            className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
          >
            Email feedback
          </a>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="card-surface p-6 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
            Git-based workflow
          </p>
          <div className="mt-5 grid gap-4">
            {contributionTracks.map((track) => (
              <div
                key={track.title}
                className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
              >
                <p className="text-xl font-semibold tracking-tight">{track.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{track.summary}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {track.branchExamples.map((branch) => (
                    <span key={branch} className="chip-subtle">
                      {branch}
                    </span>
                  ))}
                </div>

                <ol className="mt-5 grid gap-3">
                  {track.steps.map((step, index) => (
                    <li
                      key={`${track.title}-${step}`}
                      className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-2xl border border-[color:var(--card-border)] bg-[var(--card)] p-4"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-sm font-semibold">
                        {index + 1}
                      </span>
                      <p className="text-sm leading-7">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
              Pull request checklist
            </p>
            <ul className="mt-5 grid gap-3">
              {pullRequestChecklist.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4 text-sm leading-7"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card-surface p-6 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
              Branch-safe rules
            </p>
            <ul className="mt-5 grid gap-3">
              {contributionRules.map((rule) => (
                <li
                  key={rule}
                  className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4 text-sm leading-7"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
