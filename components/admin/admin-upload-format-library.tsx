import type { UploadFormatGuide } from "@/lib/data/admin";

const statusClassMap: Record<UploadFormatGuide["status"], string> = {
  ready: "bg-[var(--accent-soft)]",
  next: "bg-[var(--card-strong)]",
};

const statusLabelMap: Record<UploadFormatGuide["status"], string> = {
  ready: "Ready now",
  next: "Next parser",
};

export function AdminUploadFormatLibrary({ guides }: { guides: UploadFormatGuide[] }) {
  return (
    <div className="grid gap-4">
      {guides.map((guide) => (
        <div
          key={guide.format}
          className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold uppercase tracking-[0.18em]">.{guide.format}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{guide.bestFor}</p>
            </div>

            <span
              className={`rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusClassMap[guide.status]}`}
            >
              {statusLabelMap[guide.status]}
            </span>
          </div>

          <p className="mt-4 text-sm leading-6 text-[var(--foreground-soft)]">{guide.note}</p>

          {guide.templateHref ? (
            <div className="mt-4">
              <a
                href={guide.templateHref}
                className="inline-flex rounded-full border border-[color:var(--card-border)] bg-[var(--card)] px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5"
              >
                Download template
              </a>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
