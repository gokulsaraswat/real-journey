"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TopicRichContent } from "@/components/reader/topic-rich-content";
import type { TopicContext } from "@/lib/data/learn";
import type { ReaderDocument, ReaderMode, ReaderOutlineItem, ReaderSiblingLink } from "@/lib/data/topic-reader";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type TopicReaderShellProps = {
  breadcrumbs: BreadcrumbItem[];
  context: TopicContext;
  readerDocument: ReaderDocument;
  outline: ReaderOutlineItem[];
  routeBackToShelf: string;
  downloadHref: string;
  sourceFileName: string;
  previousTopic: ReaderSiblingLink | null;
  nextTopic: ReaderSiblingLink | null;
};

const READER_MODE_KEY = "real-journey-reader-mode";

function ReaderActions({
  mode,
  setMode,
  downloadHref,
  routeBackToShelf,
}: {
  mode: ReaderMode;
  setMode: (mode: ReaderMode) => void;
  downloadHref: string;
  routeBackToShelf: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <div role="group" aria-label="Reader mode" className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card-strong)] p-1">
        <button
          type="button"
          onClick={() => setMode("docs")}
          aria-pressed={mode === "docs"}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            mode === "docs" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--foreground-soft)]"
          }`}
        >
          Docs view
        </button>
        <button
          type="button"
          onClick={() => setMode("ebook")}
          aria-pressed={mode === "ebook"}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            mode === "ebook" ? "bg-[var(--foreground)] text-[var(--background)]" : "text-[var(--foreground-soft)]"
          }`}
        >
          Ebook view
        </button>
      </div>

      <a href={downloadHref} className="btn-secondary">
        Download source
      </a>
      <Link href={routeBackToShelf} className="btn-secondary">
        Back to shelf
      </Link>
      <Link href="/contribute" className="btn-primary">
        Suggest edits
      </Link>
    </div>
  );
}

function ReaderOutline({ items }: { items: ReaderOutlineItem[] }) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <p className="section-eyebrow">Outline</p>
      <nav aria-label="Topic outline" className="mt-5 grid gap-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-2xl px-3 py-2 text-sm leading-7 text-[var(--foreground-soft)] transition hover:bg-white/5 hover:text-[var(--foreground)]"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function ReaderMeta({ context, sourceFileName }: { context: TopicContext; sourceFileName: string }) {
  return (
    <div className="card-surface p-6 sm:p-7">
      <p className="section-eyebrow">Reader meta</p>
      <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
        <p>
          <span className="font-semibold text-[var(--foreground)]">Estimated read:</span>{" "}
          {context.topic.estimatedReadMinutes ?? 10} min
        </p>
        <p>
          <span className="font-semibold text-[var(--foreground)]">Source format:</span> MDX
        </p>
        <p>
          <span className="font-semibold text-[var(--foreground)]">Download file:</span> {sourceFileName}
        </p>
        <p>
          <span className="font-semibold text-[var(--foreground)]">Path:</span> {context.domain.title} → {context.track.title} → {context.level.title}
        </p>
      </div>
    </div>
  );
}

function ReaderSiblingNav({
  previousTopic,
  nextTopic,
  routeBackToShelf,
}: {
  previousTopic: ReaderSiblingLink | null;
  nextTopic: ReaderSiblingLink | null;
  routeBackToShelf: string;
}) {
  return (
    <section className="mt-10 grid gap-4 md:grid-cols-2">
      {previousTopic ? (
        <Link href={previousTopic.href} className="card-surface p-6 transition hover:-translate-y-1">
          <p className="section-eyebrow">Previous topic</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{previousTopic.title}</h2>
        </Link>
      ) : (
        <Link href={routeBackToShelf} className="card-surface p-6 transition hover:-translate-y-1">
          <p className="section-eyebrow">Back to shelf</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Browse more topics</h2>
        </Link>
      )}

      {nextTopic ? (
        <Link href={nextTopic.href} className="card-surface p-6 transition hover:-translate-y-1">
          <p className="section-eyebrow">Next topic</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{nextTopic.title}</h2>
        </Link>
      ) : (
        <Link href="/learn" className="card-surface p-6 transition hover:-translate-y-1">
          <p className="section-eyebrow">Keep exploring</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Return to Learn</h2>
        </Link>
      )}
    </section>
  );
}

