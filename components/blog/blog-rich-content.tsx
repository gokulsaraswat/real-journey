import type { BlogSection } from "@/lib/data/blog";

type BlogRichContentProps = {
  sections: BlogSection[];
};

export function BlogRichContent({ sections }: BlogRichContentProps) {
  return (
    <div className="space-y-10">
      {sections.map((section, index) => {
        if (section.type === "paragraphs") {
          return (
            <section key={`${section.type}-${section.title ?? index}`} className="space-y-4">
              {section.title ? <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2> : null}
              <div className="space-y-4 text-base leading-8 text-[var(--foreground-soft)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          );
        }

        if (section.type === "bullet-list") {
          return (
            <section key={`${section.type}-${section.title}`} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
              {section.intro ? <p className="text-base leading-8 text-[var(--foreground-soft)]">{section.intro}</p> : null}
              <ul className="grid gap-3">
                {section.items.map((item) => (
                  <li key={item} className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--accent-soft)] px-5 py-4 text-sm leading-7 text-[var(--foreground)]">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          );
        }

        if (section.type === "quote") {
          return (
            <blockquote key={`${section.type}-${section.quote}`} className="rounded-[2rem] border border-[color:var(--card-border)] bg-[var(--card-strong)] px-6 py-8 sm:px-8">
              <p className="text-xl font-medium leading-9 tracking-tight sm:text-2xl">“{section.quote}”</p>
              {section.caption ? <footer className="mt-4 text-sm text-[var(--foreground-soft)]">{section.caption}</footer> : null}
            </blockquote>
          );
        }

        return (
          <div key={`${section.type}-${section.title}`} className="rounded-[2rem] border border-[color:var(--card-border)] bg-[var(--accent-soft)] px-6 py-6 sm:px-8">
            <p className="section-eyebrow">Callout</p>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">{section.title}</h2>
            <p className="mt-3 text-base leading-8 text-[var(--foreground-soft)]">{section.body}</p>
          </div>
        );
      })}
    </div>
  );
}
