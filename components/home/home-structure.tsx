import { careerLevels, readerModeCards, taxonomyNodes } from "@/lib/data/home";

export function HomeStructure() {
  return (
    <section id="structure" className="page-shell py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card-surface p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--foreground-soft)]">
            Learning structure
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Domain -&gt; track -&gt; level -&gt; category -&gt; subcategory -&gt; topic
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
            This app is structured to scale to hundreds of topics while still feeling clean for students, engineers, architects, managers, and founders.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                Levels
              </p>
              <div className="mt-5 space-y-4">
                {careerLevels.map((level) => (
                  <div key={level.level}>
                    <p className="text-sm font-semibold">{level.level}</p>
                    <p className="mt-1 text-sm leading-7 text-[var(--foreground-soft)]">{level.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                Example path
              </p>
              <div className="mt-5 space-y-3">
                {taxonomyNodes.map((node) => (
                  <div key={node.title} className="rounded-2xl border border-[color:var(--card-border)] px-4 py-3">
                    <p className="text-sm font-medium">{node.title}</p>
                    <p className="mt-1 text-sm text-[var(--foreground-soft)]">{node.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {readerModeCards.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--foreground-soft)]">
                {item.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
