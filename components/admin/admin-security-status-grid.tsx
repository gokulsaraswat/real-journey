import type { SecurityStatusItem } from "@/lib/security/status";

type AdminSecurityStatusGridProps = {
  items: SecurityStatusItem[];
};

const toneClasses: Record<SecurityStatusItem["tone"], string> = {
  good: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  neutral: "border-[color:var(--card-border)] bg-[var(--card-strong)] text-[var(--foreground)]",
};

export function AdminSecurityStatusGrid({ items }: AdminSecurityStatusGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article key={item.label} className={`rounded-3xl border p-5 ${toneClasses[item.tone]}`}>
          <p className="text-sm font-medium opacity-80">{item.label}</p>
          <p className="mt-3 text-xl font-semibold tracking-tight">{item.value}</p>
          <p className="mt-3 text-sm leading-6 opacity-80">{item.note}</p>
        </article>
      ))}
    </div>
  );
}
