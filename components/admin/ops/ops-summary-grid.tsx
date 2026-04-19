type OpsSummaryItem = {
  label: string;
  value: string;
  note: string;
};

export function OpsSummaryGrid({ items }: { items: OpsSummaryItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="card-surface p-5 sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground-soft)]">
            {item.label}
          </p>
          <p className="mt-4 text-3xl font-semibold tracking-tight">{item.value}</p>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{item.note}</p>
        </div>
      ))}
    </div>
  );
}
