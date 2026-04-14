import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminUploadFormatLibrary } from "@/components/admin/admin-upload-format-library";
import { AdminQueueList } from "@/components/admin/admin-queue-list";
import { UploadStudio } from "@/components/admin/upload-studio";
import {
  getAdminQueue,
  uploadFormatGuides,
  uploadMetadataFields,
  uploadPipeline,
} from "@/lib/data/admin";

export default function AdminUploadsPage() {
  const queue = getAdminQueue();

  return (
    <>
      <AdminSectionCard
        eyebrow="Admin / Uploads"
        title="Upload intake lane"
        description="Use one intake surface for raw files, generate a clean metadata draft, and keep the original source ready for download. All six intake formats are now live in this branch."
      >
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <UploadStudio />

        <div className="space-y-6">
          <div className="card-surface p-6 sm:p-7">
            <p className="text-lg font-semibold">Format readiness</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
              Start publishing from MDX when possible. Markdown, text, HTML, PDF, and DOCX all analyze into the same metadata contract now, while the original file stays attached for download.
            </p>
            <div className="mt-5">
              <AdminUploadFormatLibrary guides={uploadFormatGuides} />
            </div>
          </div>

          <div className="card-surface p-6 sm:p-7">
            <p className="text-lg font-semibold">Canonical metadata contract</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
              These fields keep 500+ topics manageable because the structure stays in taxonomy and metadata instead of hardcoded pages.
            </p>
            <div className="mt-5 grid gap-3">
              {uploadMetadataFields.map((field) => (
                <div
                  key={field.name}
                  className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{field.name}</p>
                    <span className="rounded-full border border-[color:var(--card-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
                      {field.required ? "Required" : "Optional"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">{field.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Queue + Pipeline"
        title="Pipeline contract and representative queue"
        description="Static seeded data for now; persistence and publish orchestration can plug in without changing this route surface."
      >
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <div className="card-surface p-6 sm:p-7">
          <p className="text-lg font-semibold">Pipeline contract</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {uploadPipeline.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
                  Step {index + 1}
                </p>
                <p className="mt-3 text-base font-semibold">{step.title}</p>
                <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6 sm:p-7">
          <p className="text-lg font-semibold">Representative queue</p>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
            This queue stays seeded until storage and real publishing jobs are wired. The layout is stable, so the next branch can focus on persistence and publish workflow instead of parsing.
          </p>
          <div className="mt-5">
            <AdminQueueList items={queue} />
          </div>
        </div>
      </div>
      </AdminSectionCard>
    </>
  );
}