export function TopicReaderShell({
  breadcrumbs,
  context,
  readerDocument,
  outline,
  routeBackToShelf,
  downloadHref,
  sourceFileName,
  previousTopic,
  nextTopic,
}: TopicReaderShellProps) {
  const [mode, setModeState] = useState<ReaderMode>("docs");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stored = window.localStorage.getItem(READER_MODE_KEY);
    if (stored === "docs" || stored === "ebook") {
      setModeState(stored);
    }
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.getElementById("topic-reader-article");
      if (!article) {
        return;
      }

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxScrollable = Math.max(articleHeight - viewportHeight, 1);
      const current = Math.min(
        maxScrollable,
        Math.max(0, window.scrollY - articleTop + viewportHeight * 0.25),
      );

      setProgress(Math.min(100, Math.max(0, (current / maxScrollable) * 100)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const setMode = (nextMode: ReaderMode) => {
    setModeState(nextMode);
    window.localStorage.setItem(READER_MODE_KEY, nextMode);
  };

  const tagSummary = useMemo(() => context.topic.tags.join(" · "), [context.topic.tags]);

  const articleClassName =
    mode === "ebook"
      ? "card-surface mx-auto max-w-3xl overflow-hidden p-8 sm:p-10 lg:p-12"
      : "card-surface overflow-hidden p-8 sm:p-10 lg:p-12";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-40 h-1 bg-transparent">
        <div
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <section className="page-shell py-10 sm:py-14 lg:py-16">
        <div className={mode === "ebook" ? "" : "grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]"}>
          <article id="topic-reader-article" aria-labelledby="topic-reader-title" className={articleClassName}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[var(--foreground-soft)]">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {item.href && !isLast ? (
                      <Link href={item.href} className="transition hover:text-[var(--foreground)]">
                        {item.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-[var(--foreground)]" : undefined}>{item.label}</span>
                    )}
                    {!isLast ? <span aria-hidden="true">/</span> : null}
                  </div>
                );
              })}
            </nav>

            <div id="overview" className="scroll-mt-28">
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="chip">Topic reader</span>
                <span className="chip-subtle">{mode === "docs" ? "Docs mode" : "Ebook mode"}</span>
                <span className="chip-subtle">{context.topic.estimatedReadMinutes ?? 10} min read</span>
              </div>

              <h1 id="topic-reader-title" className={`mt-6 font-semibold tracking-tight ${mode === "ebook" ? "text-4xl sm:text-6xl" : "text-4xl sm:text-6xl"}`}>
                {context.topic.title}
              </h1>
              <p className={`mt-6 max-w-3xl text-[var(--foreground-soft)] ${mode === "ebook" ? "text-lg leading-9" : "text-base leading-8 sm:text-lg"}`}>
                {context.topic.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {context.topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-xs text-[var(--foreground-soft)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-[color:var(--card-border)] bg-[var(--accent-soft)] p-6 sm:p-7">
                <p className="section-eyebrow">Focus</p>
                <p className={`mt-4 ${mode === "ebook" ? "text-lg leading-9" : "text-base leading-8 sm:text-lg"}`}>
                  {readerDocument.focus}
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {readerDocument.goals.map((goal, index) => (
                  <div key={goal} className="surface-muted p-5">
                    <p className="section-eyebrow">Goal {index + 1}</p>
                    <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">{goal}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-[color:var(--card-border)] pt-8">
                <ReaderActions
                  mode={mode}
                  setMode={setMode}
                  downloadHref={downloadHref}
                  routeBackToShelf={routeBackToShelf}
                />
              </div>
            </div>

            <div className="mt-10 border-t border-[color:var(--card-border)] pt-10 sm:pt-12">
              <TopicRichContent sections={readerDocument.sections} mode={mode} />
            </div>

            <div className="mt-10 rounded-[1.5rem] border border-[color:var(--card-border)] bg-[var(--card-strong)] p-6 sm:p-7">
              <p className="section-eyebrow">Reader memory</p>
              <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
                Your last selected reader mode is stored locally in this browser. Tags on this topic: {tagSummary}.
              </p>
            </div>

            <ReaderSiblingNav
              previousTopic={previousTopic}
              nextTopic={nextTopic}
              routeBackToShelf={routeBackToShelf}
            />

            {mode === "ebook" ? (
              <div className="mt-10 grid gap-4">
                <ReaderMeta context={context} sourceFileName={sourceFileName} />
                <ReaderOutline items={outline} />
              </div>
            ) : null}
          </article>

          {mode === "docs" ? (
            <aside className="grid gap-4 self-start xl:sticky xl:top-24">
              <ReaderOutline items={outline} />
              <ReaderMeta context={context} sourceFileName={sourceFileName} />
              <div className="card-surface p-6 sm:p-7">
                <p className="section-eyebrow">Current shelf</p>
                <p className="mt-4 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
                  {context.domain.title} → {context.track.title} → {context.level.title} → {context.category.title} → {context.subcategory.title}
                </p>
              </div>
            </aside>
          ) : null}
        </div>
      </section>
    </>
  );
}
