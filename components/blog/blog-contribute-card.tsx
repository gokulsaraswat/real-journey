import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

type BlogContributeCardProps = {
  compact?: boolean;
};

export function BlogContributeCard({ compact = false }: BlogContributeCardProps) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <p className="section-eyebrow">Feedback + contribution</p>
      <h2 className={compact ? "mt-4 text-2xl font-semibold tracking-tight" : "mt-4 text-3xl font-semibold tracking-tight"}>
        Found something useful or missing?
      </h2>
      <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
        For now, feedback can flow through GitHub and email. Later, this route can grow into richer contribution and suggestion workflows.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={siteConfig.githubRepoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >
          Open GitHub
        </a>
        <a href={siteConfig.feedbackEmailHref} className="btn-secondary">
          Send email
        </a>
        <Link href="/contribute" className="btn-secondary">
          Contribution route
        </Link>
      </div>
    </div>
  );
}
