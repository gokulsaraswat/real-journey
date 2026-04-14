"use client";

import { ReaderCodeBlock } from "@/components/reader/reader-code-block";
import type { ReaderMode, ReaderSection } from "@/lib/data/topic-reader";

type TopicRichContentProps = {
  sections: ReaderSection[];
  mode: ReaderMode;
};

export function TopicRichContent({ sections, mode }: TopicRichContentProps) {
  const proseClass = mode === "ebook" ? "text-[1.04rem] leading-9" : "text-base leading-8";

  return (
    <div className="space-y-10 sm:space-y-12">
      {sections.map((section) => {
        if (section.type === "paragraphs") {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
              <div className={`space-y-4 text-[var(--foreground-soft)] ${proseClass}`}>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          );
        }

        if (section.type === "bullet-list") {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
              {section.intro ? <p className={`text-[var(--foreground-soft)] ${proseClass}`}>{section.intro}</p> : null}
              <ul className="grid gap-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[1.25rem] border border-[color:var(--card-border)] bg-[var(--accent-soft)] px-5 py-4 text-sm leading-7 sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (section.type === "steps") {
          return (
            <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
              <div className="grid gap-4">
                {section.steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[1.5rem] border border-[color:var(--card-border)] bg-[var(--card-strong)] px-5 py-5"
                  >
                    <div className="flex flex-wrap items-start gap-4">
                      <span className="chip-subtle shrink-0">Step {index + 1}</span>
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                        <p className="mt-3 text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (section.type === "callout") {
          const toneClass =
            section.tone === "warning"
              ? "bg-amber-500/10"
              : section.tone === "focus"
                ? "bg-[var(--accent-soft)]"
                : "bg-cyan-500/10";

          return (
            <section key={section.id} id={section.id} className={`scroll-mt-28 rounded-[1.75rem] border border-[color:var(--card-border)] px-6 py-6 sm:px-7 ${toneClass}`}>
              <p className="section-eyebrow">Callout</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{section.title}</h2>
              <p className={`mt-4 text-[var(--foreground-soft)] ${proseClass}`}>{section.body}</p>
            </section>
          );
        }

        if (section.type === "quote") {
          return (
            <blockquote
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-[2rem] border border-[color:var(--card-border)] bg-[var(--card-strong)] px-6 py-8 sm:px-8"
            >
              {section.title ? <p className="section-eyebrow">{section.title}</p> : null}
              <p className="mt-3 text-xl font-medium leading-9 tracking-tight sm:text-2xl">“{section.quote}”</p>
              {section.caption ? <footer className="mt-4 text-sm leading-7 text-[var(--foreground-soft)]">{section.caption}</footer> : null}
            </blockquote>
          );
        }

        return (
          <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
            <ReaderCodeBlock code={section.code} language={section.language} caption={section.caption} />
          </section>
        );
      })}
    </div>
  );
}
