import Link from "next/link";
import { workflowSteps } from "@/lib/data/home";

export function HomeWorkflow() {
  return (
    <section className="page-shell py-8 pb-16 sm:py-10 sm:pb-20">
      <div className="card-surface overflow-hidden p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
              Main branch discipline
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep the main chat light. Let feature chats do the heavy lifting.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
              The shell is ready so you can branch out without losing shared rules. This keeps the main branch fast and makes merging safer later.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contribute"
                className="inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-medium text-[var(--background)] transition hover:-translate-y-0.5"
              >
                Open contribute route
              </Link>
              <Link
                href="/login"
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5"
              >
                Login route
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
                  {step.stage}
                </p>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{step.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
