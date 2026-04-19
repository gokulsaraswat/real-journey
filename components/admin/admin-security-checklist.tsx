type ChecklistItem = {
  title: string;
  note: string;
};

type AdminSecurityChecklistProps = {
  items: ChecklistItem[];
};

export function AdminSecurityChecklist({ items }: AdminSecurityChecklistProps) {
  return (
    <section className="card-surface p-6 sm:p-7">
      <div className="max-w-3xl">
        <p className="text-lg font-semibold">Security review checklist</p>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground-soft)]">
          Keep this branch focused on practical protections for the public site, admin workspace, and upload path.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-[color:var(--card-border)] bg-[var(--card-strong)] p-5"
          >
            <p className="text-base font-semibold">{item.title}</p>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-soft)]">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
