type AdminStatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function AdminStatCard({ label, value, description }: AdminStatCardProps) {
  return (
    <div className="card-surface p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">{label}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{description}</p>
    </div>
  );
}
