import Link from "next/link";
import type { Topic } from "@/lib/contracts/content";

type LearnTopicCardProps = {
  topic: Topic;
  href: string;
  contextLabel?: string;
};

export function LearnTopicCard({ topic, href, contextLabel }: LearnTopicCardProps) {
  return (
    <Link href={href} className="card-surface group flex h-full flex-col p-6 transition hover:-translate-y-1">
      {contextLabel ? <p className="section-eyebrow">{contextLabel}</p> : null}
      <h3 className="mt-4 text-2xl font-semibold tracking-tight">{topic.title}</h3>
      <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">{topic.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {topic.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[color:var(--card-border)] pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--foreground-soft)]">
            Estimated read
          </p>
          <p className="mt-2 text-xl font-semibold">{topic.estimatedReadMinutes ?? 10} min</p>
        </div>
        <span className="text-sm font-medium text-[var(--foreground-soft)] transition group-hover:text-[var(--foreground)]">
          Open topic →
        </span>
      </div>
    </Link>
  );
}
