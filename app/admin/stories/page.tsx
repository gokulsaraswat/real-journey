import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStoryLane } from "@/components/admin/admin-story-lane";
import { getAdminStoryCollections } from "@/lib/data/admin";

const guardrails = [
  "Keep private interview and draft material outside public story indexes.",
  "Allow reader pages and downloadable files to exist together per collection.",
  "Use visibility at the content level so mixed collections stay manageable.",
];

export default function AdminStoriesPage() {
  const collections = getAdminStoryCollections();

  return (
    <>
      <AdminSectionCard
        eyebrow="Stories"
        title="Mixed, public, and private personal collections"
        description="Personal stories need their own operating model because they can hold certifications, interviews, code, notes, and files with very different visibility rules."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {collections.map((collection) => (
            <AdminStoryLane key={collection.path} collection={collection} />
          ))}
        </div>
      </AdminSectionCard>

      <AdminSectionCard
        eyebrow="Guardrails"
        title="Rules for keeping personal material clean"
        description="This page reserves the story-management lane now so the future storage branch can plug in real files without redesigning the operating model."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {guardrails.map((rule) => (
            <article key={rule} className="surface-muted p-5">
              <p className="text-sm leading-7 text-[var(--foreground-soft)]">{rule}</p>
            </article>
          ))}
        </div>
      </AdminSectionCard>
    </>
  );
}
