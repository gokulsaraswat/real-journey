import Link from "next/link";
import { workflowSteps } from "@/lib/data/home";

export function HomeWorkflow() {
  return (
    <section className="page-shell py-8 pb-16 sm:py-10 sm:pb-20">
      <div className="card-surface overflow-hidden p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div>
            <p className="section-eyebrow">Main branch discipline</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Keep main chat minimal. Let feature chats produce code in parallel.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
              This project is being shaped for a multi-branch workflow. Main holds architecture and final decisions.
              Feature chats should only own one isolated implementation area each.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contribute" className="btn-primary">
                Contribution route
              </Link>
              <Link href="/login" className="btn-secondary">
                Login route
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {workflowSteps.map((step) => (
              <div key={step.title} className="surface-muted p-5">
                <p className="section-eyebrow">{step.stage}</p>
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
