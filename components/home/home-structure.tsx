import { careerLevels, readerModeCards, taxonomyNodes, trackExamples } from "@/lib/data/home";

export function HomeStructure() {
  return (
    <section id="structure" className="page-shell py-8 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="card-surface p-8 sm:p-10">
          <p className="section-eyebrow">Learning architecture</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A structure that can hold 500+ topics without becoming messy.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-[var(--foreground-soft)] sm:text-base">
            Learners should be able to enter from any point: student foundations, job-ready preparation, senior
            engineering depth, architecture, leadership, or founder-level systems thinking.
          </p>

          <div className="mt-8 grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
            <div className="surface-muted p-6">
              <p className="section-eyebrow">Levels</p>
              <div className="mt-5 space-y-4">
                {careerLevels.map((level) => (
                  <div key={level.level} className="rounded-2xl border border-[color:var(--card-border)] px-4 py-4">
                    <p className="text-sm font-semibold">{level.level}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--foreground-soft)]">{level.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-muted p-6">
              <p className="section-eyebrow">Example path</p>
              <div className="mt-5 space-y-3">
                {taxonomyNodes.map((node, index) => (
                  <div key={node.title} className="flex items-start gap-3 rounded-2xl border border-[color:var(--card-border)] px-4 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--card-border)] text-xs font-semibold text-[var(--foreground-soft)]">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{node.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[var(--foreground-soft)]">{node.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {trackExamples.map((item) => (
              <div key={item.title} className="surface-muted p-5">
                <p className="section-eyebrow">{item.kicker}</p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {readerModeCards.map((item) => (
            <div key={item.title} className="card-surface p-6 sm:p-7">
              <p className="section-eyebrow">{item.eyebrow}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.summary}</p>
              <div className="mt-5 rounded-2xl border border-[color:var(--card-border)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
                {item.supportingNote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
